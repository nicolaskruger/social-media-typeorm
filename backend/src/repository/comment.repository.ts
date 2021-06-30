import { CommentsEntity } from '@/entity/comments.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentsEntity)
export class CommentRepository extends Repository<CommentsEntity> {}
