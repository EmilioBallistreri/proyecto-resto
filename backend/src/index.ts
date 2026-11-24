import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import tablesRouter from './routes/tables.routes.js';
import reservationsRouter from './routes/reservations.routes.js';
import metricsRouter from './routes/metrics.routes.js';
import authRouter from './routes/auth.routes.js';
import { setupSocketHandlers } from './sockets/socketHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/tables', tablesRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/auth', authRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    system: 'GastroPlano B2B Hospitality Backend',
    timestamp: new Date().toISOString()
  });
});

// HTTP & Socket Server
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Initialize real-time websockets
setupSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 [BACKEND] GastroPlano API & WebSockets Activo`);
  console.log(`📡 Puerto: http://localhost:${PORT}`);
  console.log(`⚡ Endpoints: /api/tables, /api/reservations, /api/metrics`);
  console.log(`=================================================`);
});

