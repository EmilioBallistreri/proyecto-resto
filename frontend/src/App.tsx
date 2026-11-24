import React, { useState, useEffect } from 'react';
import { useRealtime } from './hooks/useRealtime';
import { Table, Reservation, AppNotification, UserProfile } from './types';
import { Header } from './components/Header';
import { FloorPlan } from './components/FloorPlan/FloorPlan';
import { DateSelector } from './components/Client/DateSelector';
import { AppEntryModal } from './components/Auth/AppEntryModal';
import { ReservationModal } from './components/Client/ReservationModal';
import { ReservationSuccessModal } from './components/Client/ReservationSuccessModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { NotificationDrawer } from './components/Admin/NotificationDrawer';
import { Toast } from './components/UI/Toast';

export const App: React.FC = () => {
  const {
    tables,
    reservations,
    currentSlotReservations,
    notifications,
    unreadCount,
    currentUser,
    userRole,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    setUserProfile,
    setUserRole,
    createReservation,
    updateTableStatus,
    updateReservationStatus,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    resetDemoData,
    getMetricsForPeriod,
  } = useRealtime();

  // Modal de inicio / Registro automático al ingresar
  const [isAppEntryOpen, setIsAppEntryOpen] = useState(false);

  // Abrir pop-up automáticamente si no ha ingresado rol
  useEffect(() => {
    if (!userRole) {
      setIsAppEntryOpen(true);
    }
  }, [userRole]);

  // Otros modales
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedTableForBooking, setSelectedTableForBooking] = useState<Table | null>(null);
  const [recentCompletedReservation, setRecentCompletedReservation] = useState<Reservation | null>(null);

  // Notificación flotante emergente
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      if (!latest.read) {
        setActiveToast(latest);
      }
    }
  }, [notifications]);

  // Selección de mesa por comensal
  const handleSelectTableCustomer = (table: Table) => {
    if (table.status !== 'available') return;
    setSelectedTableForBooking(table);
  };

  // Confirmar reserva
  const handleConfirmReservation = async (data: {
    tableId: string;
    customer: any;
    date: string;
    time: string;
    partySize: number;
    notes?: string;
  }) => {
    const result = await createReservation(data);
    if (result.success && result.reservation) {
      setSelectedTableForBooking(null);
      setRecentCompletedReservation(result.reservation);
    }
  };

  const handleRoleSelection = (role: 'client' | 'admin', profile?: UserProfile) => {
    if (profile) {
      setUserProfile(profile, role);
    } else {
      setUserRole(role);
    }
    setIsAppEntryOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Barra Superior */}
      <Header
        userRole={userRole}
        currentUser={currentUser}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAppEntry={() => setIsAppEntryOpen(true)}
        onResetDemo={resetDemoData}
      />

      {/* Cuerpo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-4 md:p-6 space-y-3">
        {userRole === 'admin' ? (
          /* VISTA ADMINISTRADOR / DUEÑO DEL COMERCIO */
          <AdminDashboard
            tables={tables}
            reservations={reservations}
            currentSlotReservations={currentSlotReservations}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
            onUpdateTableStatus={updateTableStatus}
            onUpdateReservationStatus={updateReservationStatus}
            getMetricsForPeriod={getMetricsForPeriod}
          />
        ) : (
          /* VISTA CLIENTE / COMENSAL */
          <div className="space-y-3">
            {/* Selector de Fecha (Manual + Calendario) y Hora en tiempo real */}
            <DateSelector
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />

            {/* Plano de Mesas 2D Interactivo */}
            <FloorPlan
              tables={tables}
              selectedTable={selectedTableForBooking}
              onSelectTable={handleSelectTableCustomer}
              isAdmin={false}
            />
          </div>
        )}
      </main>

      {/* Pie simple */}
      <footer className="border-t border-slate-900 bg-slate-950 text-slate-500 text-xs py-3 px-4 text-center">
        Restaurante Plano &copy; 2026 • Sistema de Mesas y Reservas en Tiempo Real
      </footer>

      {/* POP-UP AUTOMÁTICO DE REGISTRO E INGRESO (TIPO APP) */}
      <AppEntryModal
        isOpen={isAppEntryOpen}
        onClose={() => setIsAppEntryOpen(false)}
        onSelectRole={handleRoleSelection}
        currentUser={currentUser}
        currentRole={userRole}
      />

      {/* Modal de Reserva para el Cliente */}
      <ReservationModal
        table={selectedTableForBooking}
        isOpen={!!selectedTableForBooking}
        onClose={() => setSelectedTableForBooking(null)}
        currentUser={currentUser}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onConfirm={handleConfirmReservation}
      />

      {/* Comprobante de Reserva Exitosa */}
      <ReservationSuccessModal
        reservation={recentCompletedReservation}
        isOpen={!!recentCompletedReservation}
        onClose={() => setRecentCompletedReservation(null)}
      />

      {/* Centro de Notificaciones */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={markNotificationAsRead}
        onMarkAllRead={markAllNotificationsAsRead}
      />

      {/* Alerta flotante en tiempo real */}
      <Toast
        notification={activeToast}
        onClose={() => setActiveToast(null)}
      />
    </div>
  );
};

export default App;
