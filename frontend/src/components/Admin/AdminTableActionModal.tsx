import React from 'react';
import { Table, TableStatus, Reservation } from '../../types';
import { X, CheckCircle, UserCheck, Clock } from 'lucide-react';

interface AdminTableActionModalProps {
  table: Table | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (tableId: string, status: TableStatus) => void;
  reservation?: Reservation;
}

export const AdminTableActionModal: React.FC<AdminTableActionModalProps> = ({
  table,
  isOpen,
  onClose,
  onUpdateStatus,
  reservation,
}) => {
  if (!isOpen || !table) return null;

  const handleSetStatus = (status: TableStatus) => {
    onUpdateStatus(table.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-white">Mesa {table.tableNumber}</h3>
          <p className="text-xs text-slate-400">
            {table.area === 'interior' ? 'Salón Interior' : 'Patio Exterior'} • Capacidad: {table.capacity} personas
          </p>
        </div>

        {/* Datos de la reserva si tiene */}
        {reservation && (
          <div className="mb-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs space-y-1">
            <div className="text-[10px] uppercase font-bold text-amber-400">Datos de la Reserva</div>
            <div className="font-bold text-white text-sm">
              {reservation.customer.nombre} {reservation.customer.apellido}
            </div>
            <div className="text-slate-300">
              DNI: <strong>{reservation.customer.dni}</strong> • Tel: {reservation.customer.telefono}
            </div>
            <div className="text-slate-300">
              Hora: <strong className="text-amber-300">{reservation.time} hs</strong> ({reservation.partySize} personas)
            </div>
          </div>
        )}

        {/* Acciones directas */}
        <div className="space-y-2">
          <button
            onClick={() => handleSetStatus('available')}
            className="w-full py-2.5 px-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-xl flex items-center justify-between transition"
          >
            <span>Liberar Mesa (Poner en verde)</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={() => handleSetStatus('occupied')}
            className="w-full py-2.5 px-3 bg-rose-950/80 hover:bg-rose-900 border border-rose-500 text-rose-300 text-xs font-bold rounded-xl flex items-center justify-between transition"
          >
            <span>Sentar Clientes (Poner en rojo)</span>
            <UserCheck className="w-4 h-4 text-rose-400" />
          </button>

          <button
            onClick={() => handleSetStatus('reserved')}
            className="w-full py-2.5 px-3 bg-amber-950/80 hover:bg-amber-900 border border-amber-500 text-amber-300 text-xs font-bold rounded-xl flex items-center justify-between transition"
          >
            <span>Marcar como Reservada (Poner en naranja)</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
