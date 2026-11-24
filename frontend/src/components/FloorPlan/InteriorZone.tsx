import React from 'react';
import { Footprints, CreditCard, Coffee, DoorClosed } from 'lucide-react';

export const InteriorZone: React.FC = () => {
  return (
    <>
      {/* Etiqueta Salón */}
      <div className="absolute top-3 left-4 z-0 flex items-center gap-2 select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Salón Interior
        </span>
      </div>

      {/* ENTRADA & SALIDA PRINCIPAL */}
      <div className="absolute top-0 left-[28%] -translate-x-1/2 z-0 select-none">
        <div className="flex flex-col items-center">
          <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-b-lg shadow text-[10px] font-bold flex items-center gap-1.5">
            <Footprints className="w-3.5 h-3.5 text-emerald-400" />
            <span>Entrada / Salida</span>
          </div>
          <div className="w-24 h-4 bg-slate-900 border border-slate-700/60 rounded-sm mt-0.5 flex items-center justify-center text-[8px] text-slate-400">
            INGRESO
          </div>
        </div>
      </div>

      {/* CAJA & MOSTRADOR (PAGAR / PEDIR CUENTA) */}
      <div className="absolute bottom-3 left-4 z-0 select-none">
        <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-2.5 shadow-md min-w-[190px]">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-800">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <CreditCard className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white">Mostrador / Caja</div>
              <div className="text-[9px] text-amber-300">Pagar y pedir la cuenta</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-300 px-1 py-0.5 bg-slate-950/70 rounded">
            <span>Terminal de Cobro</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Coffee className="w-2.5 h-2.5" /> Café
            </span>
          </div>

          {/* Taburetes */}
          <div className="flex justify-around mt-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500" />
            <div className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500" />
            <div className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500" />
          </div>
        </div>
      </div>

      {/* BAÑOS */}
      <div className="absolute top-3 left-[46%] -translate-x-1/2 z-0 select-none">
        <div className="bg-slate-900 border border-indigo-500/40 rounded-xl p-2 shadow-md">
          <div className="text-[10px] font-bold text-white flex items-center gap-1.5 mb-1">
            <span className="w-4 h-4 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[9px] font-bold">
              WC
            </span>
            <span>Baños (Damas / Caballeros)</span>
          </div>

          <div className="flex gap-2 text-[9px] text-slate-300">
            <div className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">🚻 Sanitarios</div>
            <div className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Lavamanos</div>
          </div>
        </div>
      </div>

      {/* Salida de Emergencia */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-0 select-none">
        <div className="bg-rose-950/90 border-r border-rose-500/50 px-2 py-1 rounded-r text-[8px] font-bold text-rose-300">
          <DoorClosed className="w-3 h-3 inline mr-1 text-rose-400" />
          Salida Emerg.
        </div>
      </div>
    </>
  );
};
