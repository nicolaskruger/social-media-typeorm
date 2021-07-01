import { CommentsEntity } from '@/entity/comments.entity';
import HttpException from '@/exceptions/HttpException';
import { CommentRepository } from '@/repository/comment.repository';
import { getCustomRepository } from 'typeorm';

export class CommentService {
  private comments = CommentRepository;

  public async save(comment: CommentsEntity) {
    const commentRepository = getCustomRepository(this.comments);

    commentRepository.save(comment);
  }

  public async findById(id: number) {
    const commentRepository = getCustomRepository(this.comments);

    const comment = await commentRepository.findById(id);

    if (!comment) throw new HttpException(409, "This comment doesn't exists");

    return comment;
  }
}
