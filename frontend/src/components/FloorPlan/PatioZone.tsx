import React from 'react';
import { Sun, Trees } from 'lucide-react';

export const PatioZone: React.FC = () => {
  return (
    <>
      {/* Muro divisor con puerta corrediza */}
      <div className="absolute top-0 bottom-0 left-[62%] w-1.5 bg-slate-700 z-5 select-none">
        <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-4 h-24 bg-sky-950 border border-sky-400/40 rounded flex items-center justify-center">
          <span className="text-[7px] font-bold text-sky-200 -rotate-90 uppercase tracking-wider">
            Puerta Vidriada
          </span>
        </div>
      </div>

      {/* Etiqueta Patio */}
      <div className="absolute top-3 left-[65%] z-0 flex items-center gap-2 select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
          Patio Exterior
        </span>
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Sun className="w-3 h-3 text-amber-400" /> Aire Libre
        </span>
      </div>

      {/* Plantas decorativas */}
      <div className="absolute top-3 right-3 z-0 flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-600/30 rounded-lg px-2 py-1 select-none">
        <Trees className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[9px] font-medium text-emerald-300">Plantas & Jardín</span>
      </div>

      {/* Sombrillas de exterior */}
      <div className="absolute top-[28%] left-[72%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-amber-300/20 bg-amber-200/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-amber-400/30" />
      </div>

      <div className="absolute top-[52%] left-[72%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-amber-300/20 bg-amber-200/5 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-amber-400/30" />
      </div>
    </>
  );
};
