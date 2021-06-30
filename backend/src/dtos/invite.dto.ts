import { IsNotEmpty } from 'class-validator';

export class SendInviteDto {
  @IsNotEmpty()
  id: number;
}
