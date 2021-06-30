import { InviteEntity } from '@/entity/invite.entity';
import { UserEntity } from '@/entity/users.entity';
import HttpException from '@/exceptions/HttpException';

export class InviteValidator {
  private toId(user: UserEntity) {
    return user.friends01.map(f => f.id);
  }

  private inviteToId(invites: InviteEntity[]) {
    return invites.map(invite => invite.id);
  }

  private intecept(a: number[], b: number[]) {
    return a.filter(invite => b.includes(invite));
  }

  private validate(a: number[], b: number[]) {
    return this.intecept(a, b).length > 0;
  }

  private allreadyAFriend(sender: UserEntity, reciver: UserEntity) {
    const isFriend = this.toId(reciver).includes(sender.id);

    if (isFriend) throw new HttpException(409, 'Allready a frient');
  }

  private validateInvite(a: InviteEntity[], b: InviteEntity[], msg: string) {
    const aInvite = this.inviteToId(a);

    const bInvite = this.inviteToId(b);

    const allreadySend = this.validate(aInvite, bInvite);

    if (allreadySend) throw new HttpException(409, msg);
  }

  private allreadySendInvite(sender: UserEntity, reciver: UserEntity) {
    this.validateInvite(sender.inviteSend, reciver.inviteRecive, 'Allready send invite to that user');
  }

  private allreadyReciveInvite(sender: UserEntity, reciver: UserEntity) {
    this.validateInvite(sender.inviteRecive, reciver.inviteSend, 'Allready recive invite from that user');
  }

  private cantSendToYourSelf(sender: UserEntity, reciver: UserEntity) {
    if (sender.id === reciver.id) throw new HttpException(409, "You can't sen invite to your self");
  }

  public sendInviteValidator(sender: UserEntity, reciver: UserEntity) {
    this.cantSendToYourSelf(sender, reciver);
    this.allreadyAFriend(sender, reciver);
    this.allreadySendInvite(sender, reciver);
    this.allreadyReciveInvite(sender, reciver);
  }
}
