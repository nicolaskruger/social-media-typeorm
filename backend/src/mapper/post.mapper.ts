import { CreatePostDto } from '@/dtos/post.dto';
import { Post } from '@/interfaces/post.interface';
import { User } from '@/interfaces/users.interface';

export class PostMapper {
  public toPostFromCreateDto(postData: CreatePostDto, user: User): Post {
    return {
      id: null,
      comments: [],
      ...postData,
      user,
      createAt: new Date(),
    };
  }
}
