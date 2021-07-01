import { CreatePostDto, PostResponseDto } from '@/dtos/post.dto';
import { PostEntity } from '@/entity/post.entity';
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
  public toPostResponse(post: PostEntity, user: User): PostResponseDto {
    const likesId = post.likes.map(like => like.id);

    return {
      ...post,
      likes: post.likes.length,
      liked: likesId.includes(user.id),
    };
  }
  public toUpdatePost(post: PostEntity): PostEntity {
    delete post.comments;

    return post;
  }
}
