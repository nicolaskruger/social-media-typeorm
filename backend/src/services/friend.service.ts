import { UserEntity } from '@/entity/users.entity';
import { User } from '@/interfaces/users.interface';
import { FriendRepository } from '@/repository/friend.repository';

export class FriendService {
  private friendRepository = new FriendRepository();

  public async friends(userA: UserEntity, userB: UserEntity) {
    await this.friendRepository.saveFriends(userA, userB);
  }

  public async friendOfUser(user: User) {
    return await this.friendRepository.findFriends(user);
  }
}
