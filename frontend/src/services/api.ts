import { Table, Reservation, AppNotification, RestaurantMetrics, TableStatus, ReservationStatus, UserProfile } from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

export const api = {
  async getTables(): Promise<Table[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/tables`);
      if (!res.ok) throw new Error('Error al obtener mesas');
      const data = await res.json();
      return data.data;
    } catch {
      return [];
    }
  },

  async updateTableStatus(tableId: string, status: TableStatus): Promise<Table | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/tables/${tableId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Error al actualizar mesa');
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  async getReservations(): Promise<Reservation[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`);
      if (!res.ok) throw new Error('Error al obtener reservas');
      const data = await res.json();
      return data.data;
    } catch {
      return [];
    }
  },

  async createReservation(payload: {
    tableId: string;
    customer: UserProfile;
    date: string;
    time: string;
    partySize: number;
    notes?: string;
  }): Promise<{ success: boolean; data?: Reservation; error?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Error al procesar la reserva' };
      }
      return { success: true, data: data.data };
    } catch (e: any) {
      return { success: false, error: e.message || 'Error de conexión con el servidor' };
    }
  },

  async updateReservationStatus(id: string, status: ReservationStatus): Promise<Reservation | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Error al actualizar estado');
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  async getMetrics(): Promise<RestaurantMetrics | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/metrics`);
      if (!res.ok) throw new Error('Error al obtener métricas');
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  async getNotifications(): Promise<AppNotification[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/metrics/notifications`);
      if (!res.ok) throw new Error('Error al obtener notificaciones');
      const data = await res.json();
      return data.data;
    } catch {
      return [];
    }
  },

  async markAllNotificationsRead(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/metrics/notifications/read-all`, {
        method: 'PATCH'
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async resetDemo(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/metrics/reset-demo`, {
        method: 'POST'
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async adminLogin(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return res.ok;
    } catch {
      // Local fallback for offline demo
      return (email === 'admin@restaurante.com' && password === 'admin123') || (email.length >= 4 && password.length >= 4);
    }
  }
};

