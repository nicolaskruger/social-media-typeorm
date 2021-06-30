import { Invite } from '@/interfaces/invite.interface';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity()
export class InviteEntity implements Invite {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, user => user.inviteSend)
  origin: UserEntity;
  @ManyToOne(() => UserEntity, user => user.inviteRecive)
  destiny: UserEntity;
}
