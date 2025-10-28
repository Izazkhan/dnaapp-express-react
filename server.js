import app from './src/app.js';
import { connectDB } from './src/config/database.js';
import env from './src/config/env.js';
import logger from './src/utils/logger.js';

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            logger.info(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    process.exit(1);
});