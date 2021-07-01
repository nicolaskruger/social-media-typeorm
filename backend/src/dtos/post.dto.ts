import { Comments } from '@/interfaces/comments.interface';
import { Post } from '@/interfaces/post.interface';
import { User } from '@/interfaces/users.interface';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  text: string;
  @IsNotEmpty()
  public: boolean;
}

export class PostResponseDto implements Post {
  id: number;
  user: User;
  text: string;
  comments: Comments[];
  public: boolean;
  createAt: Date;
  likes: number;
  liked: boolean;
}
