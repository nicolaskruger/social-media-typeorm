import { InviteEntity } from '@/entity/invite.entity';
import { getRepository } from 'typeorm';

export class InviteRepository {
  private invites = InviteEntity;

  private getInviteRepository() {
    return getRepository(this.invites);
  }

  public async save(invite: InviteEntity) {
    await this.getInviteRepository().save(invite);
  }

  public async findReciveInvites(userId: number) {
    return await this.getInviteRepository().find({
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
    return await this.getInviteRepository().find({
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
    return await this.getInviteRepository().findOne({
      where: [{ origin: sendId, destiny: reciveId }],
    });
  }
  public async delete(invite: InviteEntity) {
    await this.getInviteRepository().delete(invite);
  }
}
