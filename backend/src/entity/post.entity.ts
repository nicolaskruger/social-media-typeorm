import { Post } from '@/interfaces/post.interface';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentsEntity } from './comments.entity';
import { UserEntity } from './users.entity';

@Entity()
export class PostEntity implements Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.posts)
  user: UserEntity;

  @Column()
  @IsNotEmpty()
  text: string;

  @Column()
  public: boolean;

  @Column()
  @IsNotEmpty()
  createAt: Date;

  @ManyToMany(() => UserEntity, user => user)
  @JoinColumn()
  likes: UserEntity;

  @OneToMany(() => CommentsEntity, comment => comment.post)
  comments: CommentsEntity[];
}
