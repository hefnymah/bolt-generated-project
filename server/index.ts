import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { setupIoTHub } from './services/iotHub';
import { setupEventHub } from './services/eventHub';
import { setupDatabase } from './services/database';
import { logger } from './utils/logger';
import { vehicleRoutes } from './routes/vehicles';
import { telemetryRoutes } from './routes/telemetry';
import { emissionsRoutes } from './routes/emissions';

config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/emissions', emissionsRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  logger.info('Client connected');
  
  socket.on('disconnect', () => {
    logger.info('Client disconnected');
  });
});

// Initialize services
const initializeServices = async () => {
  try {
    await setupDatabase();
    await setupIoTHub();
    await setupEventHub();
    
    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to initialize services:', error);
    process.exit(1);
  }
};

initializeServices();

export { io };
