import dotenv from "dotenv";
dotenv.config();

export const port = process.env.NODE_PORT;

export const settings = {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
};

