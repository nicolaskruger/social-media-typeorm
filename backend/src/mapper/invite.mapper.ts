import { SendInviteDto } from '@/dtos/invite.dto';
import { InviteEntity } from '@/entity/invite.entity';
import { UserEntity } from '@/entity/users.entity';

export class InviteMapper {
  public toEntityFromSend(invite: SendInviteDto, sender: UserEntity, reciver: UserEntity): InviteEntity {
    return {
      ...invite,
      origin: sender,
      destiny: reciver,
    };
  }
}
