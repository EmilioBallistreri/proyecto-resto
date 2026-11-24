import React, { useState } from 'react';
import { Table, Reservation, TableStatus, ReservationStatus } from '../../types';
import { FloorPlan } from '../FloorPlan/FloorPlan';
import { AdminTableActionModal } from './AdminTableActionModal';
import { AdminMetricsView } from './AdminMetricsView';
import { DateSelector } from '../Client/DateSelector';
import { Map, BarChart3, ClipboardList, Phone } from 'lucide-react';

interface AdminDashboardProps {
  tables: Table[];
  reservations: Reservation[];
  currentSlotReservations: Reservation[];
  selectedDate: string;
  selectedTime: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
  onUpdateReservationStatus: (resId: string, status: ReservationStatus) => void;
  getMetricsForPeriod: (period: any) => any;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tables,
  reservations,
  currentSlotReservations,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onUpdateTableStatus,
  onUpdateReservationStatus,
  getMetricsForPeriod,
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'metrics' | 'reservations'>('map');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const availableTables = tables.filter((t) => t.status === 'available').length;
  const reservedTables = tables.filter((t) => t.status === 'reserved').length;
  const occupiedTables = tables.filter((t) => t.status === 'occupied').length;

  const currentReservationForSelectedTable = selectedTable
    ? reservations.find(
        (r) =>
          r.tableId === selectedTable.id &&
          r.date === selectedDate &&
          r.time === selectedTime &&
          (r.status === 'confirmed' || r.status === 'seated')
      )
    : undefined;

  return (
    <div className="space-y-3">
      {/* Pestañas Principales del Dueño */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Plano y Mesas en Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'metrics'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Métricas & Ventas</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'reservations'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Lista de Reservas ({reservations.length})</span>
          </button>
        </div>

        {/* Resumen rápido del horario actual */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold px-2">
          <span className="text-emerald-400">{availableTables} Libres</span>
          <span className="text-amber-400">{reservedTables} Reservadas</span>
          <span className="text-rose-400">{occupiedTables} Ocupadas</span>
        </div>
      </div>

      {/* PESTAÑA 1: PLANO DE MESAS EN VIVO */}
      {activeTab === 'map' && (
        <div className="space-y-3">
          {/* Selector de Fecha y Hora (Cambia las mesas en tiempo real) */}
          <DateSelector
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            selectedTime={selectedTime}
            onSelectTime={onSelectTime}
          />

          {/* Plano 2D */}
          <FloorPlan
            tables={tables}
            selectedTable={selectedTable}
            onSelectTable={(table) => setSelectedTable(table)}
            isAdmin={true}
          />

          {/* Resumen de reservas para la hora seleccionada */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
            <h4 className="font-bold text-white text-sm mb-2">
              Reservas para las {selectedTime} hs ({currentSlotReservations.length})
            </h4>

            {currentSlotReservations.length === 0 ? (
              <p className="text-xs text-slate-500">
                No hay reservas registradas para las {selectedTime} hs. Todas las mesas libres están disponibles.
              </p>
            ) : (
              <div className="space-y-2">
                {currentSlotReservations.map((res) => {
                  const cleanPhone = res.customer.telefono.replace(/[^\d+]/g, '');
                  return (
                    <div
                      key={res.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-white text-sm">Mesa {res.tableNumber}</strong> — {res.customer.nombre} {res.customer.apellido} (DNI: {res.customer.dni} • {res.partySize} personas)
                      </div>
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-700 hover:bg-emerald-600 text-white p-1.5 rounded-lg flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: PANEL DE MÉTRICAS Y ESTADÍSTICAS */}
      {activeTab === 'metrics' && (
        <AdminMetricsView getMetricsForPeriod={getMetricsForPeriod} />
      )}

      {/* PESTAÑA 3: LISTADO COMPLETO DE RESERVAS */}
      {activeTab === 'reservations' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
          <h3 className="font-bold text-white text-base mb-3">
            📋 Todas las Reservas Registradas ({reservations.length})
          </h3>

          <div className="space-y-2">
            {reservations.map((res) => {
              const cleanPhone = res.customer.telefono.replace(/[^\d+]/g, '');
              return (
                <div
                  key={res.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Mesa #{res.tableNumber}</span>
                      <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">
                        {res.date} a las {res.time} hs
                      </span>
                      <span className="text-slate-400">
                        {res.partySize} personas ({res.area === 'interior' ? 'Salón' : 'Patio'})
                      </span>
                    </div>

                    <div className="text-slate-300">
                      <strong>{res.customer.nombre} {res.customer.apellido}</strong> • DNI: {res.customer.dni} • Tel: {res.customer.telefono}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {res.status === 'confirmed' && (
                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'seated')}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Sentar
                      </button>
                    )}

                    {res.status === 'seated' && (
                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'completed')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Liberar Mesa
                      </button>
                    )}

                    <a
                      href={`https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(res.customer.nombre)},%20te%20escribimos%20del%20restaurante.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700/80 hover:bg-emerald-600 text-white p-2 rounded-lg transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal para cambiar estado de mesa */}
      <AdminTableActionModal
        table={selectedTable}
        isOpen={!!selectedTable}
        onClose={() => setSelectedTable(null)}
        onUpdateStatus={onUpdateTableStatus}
        reservation={currentReservationForSelectedTable}
      />
    </div>
  );
};
