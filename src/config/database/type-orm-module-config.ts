import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from '../envs';

export class TypeOrmModuleConfig {
  static getConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: envs.host,
      port: envs.portDatabase,
      username: envs.userDataBase,
      password: envs.passDataBase,
      database: envs.nameDatabase,
      entities: [],
      synchronize: true,
    };
  }
}
