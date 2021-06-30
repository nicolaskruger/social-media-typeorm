import { Friend } from '@/interfaces/friend.interface';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity()
export class FriendsEntity implements Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  friend1: UserEntity;

  @ManyToOne(() => UserEntity)
  friend2: UserEntity;
}
