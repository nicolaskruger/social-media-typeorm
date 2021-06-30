import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entity/users.entity';
import HttpException from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { UserRepository } from '@/repository/user.respositoty';
import { UserMapper } from '@/mapper/user.mapper';
import { FriendService } from './friend.service';

class UserService {
  private userRepository = new UserRepository();

  private userMapper = new UserMapper();

  private friendService = new FriendService();

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.userRepository.findAllUsers();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.userRepository.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.userRepository.findUserByEmail(userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userMapper.toUserFromCreateUserDto(userData, hashedPassword);

    const createUserData: User = await this.userRepository.save(user);

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.userRepository.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userMapper.toUserFromCreateUserDto(userData, hashedPassword);

    await this.userRepository.update(userId, user);

    const updateUser: User = await this.userRepository.findUserById(userId);
    return updateUser;
  }

  public async saveUser(user: User) {
    await this.userRepository.save(user);
  }

  public async updateUserWithFriends(userEntity: UserEntity) {
    await this.userRepository.updateUser(userEntity);
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.userRepository.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.userRepository.delete(userId);
    return findUser;
  }
  public async getUserAndInfo(userId: number): Promise<UserEntity> {
    if (isEmpty(userId)) throw new HttpException(400, "You' re not userId");

    const userEntyty = await this.userRepository.findUserAndInfo(userId);

    const friends = await this.getFriendsOfUser(userEntyty);

    userEntyty.friends01 = friends;

    userEntyty.friends02 = friends;

    if (!userEntyty) throw new HttpException(409, "You' re not user");

    return userEntyty;
  }

  public async getFriendsOfUser(user: User): Promise<UserEntity[]> {
    const friends = await this.friendService.friendOfUser(user);

    return friends;
  }
}

export default UserService;
