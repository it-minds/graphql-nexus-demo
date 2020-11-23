import { schemaSegmentDeclaration } from '../schemaObjectTypeDeclaration';
import { PageInfo } from './pageInfo';

export const ConnectionSchema = schemaSegmentDeclaration({ types: [PageInfo] });
