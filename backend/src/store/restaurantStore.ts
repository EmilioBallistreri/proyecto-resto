import { Table, Reservation, AppNotification, RestaurantMetrics, TableStatus, ReservationStatus, UserProfile } from '../types/index.js';
import { INITIAL_TABLES } from '../data/initialTables.js';
import { INITIAL_RESERVATIONS } from '../data/mockReservations.js';

class RestaurantStore {
  private baseTables: Table[] = [];
  private reservations: Reservation[] = [];
  private notifications: AppNotification[] = [];
  // Slot overrides: key = `${date}_${time}_${tableId}` -> TableStatus
  private slotOverrides: Record<string, TableStatus> = {};

  constructor() {
    this.resetToDefaults();
  }

  public resetToDefaults() {
    this.baseTables = JSON.parse(JSON.stringify(INITIAL_TABLES));
    this.reservations = JSON.parse(JSON.stringify(INITIAL_RESERVATIONS));
    this.slotOverrides = {
      // Semillas para horarios específicos de hoy (2026-11-13)
      '2026-11-13_13:00_t-4': 'occupied',
      '2026-11-13_14:00_t-5': 'occupied',
      '2026-11-13_20:30_t-7': 'reserved',
      '2026-11-13_21:30_t-13': 'occupied',
    };

    this.notifications = [
      {
        id: 'notif-1',
        title: 'Nueva Reserva - Almuerzo',
        message: 'Cliente Martín Sosa reservó la Mesa 1 para las 13:00 hs (2 personas). DNI: 37.192.831',
        time: '08:00 hs',
        type: 'reservation_new',
        read: false,
        reservationId: 'res-101',
        tableNumber: 1
      },
      {
        id: 'notif-2',
        title: 'Nueva Reserva - Cena',
        message: 'Cliente Luciana Rodríguez reservó la Mesa 3 (Salón) para las 21:00 hs (5 personas). DNI: 36.892.410',
        time: '09:15 hs',
        type: 'reservation_new',
        read: false,
        reservationId: 'res-109',
        tableNumber: 3
      },
      {
        id: 'notif-3',
        title: 'Nueva Reserva - Patio',
        message: 'Cliente Camila Fernández reservó la Mesa 10 (Deck Patio) para las 21:30 hs (4 personas). DNI: 38.562.901',
        time: '09:00 hs',
        type: 'reservation_new',
        read: false,
        reservationId: 'res-111',
        tableNumber: 10
      }
    ];
  }

  // Obtiene las mesas con su estado exacto para una fecha y hora específica
  public getTablesForSlot(date: string, time: string): Table[] {
    return this.baseTables.map((t) => {
      const slotKey = `${date}_${time}_${t.id}`;
      // 1. Revisar si hay override manual del administrador
      if (this.slotOverrides[slotKey]) {
        return {
          ...t,
          status: this.slotOverrides[slotKey],
        };
      }

      // 2. Revisar si hay una reserva para esa mesa en esa fecha y hora
      const matchRes = this.reservations.find(
        (r) => r.tableId === t.id && r.date === date && r.time === time && r.status !== 'cancelled'
      );

      if (matchRes) {
        if (matchRes.status === 'seated') {
          return { ...t, status: 'occupied', currentReservationId: matchRes.id };
        }
        if (matchRes.status === 'confirmed') {
          return { ...t, status: 'reserved', currentReservationId: matchRes.id };
        }
      }

      // 3. Por defecto libre
      return { ...t, status: 'available', currentReservationId: undefined };
    });
  }

  public getTables(): Table[] {
    return this.getTablesForSlot('2026-11-13', '21:00');
  }

  public getReservations(): Reservation[] {
    return this.reservations;
  }

  public getNotifications(): AppNotification[] {
    return this.notifications;
  }

