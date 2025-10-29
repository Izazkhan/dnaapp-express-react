import { Sequelize } from 'sequelize';
import env from './env.js';
import logger from '../utils/logger.js';

// config/database.js
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        // port: env.DB_PORT,
        host: env.DB_HOST,
        // password: env.DB_PASSWORD,

        dialect: 'postgres',
        ssl: false,
        clientMinMessages: 'notice',
    });

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('PostgreSQL connected successfully');
    } catch (error) {
        logger.error('Unable to connect to PostgreSQL:', error);
        throw error;
    }
};

// export const syncModels = async () => {
//     try {
//         // Use alter in development, avoid in production
//         if (env.NODE_ENV === 'development') {
//             await sequelize.sync({ force: true });
//             logger.info('Database models synchronizedd (alter: true)');
//         }
//     } catch (error) {
//         logger.error('Error synchronizing models:', error);
//         throw error;
//     }
// };