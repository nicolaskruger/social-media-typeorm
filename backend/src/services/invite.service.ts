import { SendInviteDto } from '@/dtos/invite.dto';
import HttpException from '@/exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { InviteMapper } from '@/mapper/invite.mapper';
import { InviteRepository } from '@/repository/invite.repository';
import { InviteValidator } from '@/validator/invite.validator';
import { getCustomRepository } from 'typeorm';
import { FriendService } from './friend.service';
import UserService from './users.service';

export class InviteService {
  private invites = InviteRepository;

  private userService = new UserService();

  private inviteValidator = new InviteValidator();

  private inviteMapper = new InviteMapper();

  private friendService = new FriendService();

  public async sendInvite(sender: User, sendInvite: SendInviteDto) {
    const senderEntity = await this.userService.getUserAndInfo(sender.id);
    const reciverEntiy = await this.userService.getUserAndInfo(sendInvite.id);

    const inviteRepository = getCustomRepository(this.invites);

    this.inviteValidator.sendInviteValidator(senderEntity, reciverEntiy);

    const inviteEntity = this.inviteMapper.toEntityFromSend(sendInvite, senderEntity, reciverEntiy);

    await inviteRepository.save(inviteEntity);
  }

  public async denyInvite(user: User, sendId: number) {
    const inviteRepository = getCustomRepository(this.invites);

    const invite = await inviteRepository.findSpecificReciveInvite(sendId, user.id);
    if (!invite) throw new HttpException(409, "This invite doesn't exists");
    await inviteRepository.delete(invite);
  }

  public async invitesRecive(user: User) {
    const inviteRepository = getCustomRepository(this.invites);

    const invites = await inviteRepository.findReciveInvites(user.id);

    return invites;
  }

  public async acceptInvite(user: User, sendId: number) {
    const inviteRepository = getCustomRepository(this.invites);

    const invite = await inviteRepository.findSpecificReciveInvite(sendId, user.id);

    if (!invite) throw new HttpException(409, "This invite doesn't exists");

    const userEntity = await this.userService.getUserAndInfo(user.id);

    const friendEntity = await this.userService.getUserAndInfo(sendId);

    await this.friendService.friends(userEntity, friendEntity);

    await inviteRepository.delete(invite);
  }

  public async invitesSend(user: User) {
    const inviteRepository = getCustomRepository(this.invites);

    const invites = await inviteRepository.findSendInvites(user.id);

    return invites;
  }
}
