import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import experienceRoutes from './routes/experience';
import adminRoutes from './routes/admin';
import projectRoutes from './routes/project';
import viewsRoutes from './routes/views';
import path from 'path';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the server!' });
});

app.use('/api/experience', experienceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/views', viewsRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 