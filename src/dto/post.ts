import { Answer } from './answer';

export enum PostType {
  START = 'start',
  END = 'end',
}

export class Post {
  id?: number;
  type: PostType;
  questions?: Answer[];
  title?: string;
  description?: string;
}
