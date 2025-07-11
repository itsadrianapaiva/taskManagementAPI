import dotenv from 'dotenv';

dotenv.config(); //Load .env into process.env

export const env = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    redis: {
        host: process.env.REDIS_HOST
    },
    jwtSecret: process.env.JWT_SECRET
}