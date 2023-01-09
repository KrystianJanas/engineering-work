import dotenv from "dotenv";
dotenv.config();

export const port = process.env.DATABASE_PORT;

export const database = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
};
