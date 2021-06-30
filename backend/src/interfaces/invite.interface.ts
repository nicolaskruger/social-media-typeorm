import { User } from './users.interface';

export interface Invite {
  id: number;
  origin: User;
  destiny: User;
}
