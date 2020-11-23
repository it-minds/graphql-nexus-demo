import { InvalidIdentifierError } from '../../../error/invalidIdentifierError';
import { NotFoundError } from '../../../error/notFoundError';
import { PostDataModel } from '../../../services/posts/postDataModel';
import { Connection, createConnectionModels } from '../../connection/createConnectionModels';
import { PostResponse } from './postResponse';

export type PostResponseConnectionType = Connection<
  'PostResponseConnection',
  PostDataModel | NotFoundError | InvalidIdentifierError
>;
export type PostResponseConnectionEdgeType = PostResponseConnectionType['edges'][0];

export const { connection: PostResponseConnection, edge: PostResponseConnectionEdge } = createConnectionModels({
  type: PostResponse,
  connection: {
    rootTyping: { name: 'PostResponseConnectionType', path: __filename },
  },
  edge: {
    rootTyping: { name: 'PostResponseConnectionEdgeType', path: __filename },
  },
});
