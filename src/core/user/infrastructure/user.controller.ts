import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Controller,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from '../application/user.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/core/common/dtos/pagination.dto';
import { User } from '../domain/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    console.log('pagination: ', pagination);
    return this.userService.findAll(pagination);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = new User();
    return this.userService.update(+id, updateUserDto, user);
  }
}
