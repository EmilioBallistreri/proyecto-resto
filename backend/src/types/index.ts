export type TableCapacity = 2 | 4 | 5;
export type TableArea = 'interior' | 'patio';
export type TableStatus = 'available' | 'reserved' | 'occupied' | 'billing';

export interface Table {
  id: string;
  tableNumber: number;
  capacity: TableCapacity;
  area: TableArea;
  x: number;
  y: number;
  shape: 'round' | 'square' | 'rect';
  status: TableStatus;
  currentReservationId?: string;
  label?: string;
}

export interface UserProfile {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
}

export type ReservationStatus = 'confirmed' | 'seated' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  code: string;
  tableId: string;
  tableNumber: number;
  area: TableArea;
  partySize: number;
  date: string;
  time: string;
  customer: UserProfile;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'reservation_new' | 'reservation_status' | 'table_freed' | 'admin_alert';
  read: boolean;
  reservationId?: string;
  tableNumber?: number;
}

export interface RestaurantMetrics {
  totalTables: number;
  availableTables: number;
  reservedTables: number;
  occupiedTables: number;
  occupancyPercentage: number;
  totalGuestsExpected: number;
  totalReservationsToday: number;
  peakHour: string;
}

