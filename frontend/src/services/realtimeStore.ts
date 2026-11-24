import { Table, Reservation, AppNotification, UserProfile, TableStatus, ReservationStatus, RestaurantMetrics } from '../types';
import { INITIAL_TABLES } from '../data/initialTables';
import { INITIAL_RESERVATIONS } from '../data/mockReservations';
import { soundService } from './audio';
import { api } from './api';
import { initSocket } from './socket';

const STORAGE_KEYS = {
  RESERVATIONS: 'rest_reservations_v3',
  NOTIFICATIONS: 'rest_notifications_v3',
  USER_PROFILE: 'rest_user_profile_v3',
  USER_ROLE: 'rest_user_role_v3', // 'client' | 'admin' | null
  SLOT_OVERRIDES: 'rest_slot_overrides_v3',
};

type StoreListener = () => void;

class RealtimeStore {
  private baseTables: Table[] = [];
  private reservations: Reservation[] = [];
  private notifications: AppNotification[] = [];
  private slotOverrides: Record<string, TableStatus> = {};
  private currentUser: UserProfile | null = null;
  private userRole: 'client' | 'admin' | null = null;
  private selectedDate: string = '2026-11-13'; // Hoy Viernes 13
  private selectedTime: string = '21:00';
  private listeners: Set<StoreListener> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.initStore();
    this.setupBroadcastChannel();
    this.setupSocketConnection();
  }

  private initStore() {
    if (typeof window === 'undefined') return;

    this.baseTables = JSON.parse(JSON.stringify(INITIAL_TABLES));

    // Load reservations
    const storedRes = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    this.reservations = storedRes ? JSON.parse(storedRes) : [...INITIAL_RESERVATIONS];

    // Load slot overrides (key: `${date}_${time}_${tableId}`)
    const storedOverrides = localStorage.getItem(STORAGE_KEYS.SLOT_OVERRIDES);
    if (storedOverrides) {
      try {
        this.slotOverrides = JSON.parse(storedOverrides);
      } catch {
        this.initDefaultOverrides();
      }
    } else {
      this.initDefaultOverrides();
    }

    // Load notifications
    const storedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    this.notifications = storedNotifs ? JSON.parse(storedNotifs) : this.getDefaultNotifications();

    // Load user
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch {
        this.currentUser = null;
      }
    }

    // Load role
    const storedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE) as 'client' | 'admin' | null;
    this.userRole = storedRole || null;
  }

  private initDefaultOverrides() {
    this.slotOverrides = {
      // Diferentes mesas ocupadas y reservadas según el horario
      '2026-11-13_13:00_t-4': 'occupied',
      '2026-11-13_14:00_t-5': 'occupied',
      '2026-11-13_20:30_t-7': 'reserved',
      '2026-11-13_21:30_t-13': 'occupied',
    };
    this.persistOverrides();
  }

  private getDefaultNotifications(): AppNotification[] {
    return [
      {
        id: 'notif-1',
        title: 'Nueva Reserva (Almuerzo)',
        message: 'Martín Sosa reservó la Mesa 1 para las 13:00 hs (2 personas). DNI: 37.192.831',
        time: '08:00 hs',
        type: 'reservation_new',
        read: false,
        reservationId: 'res-101',
        tableNumber: 1
      },
      {
        id: 'notif-2',
        title: 'Nueva Reserva (Cena)',
        message: 'Luciana Rodríguez reservó la Mesa 3 para las 21:00 hs (5 personas). DNI: 36.892.410',
        time: '09:15 hs',
        type: 'reservation_new',
        read: false,
        reservationId: 'res-109',
        tableNumber: 3
      },
      {
        id: 'notif-3',
        title: 'Nueva Reserva (Patio)',
        message: 'Camila Fernández reservó la Mesa 10 (Patio) para las 21:30 hs (4 personas). DNI: 38.562.901',
        time: '09:00 hs',
        type: 'reservation_new',
        read: false,
        reservationId: 'res-111',
        tableNumber: 10
      }
    ];
  }

  private setupSocketConnection() {
    initSocket(
      (data) => {
        if (data.reservations) this.reservations = data.reservations;
        if (data.notifications) this.notifications = data.notifications;
        this.persistLocal();
        this.notify();
      },
      (payload) => {
        soundService.playNotification();
        if (payload.notification) {
          this.notifications = [payload.notification, ...this.notifications];
        }
        this.notify();
      }
    );
  }

  private setupBroadcastChannel() {
    if (typeof window === 'undefined') return;
    try {
      this.broadcastChannel = new BroadcastChannel('restaurant_live_channel');
      this.broadcastChannel.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'SYNC') {
          this.reservations = payload.reservations;
          this.notifications = payload.notifications;
          this.slotOverrides = payload.slotOverrides;
          if (payload.sound) {
            soundService.playNotification();
          }
          this.notify();
        }
      };
    } catch {
      // Fallback
    }
  }

  private persistLocal() {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(this.reservations));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.notifications));
  }

  private persistOverrides() {
    localStorage.setItem(STORAGE_KEYS.SLOT_OVERRIDES, JSON.stringify(this.slotOverrides));
  }

  private broadcast(sound: boolean = false) {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({
        type: 'SYNC',
        payload: {
          reservations: this.reservations,
          notifications: this.notifications,
          slotOverrides: this.slotOverrides,
          sound
        }
      });
    }
  }

  public subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // CALCULA EL ESTADO DINÁMICO DE LAS MESAS SEGÚN LA FECHA Y HORA SELECCIONADA
  public getTables(): Table[] {
    const date = this.selectedDate;
    const time = this.selectedTime;

    return this.baseTables.map((t) => {
      const slotKey = `${date}_${time}_${t.id}`;

      // 1. Override manual del administrador para esta fecha y hora
      if (this.slotOverrides[slotKey]) {
        return {
          ...t,
          status: this.slotOverrides[slotKey],
        };
      }

      // 2. Reserva de clientes para esta fecha y hora
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

      // 3. Mesa Libre
      return { ...t, status: 'available', currentReservationId: undefined };
    });
  }

  public getReservations(): Reservation[] {
    return this.reservations;
  }

  public getReservationsForCurrentSlot(): Reservation[] {
    return this.reservations.filter(
      (r) => r.date === this.selectedDate && r.time === this.selectedTime && r.status !== 'cancelled'
    );
  }

  public getNotifications(): AppNotification[] {
    return this.notifications;
  }

  public getUnreadNotificationCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public getUserRole(): 'client' | 'admin' | null {
    return this.userRole;
  }

  public getSelectedDate(): string {
    return this.selectedDate;
  }

  public getSelectedTime(): string {
    return this.selectedTime;
  }

  // SETTERS
  public setSelectedDate(date: string) {
    this.selectedDate = date;
    this.notify();
  }

  public setSelectedTime(time: string) {
    this.selectedTime = time;
    this.notify();
  }

  public setUserProfile(user: UserProfile, role: 'client' | 'admin') {
    this.currentUser = user;
    this.userRole = role;
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    this.notify();
  }

  public setUserRole(role: 'client' | 'admin' | null) {
    this.userRole = role;
    if (role) {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
    this.notify();
  }

  // ACCIONES
  public async createReservation(data: {
    tableId: string;
    customer: UserProfile;
    date: string;
    time: string;
    partySize: number;
    notes?: string;
  }): Promise<{ success: boolean; reservation?: Reservation; error?: string }> {
    const table = this.baseTables.find((t) => t.id === data.tableId);
    if (!table) {
      return { success: false, error: 'Mesa no encontrada.' };
    }

    if (data.partySize > table.capacity) {
      return { success: false, error: `Capacidad máxima: ${table.capacity} personas.` };
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

    // Bloquear mesa en ese horario
    this.slotOverrides[`${data.date}_${data.time}_${table.id}`] = 'reserved';

    this.reservations = [newReservation, ...this.reservations];

    const notif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: '¡Nueva Reserva de Cliente!',
      message: `Cliente ${data.customer.nombre} ${data.customer.apellido} seleccionó la Mesa ${table.tableNumber} para el ${data.date} a las ${data.time} hs (${data.partySize} personas). Tel: ${data.customer.telefono} • DNI: ${data.customer.dni}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'reservation_new',
      read: false,
      reservationId: reservationId,
      tableNumber: table.tableNumber
    };

    this.notifications = [notif, ...this.notifications];
    this.setUserProfile(data.customer, 'client');
    this.persistLocal();
    this.persistOverrides();
    this.broadcast(true);
    soundService.playSuccess();
    this.notify();

    // Sincronizar en segundo plano con el backend
    api.createReservation(data).catch(() => {});

    return { success: true, reservation: newReservation };
  }

  // Modificación manual por el Administrador para el horario seleccionado
  public async updateTableSlotStatus(tableId: string, status: TableStatus) {
    const slotKey = `${this.selectedDate}_${this.selectedTime}_${tableId}`;
    this.slotOverrides[slotKey] = status;

    // Si había una reserva en ese horario y mesa, actualizarla
    const res = this.reservations.find(
      (r) => r.tableId === tableId && r.date === this.selectedDate && r.time === this.selectedTime
    );
    if (res) {
      if (status === 'occupied') res.status = 'seated';
      if (status === 'available') res.status = 'completed';
      if (status === 'reserved') res.status = 'confirmed';
    }

    this.persistOverrides();
    this.persistLocal();
    this.broadcast(false);
    this.notify();

    api.updateTableStatus(tableId, status).catch(() => {});
  }

  public async updateReservationStatus(reservationId: string, status: ReservationStatus) {
    const res = this.reservations.find((r) => r.id === reservationId);
    if (!res) return;

    res.status = status;
    const slotKey = `${res.date}_${res.time}_${res.tableId}`;

    if (status === 'seated') {
      this.slotOverrides[slotKey] = 'occupied';
    } else if (status === 'completed' || status === 'cancelled') {
      this.slotOverrides[slotKey] = 'available';
    } else if (status === 'confirmed') {
      this.slotOverrides[slotKey] = 'reserved';
    }

    this.persistOverrides();
    this.persistLocal();
    this.broadcast(false);
    this.notify();
  }

  public markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.persistLocal();
    this.notify();
  }

  public markAllNotificationsAsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
    this.persistLocal();
    this.notify();
  }

  public resetDemoData() {
    this.baseTables = JSON.parse(JSON.stringify(INITIAL_TABLES));
    this.reservations = JSON.parse(JSON.stringify(INITIAL_RESERVATIONS));
    this.initDefaultOverrides();
    this.notifications = this.getDefaultNotifications();
    this.persistLocal();
    this.persistOverrides();
    this.broadcast(false);
    this.notify();
    api.resetDemo().catch(() => {});
  }

  // MÉTRICAS FILTRADAS POR RANGO TEMPORAL (HOY, 2 DÍAS, 7 DÍAS, 10 DÍAS, 30 DÍAS)
  public getMetricsForPeriod(period: 'today' | '2days' | '7days' | '10days' | '30days') {
    const today = '2026-11-13';
    const now = new Date(today);

    let startDate = new Date(today);
    let endDate = new Date(today);
    let label = 'Hoy (Viernes 13)';

    switch (period) {
      case 'today':
        startDate = new Date(today);
        endDate = new Date(today);
        label = 'Hoy (Viernes 13 de Noviembre)';
        break;
      case '2days':
        startDate.setDate(now.getDate() - 2);
        endDate = new Date(today);
        label = 'Últimos 2 días (Ayer y Hoy)';
        break;
      case '7days':
        startDate.setDate(now.getDate() - 7);
        endDate = new Date(today);
        label = 'Última semana (7 días)';
        break;
      case '10days':
        startDate = new Date(today);
        endDate.setDate(now.getDate() + 10);
        label = 'Próximos 10 días';
        break;
      case '30days':
        startDate.setDate(now.getDate() - 15);
        endDate.setDate(now.getDate() + 15);
        label = 'Mes completo (30 días)';
        break;
    }

    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const periodReservations = this.reservations.filter((r) => {
      return r.date >= startStr && r.date <= endStr && r.status !== 'cancelled';
    });

    const totalGuests = periodReservations.reduce((sum, r) => sum + r.partySize, 0);
    const avgTicket = 6500; // $6.500 ticket promedio
    const estimatedSales = totalGuests * avgTicket;

    const totalCapacity = this.baseTables.reduce((sum, t) => sum + t.capacity, 0);
    const estimatedOccupancy = Math.min(96, Math.max(40, Math.round((totalGuests / (totalCapacity * 2 || 1)) * 100)));

    // Reservas de hoy para el turno actual
    const currentSlotTables = this.getTables();
    const availableTables = currentSlotTables.filter((t) => t.status === 'available').length;
    const reservedTables = currentSlotTables.filter((t) => t.status === 'reserved').length;
    const occupiedTables = currentSlotTables.filter((t) => t.status === 'occupied').length;

    return {
      period,
      periodLabel: label,
      startDate: startStr,
      endDate: endStr,
      totalReservations: periodReservations.length,
      totalGuests,
      estimatedSales,
      estimatedOccupancy,
      availableTables,
      reservedTables,
      occupiedTables,
      peakHour: '21:30 hs',
      reservations: periodReservations,
    };
  }
}

export const realtimeStore = new RealtimeStore();