  public createReservation(data: {
    tableId: string;
    customer: UserProfile;
    date: string;
    time: string;
    partySize: number;
    notes?: string;
  }): { success: boolean; reservation?: Reservation; notification?: AppNotification; error?: string } {
    const table = this.baseTables.find((t) => t.id === data.tableId);
    if (!table) {
      return { success: false, error: 'Mesa no encontrada en el plano.' };
    }

    if (data.partySize > table.capacity) {
      return { success: false, error: `La mesa admite hasta ${table.capacity} personas.` };
    }

    const reservationCode = 'RES-' + Math.floor(1000 + Math.random() * 9000);
    const reservationId = 'res-' + Date.now();

    const newReservation: Reservation = {
      id: reservationId,
      code: reservationCode,
      tableId: table.id,
      tableNumber: table.tableNumber,
      area: table.area,
      partySize: data.partySize,
      date: data.date,
      time: data.time,
      customer: data.customer,
      status: 'confirmed',
      notes: data.notes,
      createdAt: new Date().toISOString()
    };

    // Marcar como reservada para esa fecha y hora específica
    this.slotOverrides[`${data.date}_${data.time}_${table.id}`] = 'reserved';

    this.reservations.unshift(newReservation);

    const nowHours = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const notification: AppNotification = {
      id: 'notif-' + Date.now(),
      title: '¡Nueva Reserva Recibida!',
      message: `Cliente ${data.customer.nombre} ${data.customer.apellido} reservó la Mesa ${table.tableNumber} para el ${data.date} a las ${data.time} hs (${data.partySize} personas). Tel: ${data.customer.telefono} • DNI: ${data.customer.dni}`,
      time: nowHours,
      type: 'reservation_new',
      read: false,
      reservationId: reservationId,
      tableNumber: table.tableNumber
    };

    this.notifications.unshift(notification);

    return {
      success: true,
      reservation: newReservation,
      notification
    };
  }

  public updateTableSlotStatus(tableId: string, date: string, time: string, status: TableStatus) {
    const slotKey = `${date}_${time}_${tableId}`;
    this.slotOverrides[slotKey] = status;

    // Si había una reserva en ese slot, sincronizar su estado
    const res = this.reservations.find((r) => r.tableId === tableId && r.date === date && r.time === time);
    if (res) {
      if (status === 'occupied') res.status = 'seated';
      if (status === 'available') res.status = 'completed';
      if (status === 'reserved') res.status = 'confirmed';
    }
  }

  public updateReservationStatus(reservationId: string, status: ReservationStatus): Reservation | null {
    const res = this.reservations.find((r) => r.id === reservationId);
    if (!res) return null;

    res.status = status;
    const slotKey = `${res.date}_${res.time}_${res.tableId}`;

    if (status === 'seated') {
      this.slotOverrides[slotKey] = 'occupied';
    } else if (status === 'completed' || status === 'cancelled') {
      this.slotOverrides[slotKey] = 'available';
    } else if (status === 'confirmed') {
      this.slotOverrides[slotKey] = 'reserved';
    }

    return res;
  }

  public markAllNotificationsAsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
  }

  public getMetrics(): any {
    return this.getMetricsByPeriod('today');
  }

  // Métricas avanzadas filtradas por rango temporal
  public getMetricsByPeriod(period: 'today' | '2days' | '7days' | '10days' | '30days'): any {
    const today = '2026-11-13';
    const now = new Date(today);

    let startDate = new Date(today);
    let endDate = new Date(today);

    switch (period) {
      case 'today':
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case '2days':
        startDate.setDate(now.getDate() - 2);
        endDate = new Date(today);
        break;
      case '7days':
        startDate.setDate(now.getDate() - 7);
        endDate = new Date(today);
        break;
      case '10days':
        startDate = new Date(today);
        endDate.setDate(now.getDate() + 10);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 15);
        endDate.setDate(now.getDate() + 15);
        break;
    }

    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const filteredReservations = this.reservations.filter((r) => {
      return r.date >= startStr && r.date <= endStr && r.status !== 'cancelled';
    });

    const totalGuests = filteredReservations.reduce((sum, r) => sum + r.partySize, 0);
    const avgTicketPerGuest = 6500; // $6.500 ticket promedio gastronómico
    const estimatedSales = totalGuests * avgTicketPerGuest;

    // Calcular ocupación estimada
    const totalCapacityAllTables = this.baseTables.reduce((sum, t) => sum + t.capacity, 0);
    const occupancyRate = Math.min(94, Math.max(35, Math.round((totalGuests / (totalCapacityAllTables * 2 || 1)) * 100)));

    return {
      period,
      startDate: startStr,
      endDate: endStr,
      totalReservations: filteredReservations.length,
      totalGuests,
      estimatedSales,
      occupancyPercentage: occupancyRate,
      peakHour: '21:30 hs',
      reservations: filteredReservations
    };
  }
}

export const restaurantStore = new RestaurantStore();
