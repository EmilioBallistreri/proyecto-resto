import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function initSocket(onSync: (data: any) => void, onNewReservation: (res: any) => void) {
  if (typeof window === 'undefined') return;

  try {
    socket = io('http://localhost:4000', {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 5000
    });

    socket.on('connect', () => {
      console.log('⚡ [Socket.io Frontend] Conectado al backend en tiempo real:', socket?.id);
    });

    socket.on('sync:initial', (data) => {
      onSync(data);
    });

    socket.on('sync:update', (data) => {
      onSync(data);
    });

    socket.on('reservation:new', (payload) => {
      onNewReservation(payload);
    });

    socket.on('disconnect', () => {
      console.log('🔌 [Socket.io Frontend] Desconectado del servidor.');
    });
  } catch (err) {
    console.warn('Socket connection error:', err);
  }
}

export function getSocket(): Socket | null {
  return socket;
}

