import express from 'express';
import mbtaRoutes from './routes/mbta-routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/api', mbtaRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;