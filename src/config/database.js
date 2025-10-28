import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import env from './env.js';
import logger from '../utils/logger.js';

export const sequelize = new Sequelize({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,

    dialect: PostgresDialect,
    ssl: false,
    clientMinMessages: 'notice',
    // logging: NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
    // pool: {
    //     max: DB_POOL_MAX,
    //     min: DB_POOL_MIN,
    //     acquire: 30000,
    //     idle: 10000,
    // },
    // define: {
    //     timestamps: true,
    //     underscored: true,
    //     freezeTableName: true,
    // },
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
//         if (NODE_ENV === 'development') {
//             await sequelize.sync({ alter: true });
//             logger.info('Database models synchronized');
//         }
//     } catch (error) {
//         logger.error('Error synchronizing models:', error);
//         throw error;
//     }
// };