import { Comments } from '@/interfaces/comments.interface';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from './users.entity';

@Entity()
export class CommentsEntity implements Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  text: string;

  @ManyToOne(() => UserEntity, user => user.comments)
  user: UserEntity;

  @ManyToOne(() => PostEntity, post => post.comments)
  post: PostEntity;
}
