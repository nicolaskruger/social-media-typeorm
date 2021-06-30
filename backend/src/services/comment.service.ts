import { CommentsEntity } from '@/entity/comments.entity';
import { CommentRepository } from '@/repository/comment.repository';
import { getCustomRepository, getRepository } from 'typeorm';

export class CommentService {
  private comments = CommentRepository;

  public async save(comment: CommentsEntity) {
    const commentRepository = getCustomRepository(this.comments);

    commentRepository.save(comment);
  }
}
