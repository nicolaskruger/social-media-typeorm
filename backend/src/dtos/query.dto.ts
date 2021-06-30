import { IsNotEmpty } from 'class-validator';

export class IdPageQueryDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  page: number;
}

export class IdQueryDto {
  @IsNotEmpty()
  id: number;
}

export class PageQueryDto {
  @IsNotEmpty()
  page: number;
}
