import { CommentsEntity } from '@/entity/comments.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentsEntity)
export class CommentRepository extends Repository<CommentsEntity> {
  public async findById(id: number) {
    return await this.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });
  }
}
