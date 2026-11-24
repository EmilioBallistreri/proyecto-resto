import React from 'react';
import { Table, TableStatus } from '../../types';
import { Users } from 'lucide-react';

interface TableElementProps {
  table: Table;
  isSelected: boolean;
  onSelect: (table: Table) => void;
  isAdmin?: boolean;
}

export const TableElement: React.FC<TableElementProps> = ({
  table,
  isSelected,
  onSelect,
  isAdmin = false
}) => {
  const { tableNumber, capacity, status, shape, x, y } = table;

  const getStyle = (st: TableStatus) => {
    switch (st) {
      case 'available':
        return {
          bg: 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/80 text-emerald-100',
          ring: 'hover:ring-2 hover:ring-emerald-400/50',
          dot: 'bg-emerald-400',
          text: 'Libre',
          cursor: 'cursor-pointer'
        };
      case 'reserved':
        return {
          bg: 'bg-amber-950/90 hover:bg-amber-900 border-amber-500/80 text-amber-100',
          ring: 'hover:ring-2 hover:ring-amber-400/50',
          dot: 'bg-amber-400',
          text: 'Reservada',
          cursor: isAdmin ? 'cursor-pointer' : 'cursor-not-allowed opacity-85'
        };
      case 'occupied':
      case 'billing':
        return {
          bg: 'bg-rose-950/90 hover:bg-rose-900 border-rose-500/80 text-rose-100',
          ring: 'hover:ring-2 hover:ring-rose-400/50',
          dot: 'bg-rose-500',
          text: 'Ocupada',
          cursor: isAdmin ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
        };
    }
  };

  const style = getStyle(status);

  // Sillas dibujadas alrededor
  const renderChairs = () => {
    const base = "absolute bg-slate-700 border border-slate-600 shadow-sm";
    if (capacity === 2) {
      return (
        <>
          <div className={`${base} w-6 h-2 -top-2.5 left-1/2 -translate-x-1/2 rounded-t-sm`} />
          <div className={`${base} w-6 h-2 -bottom-2.5 left-1/2 -translate-x-1/2 rounded-b-sm`} />
        </>
      );
    }
    if (capacity === 4) {
      return (
        <>
          <div className={`${base} w-7 h-2 -top-2.5 left-1/2 -translate-x-1/2 rounded-t-sm`} />
          <div className={`${base} w-7 h-2 -bottom-2.5 left-1/2 -translate-x-1/2 rounded-b-sm`} />
          <div className={`${base} w-2 h-7 -left-2.5 top-1/2 -translate-y-1/2 rounded-l-sm`} />
          <div className={`${base} w-2 h-7 -right-2.5 top-1/2 -translate-y-1/2 rounded-r-sm`} />
        </>
      );
    }
    if (capacity === 5) {
      if (shape === 'round') {
        return (
          <>
            <div className={`${base} w-6 h-2 -top-2.5 left-1/2 -translate-x-1/2 rounded-t-sm`} />
            <div className={`${base} w-2 h-6 -right-2.5 top-1/4 -translate-y-1/2 rounded-r-sm`} />
            <div className={`${base} w-2 h-6 -right-2.5 top-3/4 -translate-y-1/2 rounded-r-sm`} />
            <div className={`${base} w-6 h-2 -bottom-2.5 left-1/2 -translate-x-1/2 rounded-b-sm`} />
            <div className={`${base} w-2 h-6 -left-2.5 top-1/2 -translate-y-1/2 rounded-l-sm`} />
          </>
        );
      }
      return (
        <>
          <div className={`${base} w-6 h-2 -top-2.5 left-1/4 -translate-x-1/2 rounded-t-sm`} />
          <div className={`${base} w-6 h-2 -top-2.5 left-3/4 -translate-x-1/2 rounded-t-sm`} />
          <div className={`${base} w-6 h-2 -bottom-2.5 left-1/4 -translate-x-1/2 rounded-b-sm`} />
          <div className={`${base} w-6 h-2 -bottom-2.5 left-3/4 -translate-x-1/2 rounded-b-sm`} />
          <div className={`${base} w-2 h-7 -right-2.5 top-1/2 -translate-y-1/2 rounded-r-sm`} />
        </>
      );
    }
    return null;
  };

  const getSize = () => {
    if (shape === 'round') {
      return capacity === 5 ? 'w-22 h-22 rounded-full' : 'w-18 h-18 rounded-full';
    }
    if (shape === 'rect') {
      return 'w-26 h-18 rounded-xl';
    }
    return capacity === 4 ? 'w-20 h-20 rounded-xl' : 'w-16 h-16 rounded-lg';
  };

  return (
    <div
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 select-none z-10 transition-transform"
      onClick={() => {
        if (isAdmin || status === 'available') {
          onSelect(table);
        }
      }}
    >
      <div
        className={`relative flex flex-col items-center justify-center p-1.5 border-2 shadow-md transition-all ${getSize()} ${style.bg} ${style.ring} ${style.cursor} ${
          isSelected ? 'ring-4 ring-amber-400 scale-105 border-white shadow-lg' : ''
        }`}
      >
        {renderChairs()}

        {/* Punto de estado */}
        <div className="absolute top-1 right-1.5">
          <span className={`block w-2 h-2 rounded-full ${style.dot}`} />
        </div>

        {/* Número de mesa */}
        <div className="font-extrabold text-sm text-white">
          Mesa {tableNumber}
        </div>

        {/* Capacidad */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-200 mt-0.5">
          <Users className="w-3 h-3 text-amber-400" />
          <span>{capacity} pers</span>
        </div>

        {/* Estado simple */}
        <div className="text-[9px] font-medium opacity-80 mt-0.5">
          {style.text}
        </div>
      </div>
    </div>
  );
};
