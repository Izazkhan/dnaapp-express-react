// src/app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler, notFound } from './app/middlewares/errorMiddleware.js';
import logger from './utils/logger.js';

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));


// Logging middleware
app.use(
    morgan('combined', {
        stream: { write: (msg) => logger.info(msg.trim()) }
    })
);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// API routes
app.use('/api/', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;