import { IsEmail, IsEnum, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export enum UserRole {
  GUEST = 'GUEST',
  HOST = 'HOST',
  ADMIN = 'ADMIN'
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
