import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { LoginDto } from '../infrastructure/dto/login-auth.dto';
import { JwtCustomService } from './jwt.service';
import { CreateUserDto } from 'src/core/user/infrastructure/dto/create-user.dto';
import { UserService } from 'src/core/user/application/user.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private readonly jwtCustomService: JwtCustomService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);
    if (!user)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'user not found',
      });

    const isMatch = await this.compareHash(password, user.password);

    if (!isMatch)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Verify Credentials',
      });

    delete user.password;
    const token = await this.jwtCustomService.signIn({ ...user });
    return { token };
  }

  async register(registerDto: CreateUserDto) {
    const { email, password, ...rest } = registerDto;
    const user = await this.findUserByEmail(email);
    if (user)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'user not found',
      });

    const passHashed = await this.hashPass(password);
    const newUser = await this.userService.create({
      ...rest,
      email,
      password: passHashed,
    });
    delete newUser.password;
    return { newUser };
  }

  private async findUserByEmail(email: string) {
    return this.userService.findOneByEmail(email);
  }

  async verifyToken(token: string) {
    const { iat, exp, ...user } =
      await this.jwtCustomService.verifyToken(token);
    const newToken = await this.jwtCustomService.signIn(user);
    return { user, token: newToken, iat, exp };
  }

  async hashPass(pass: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(pass, saltOrRounds);
  }

  private async compareHash(
    passwordWithoutHash: string,
    pass: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordWithoutHash, pass);
  }
}
