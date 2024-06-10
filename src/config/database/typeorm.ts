import { DataSourceOptions } from 'typeorm';
import { envs } from '../envs';

const config: DataSourceOptions = {
  type: 'mysql',
  host: envs.host,
  port: envs.portDatabase,
  username: envs.userDataBase,
  password: envs.passDataBase,
  database: envs.nameDatabase,
  // Only include necessary properties
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'], // Array of strings for migration file paths
  synchronize: true, // Or true for development only
};

export default config;
