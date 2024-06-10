import { join } from 'path';
import * as dotenv from 'dotenv';
import { path } from 'app-root-path';

dotenv.config({ path: join(path, `.dev.env`) });

const config = {
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
    CLIENT_URL: process.env.CLIENT_URL,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
};

export default config;