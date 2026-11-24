import { Server as SocketIOServer, Socket } from 'socket.io';
import { restaurantStore } from '../store/restaurantStore.js';

let ioInstance: SocketIOServer | null = null;

export function setupSocketHandlers(io: SocketIOServer) {
  ioInstance = io;

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.io] Cliente conectado: ${socket.id}`);

    // Send initial snapshot
    socket.emit('sync:initial', {
      tables: restaurantStore.getTables(),
      reservations: restaurantStore.getReservations(),
      notifications: restaurantStore.getNotifications(),
      metrics: restaurantStore.getMetrics()
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Cliente desconectado: ${socket.id}`);
    });
  });
}

export function broadcastStateChange(event: string, payload: any) {
  if (ioInstance) {
    ioInstance.emit(event, payload);
    // Also always push the updated snapshot so state is 100% consistent across all clients
    ioInstance.emit('sync:update', {
      tables: restaurantStore.getTables(),
      reservations: restaurantStore.getReservations(),
      notifications: restaurantStore.getNotifications(),
      metrics: restaurantStore.getMetrics()
    });
  }
}

