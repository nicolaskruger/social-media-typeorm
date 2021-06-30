import { FriendsEntity } from '@/entity/friend.entity';
import { UserEntity } from '@/entity/users.entity';
import { User } from '@/interfaces/users.interface';
import { getRepository } from 'typeorm';

export class FriendRepository {
  private friends = FriendsEntity;

  public saveFriends = async (userA: UserEntity, userB: UserEntity) => {
    const friendRepository = getRepository(this.friends);

    const friend01: FriendsEntity = {
      friend1: userA,
      friend2: userB,
      id: null,
    };

    const friend02: FriendsEntity = {
      friend1: userB,
      friend2: userA,
      id: null,
    };

    await friendRepository.save(friend01);

    await friendRepository.save(friend02);
  };

  public async findFriends(user: User) {
    const friendRepository = getRepository(this.friends);

    const friends = await friendRepository.find({
      relations: ['friend2'],
      where: {
        friend1: user.id,
      },
    });

    return friends.map(friend => friend.friend2);
  }
}
