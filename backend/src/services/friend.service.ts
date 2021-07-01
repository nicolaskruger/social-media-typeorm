import { UserEntity } from '@/entity/users.entity';
import { User } from '@/interfaces/users.interface';
import { FriendRepository } from '@/repository/friend.repository';
import { getCustomRepository } from 'typeorm';

export class FriendService {
  private friend = FriendRepository;

  public async friends(userA: UserEntity, userB: UserEntity) {
    const friendRepository = getCustomRepository(this.friend);

    await friendRepository.saveFriends(userA, userB);
  }

  public async friendOfUser(user: User) {
    const friendRepository = getCustomRepository(this.friend);

    return await friendRepository.findFriends(user);
  }
}
