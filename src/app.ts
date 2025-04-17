import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from './config/database';
import urlRoutes from './routes/urlRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', urlRoutes);

const PORT = process.env.PORT || 3000;

// Connect to database and start server
const startServer = async () => {
    try {
        await Database.getInstance().connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();