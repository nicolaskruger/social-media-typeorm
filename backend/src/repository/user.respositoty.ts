import { UserEntity } from '@/entity/users.entity';
import { User } from '@/interfaces/users.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private users = UserEntity;

  public async findAllUsers() {
    return await this.find();
  }

  public async findUserById(id: number) {
    return await this.findOne({ where: { id } });
  }

  public async findUserByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }

  public async update(id: number, user: User) {
    return await this.update(id, user);
  }
  public async updateUser(user: UserEntity) {
    return await this.update(user.id, user);
  }

  public async findUserAndInfo(id: number) {
    return await this.findOne({
      relations: ['inviteSend', 'inviteRecive'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          friends01: 'user.friends01',
          friends02: 'user.friends02',
        },
      },
      where: { id },
    });
  }
}
