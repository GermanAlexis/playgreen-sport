import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { LoginDto } from '../infrastucture/dto/login-auth.dto';
import { RegisterDto } from '../infrastucture/dto/register-auth.dto';
import { JwtCustomService } from './jwt.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(private readonly jwtCustomService: JwtCustomService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);
    if (!user)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'user not found',
      });

    const isMatch = await this.compareHash(password, '12312');

    if (!isMatch)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Verify Credentials',
      });

    // delete user.password;
    const token = await this.jwtCustomService.signIn({
      user,
    } as unknown as RegisterDto);
    return { token };
  }

  async register(registerDto: RegisterDto) {
    const { email, name } = registerDto;
    const user = await this.findUserByEmail(email);
    if (user)
      throw new BadRequestException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'user not found',
      });

    const passHashed = await this.hashPass(registerDto.password);
    const newUser = await this.createUser({
      email,
      name,
      password: passHashed,
    });
    // delete newUser.password;
    return { newUser };
  }

  private async findUserByEmail(email: string) {
    return { email };
    // return this.user.findUnique({ where: { email } });
  }

  private async createUser(register: RegisterDto) {
    return { register };
    // return this.user.create({ data: register });
  }

  async verifyToken(token: string) {
    const { iat, exp, ...user } =
      await this.jwtCustomService.verifyToken(token);
    const newToken = await this.jwtCustomService.signIn(user);
    return { user, token: newToken, iat, exp };
  }

  private async hashPass(pass: string): Promise<string> {
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
