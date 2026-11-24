import React from 'react';

interface FloorLegendProps {
  availableCount: number;
  reservedCount: number;
  occupiedCount: number;
  isAdmin?: boolean;
}

export const FloorLegend: React.FC<FloorLegendProps> = ({
  availableCount,
  reservedCount,
  occupiedCount,
  isAdmin = false
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 mb-3 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Estado de las mesas */}
      <div className="flex flex-wrap items-center gap-4 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-slate-300">Libres:</span>
          <span className="font-bold text-emerald-400">{availableCount}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-slate-300">Reservadas:</span>
          <span className="font-bold text-amber-400">{reservedCount}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-slate-300">Ocupadas:</span>
          <span className="font-bold text-rose-400">{occupiedCount}</span>
        </div>
      </div>

      {/* Indicación clara y amigable */}
      <div className="text-[11px] text-slate-400">
        {isAdmin ? (
          <span className="text-amber-400 font-medium">💡 Tocá cualquier mesa para cambiar su estado o ver datos</span>
        ) : (
          <span>👉 Tocá una mesa en <strong className="text-emerald-400 font-bold">verde</strong> para reservarla</span>
        )}
      </div>
    </div>
  );
};
