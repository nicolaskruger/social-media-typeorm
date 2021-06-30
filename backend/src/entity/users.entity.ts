import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { CommentsEntity } from './comments.entity';
import { PostEntity } from './post.entity';
import { InviteEntity } from './invite.entity';
import { FriendsEntity } from './friend.entity';

@Entity()
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  urlImage: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FriendsEntity, friend => friend.friend1)
  @JoinTable()
  friends01: UserEntity[];

  @OneToMany(() => FriendsEntity, friend => friend.friend2)
  @JoinTable()
  friends02: UserEntity[];

  @OneToMany(() => CommentsEntity, comment => comment.user)
  comments: CommentsEntity[];

  @OneToMany(() => PostEntity, post => post.user)
  @JoinTable()
  posts: PostEntity[];

  @OneToMany(() => InviteEntity, invite => invite.origin)
  inviteSend: InviteEntity[];

  @OneToMany(() => InviteEntity, invite => invite.destiny)
  inviteRecive: InviteEntity[];
}
