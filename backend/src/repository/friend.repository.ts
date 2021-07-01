import { FriendsEntity } from '@/entity/friend.entity';
import { UserEntity } from '@/entity/users.entity';
import { User } from '@/interfaces/users.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(FriendsEntity)
export class FriendRepository extends Repository<FriendsEntity> {
  public saveFriends = async (userA: UserEntity, userB: UserEntity) => {
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

    await this.save(friend01);

    await this.save(friend02);
  };

  public async findFriends(user: User) {
    const friends = await this.find({
      relations: ['friend2'],
      where: {
        friend1: user.id,
      },
    });

    return friends.map(friend => friend.friend2);
  }
}
