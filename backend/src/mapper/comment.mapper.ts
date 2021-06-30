import { CreateCommentDto } from '@/dtos/comment.dto';
import { CommentsEntity } from '@/entity/comments.entity';
import { UserEntity } from '@/entity/users.entity';

export class CommentMapper {
  public toEntityFromCreateDto(create: CreateCommentDto, user: UserEntity): CommentsEntity {
    return {
      id: null,
      ...create,
      user: user,
      post: null,
    };
  }
}
