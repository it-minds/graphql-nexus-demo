import { createPost } from './mutations/createPost';
import { post } from './queries/post';
import { CreatePost } from './types/createPost';
import { CreatePostResponse } from './types/createPostResponse';
import { Post } from './types/post';
import { PostResponse } from './types/postResponse';
import { PostResponseConnection, PostResponseConnectionEdge } from './types/postsConnection';
import { PostsConnectionResponse } from './types/postsConnectionResponse';

export const postTypes = [
  Post,
  PostResponse,
  CreatePost,
  CreatePostResponse,
  PostResponseConnection,
  PostResponseConnectionEdge,
  PostsConnectionResponse,
  createPost,
  post,
];
