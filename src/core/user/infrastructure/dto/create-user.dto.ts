import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { RoleEnum, UserState } from '../../enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Document id',
    example: 12312,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  documentId: number;

  @ApiProperty({
    description: 'First Name',
    example: 'Joes',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Dues',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @ApiProperty({
    description: 'Phone',
    example: 573011234567,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  phone: number;

  @ApiProperty({
    description: 'Email',
    example: 'joedue@email.com',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'Abc123*789',
    type: String,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'user name',
    example: 'joedue2024',
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName?: string;

  @ApiProperty({
    description: 'Gender',
    example: 'M',
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  gender: 'M' | 'F';

  @ApiProperty({
    description: 'Birth Date',
    example: new Date(),
    type: String,
    required: false,
  })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'Country id',
    example: 1,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  countryId?: number;

  @ApiProperty({
    description: 'Austin',
    example: 1,
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Street AV ',
    example: 'Street Falcon',
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Category ',
    example: 'A1',
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'user State',
    example: UserState.ACTIVE,
    required: false,
  })
  @IsEnum(UserState)
  @IsOptional()
  userState?: UserState = UserState.ACTIVE;

  @ApiProperty({
    description: 'Role',
    example: RoleEnum.USER,
    required: true,
  })
  @IsEnum(RoleEnum)
  role: RoleEnum = RoleEnum.USER;
}
