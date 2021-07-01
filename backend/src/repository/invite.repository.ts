import { InviteEntity } from '@/entity/invite.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(InviteEntity)
export class InviteRepository extends Repository<InviteEntity> {
  private invites = InviteEntity;

  public async findReciveInvites(userId: number) {
    return await this.find({
      where: [{ destiny: userId }],
      join: {
        alias: 'invite',
        leftJoinAndSelect: {
          origin: 'invite.origin',
        },
      },
    });
  }

  public async findSendInvites(userId: number) {
    return await this.find({
      where: [{ origin: userId }],
      join: {
        alias: 'invite',
        leftJoinAndSelect: {
          destiny: 'invite.destiny',
        },
      },
    });
  }

  public async findSpecificReciveInvite(sendId: number, reciveId: number): Promise<InviteEntity> {
    return await this.findOne({
      where: [{ origin: sendId, destiny: reciveId }],
    });
  }
}
