import { UserEntity } from '@/entity/users.entity';
import { User } from '@/interfaces/users.interface';
import { getRepository } from 'typeorm';

export class UserRepository {
  private users = UserEntity;

  private getUserRepository() {
    return getRepository(this.users);
  }

  public async findAllUsers() {
    return await this.getUserRepository().find();
  }

  public async findUserById(id: number) {
    return await this.getUserRepository().findOne({ where: { id } });
  }

  public async findUserByEmail(email: string) {
    return await this.getUserRepository().findOne({ where: { email } });
  }

  public async save(user: User) {
    return await this.getUserRepository().save(user);
  }

  public async update(id: number, user: User) {
    return await this.getUserRepository().update(id, user);
  }
  public async updateUser(user: UserEntity) {
    return await this.getUserRepository().update(user.id, user);
  }

  public async delete(id: number) {
    await this.getUserRepository().delete({ id });
  }

  public async findUserAndInfo(id: number) {
    return await this.getUserRepository().findOne({
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
