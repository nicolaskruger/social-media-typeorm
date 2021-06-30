import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/users.interface';

export class UserMapper {
  public toUserFromCreateUserDto(userData: CreateUserDto, password: string): User {
    return {
      id: null,
      ...userData,
      password: password,
    };
  }
}
