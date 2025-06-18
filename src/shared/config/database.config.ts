import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();
  
const DatabaseConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, "..", "**", "*.entity.{ts,js}")],
  subscribers: [join(__dirname, "..", "**", "*.subscriber.{ts,js}")],
  // logging: ['query', 'error', 'warn', 'migration', 'log'], 
};

export default DatabaseConfig;
