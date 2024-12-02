import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import borrowRoutes from './routes/borrowRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { responseHandler } from './middleware/responseHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use(responseHandler);

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/borrows', borrowRoutes);
app.use('/api/categories', categoryRoutes);



export default app; 