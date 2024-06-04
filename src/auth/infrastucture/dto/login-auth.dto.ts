import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
