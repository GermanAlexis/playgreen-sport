import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    name: 'email',
    required: true,
    example: 'joedue@email.com',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    required: true,
    example: 'Abc123*789',
    type: String,
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
