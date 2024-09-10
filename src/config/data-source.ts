import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

const envFile = `.env`;
const envPath = join(process.cwd(), envFile);

dotenv.config({ path: envPath });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
  synchronize: false,
});

AppDataSource.initialize().catch((error) =>
  console.log('Error during Data Source initialization', error),
);
