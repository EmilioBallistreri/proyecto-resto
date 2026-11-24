import { useState, useEffect } from 'react';
import { realtimeStore } from '../services/realtimeStore';

export function useRealtime() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = realtimeStore.subscribe(() => {
      setTick((prev) => prev + 1);
    });
    return unsubscribe;
  }, []);

  return {
    tables: realtimeStore.getTables(),
    reservations: realtimeStore.getReservations(),
    currentSlotReservations: realtimeStore.getReservationsForCurrentSlot(),
    notifications: realtimeStore.getNotifications(),
    unreadCount: realtimeStore.getUnreadNotificationCount(),
    currentUser: realtimeStore.getCurrentUser(),
    userRole: realtimeStore.getUserRole(),
    selectedDate: realtimeStore.getSelectedDate(),
    selectedTime: realtimeStore.getSelectedTime(),

    // actions
    setSelectedDate: (date: string) => realtimeStore.setSelectedDate(date),
    setSelectedTime: (time: string) => realtimeStore.setSelectedTime(time),
    setUserProfile: (profile: any, role: 'client' | 'admin') => realtimeStore.setUserProfile(profile, role),
    setUserRole: (role: 'client' | 'admin' | null) => realtimeStore.setUserRole(role),
    createReservation: (data: any) => realtimeStore.createReservation(data),
    updateTableStatus: (tableId: string, status: any) => realtimeStore.updateTableSlotStatus(tableId, status),
    updateReservationStatus: (reservationId: string, status: any) => realtimeStore.updateReservationStatus(reservationId, status),
    markNotificationAsRead: (id: string) => realtimeStore.markNotificationAsRead(id),
    markAllNotificationsAsRead: () => realtimeStore.markAllNotificationsAsRead(),
    resetDemoData: () => realtimeStore.resetDemoData(),
    getMetricsForPeriod: (period: any) => realtimeStore.getMetricsForPeriod(period),
  };
}
