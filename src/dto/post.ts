import { Answer } from './answer';

export class Post {
  id?: number;
  questions?: Answer[];
  title?: string;
  description?: string;
  userId?: number;
  createdAt?: Date;
}
