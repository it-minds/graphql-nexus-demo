import { Post, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { DateTime } from "luxon";
import { InvalidIdentifierError } from "../../error/invalidIdentifierError";
import { NotFoundError } from "../../error/notFoundError";
import { PostDataModel } from "../../models/postDataModel";
import { AsyncResult } from "../../result/asyncResult";
import { Result } from "../../result/result";
import { IdentifierService } from "../identifier/identifierService";

export class PostsService {
  private posts: DataLoader<number, Result<PostDataModel, NotFoundError>>;
  private identifierService: IdentifierService;
  private prisma: PrismaClient;
  private now: DateTime;

  constructor(
    prisma: PrismaClient,
    identifierService: IdentifierService,
    now: DateTime
  ) {
    this.posts = new DataLoader(async (keys) => {
      const posts = await prisma.post.findMany({
        where: { id: { in: [...keys] } },
        select: {
          id: true,
          createdAt: true,
          title: true,
          content: true,
          published: true,
          authorId: true,
          slug: true,
        },
      });
      return keys.map((key) => {
        const post = posts.find((post) => post.id === key);
        return post
          ? Result.ok(this.transformPost(post))
          : Result.error(
              new NotFoundError(this.identifierService.post.create(key))
            );
      });
    });
    this.prisma = prisma;
    this.identifierService = identifierService;
    this.now = now;
  }

  getPostById(
    id: string
  ): AsyncResult<PostDataModel, NotFoundError | InvalidIdentifierError> {
    return this.identifierService.post
      .parse(id)
      .andThenAsync((id) => this.posts.load(id));
  }

  create({
    title,
    content,
    published,
    authorId,
  }: {
    title: string;
    content: string;
    published: boolean;
    authorId: string;
  }): AsyncResult<{ post: PostDataModel }, InvalidIdentifierError> {
    return AsyncResult.from(
      this.identifierService.user.parse(authorId).andThenAsync((authorId) =>
        this.prisma.post
          .create({
            data: {
              title,
              content,
              author: { connect: { id: authorId } },
              published,
              createdAt: this.now.toISO(),
              slug: title, // TODO: fix
            },
            select: {
              id: true,
              createdAt: true,
              title: true,
              content: true,
              published: true,
              authorId: true,
              slug: true,
            },
          })
          .then((post) => {
            const transformedPost = this.transformPost(post);
            this.posts.prime(post.id, Result.ok(transformedPost));
            return Result.ok({ post: transformedPost });
          })
      )
    );
  }

  private transformPost(post: Post): PostDataModel {
    return {
      id: this.identifierService.post.create(post.id),
      content: post.content,
      createdAt: DateTime.fromJSDate(post.createdAt),
      published: post.published,
      title: post.title,
      authorId: this.identifierService.user.create(post.authorId),
    };
  }
}
