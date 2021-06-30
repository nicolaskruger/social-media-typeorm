import { User } from './users.interface';

export interface Comments {
  id: number;
  text: string;
  user: User;
}
