import { Comments } from './comments.interface';
import { User } from './users.interface';

export interface Post {
  id: number;
  user: User;
  text: string;
  comments: Comments[];
  public: boolean;
  createAt: Date;
}
