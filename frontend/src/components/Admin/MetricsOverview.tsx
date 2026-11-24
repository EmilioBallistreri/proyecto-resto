import React from 'react';
import { RestaurantMetrics, Table, Reservation } from '../../types';
import { Users, TrendingUp, CheckCircle, Clock, PieChart, Utensils, Award } from 'lucide-react';

interface MetricsOverviewProps {
  metrics: RestaurantMetrics;
  tables: Table[];
  reservations: Reservation[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics,
  tables,
  reservations,
}) => {
  const interiorTables = tables.filter((t) => t.area === 'interior');
  const patioTables = tables.filter((t) => t.area === 'patio');

  const interiorOccupied = interiorTables.filter((t) => t.status !== 'available').length;
  const patioOccupied = patioTables.filter((t) => t.status !== 'available').length;

  const tables2p = tables.filter((t) => t.capacity === 2);
  const tables4p = tables.filter((t) => t.capacity === 4);
  const tables5p = tables.filter((t) => t.capacity === 5);

  return (
    <div className="space-y-6">
      {/* Executive KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Ocupación */}
        <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Índice de Ocupación
            </span>
            <div className="w-8 h-8 rounded-xl bg-luxury-500/15 text-luxury-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {metrics.occupancyPercentage}%
          </div>
          <div className="w-full bg-slate-800/80 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-luxury-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.occupancyPercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex justify-between font-mono">
            <span>{metrics.reservedTables + metrics.occupiedTables} ocupadas</span>
            <span>{metrics.totalTables} total</span>
          </div>
        </div>

        {/* Comensales Esperados */}
        <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Cubiertos Esperados
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {metrics.totalGuestsExpected}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Confirmados en libro</span>
          </p>
        </div>

        {/* Reservas Totales */}
        <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Reservas del Turno
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {metrics.totalReservationsToday}
          </div>
          <p className="text-[11px] text-amber-300 font-medium mt-2">
            Almuerzo & Cena
          </p>
        </div>

        {/* Horario Pico */}
        <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Horario de Máxima Demanda
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {metrics.peakHour}
          </div>
          <p className="text-[11px] text-indigo-300 font-medium mt-2">
            Proyección de afluencia pico
          </p>
        </div>
      </div>

      {/* Sector and Table Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Distribución por Sector */}
        <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="font-serif font-bold text-white text-sm mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-luxury-400" />
            <span>Ocupación por Sector del Establecimiento</span>
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Salón Principal</span>
                <span className="text-luxury-300 font-mono font-semibold">
                  {interiorOccupied} de {interiorTables.length} mesas ({Math.round((interiorOccupied / interiorTables.length) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-luxury-500 h-full rounded-full transition-all"
                  style={{ width: `${(interiorOccupied / interiorTables.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Terraza Exterior & Deck</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  {patioOccupied} de {patioTables.length} mesas ({Math.round((patioOccupied / patioTables.length) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${(patioOccupied / patioTables.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disponibilidad por Capacidad */}
        <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="font-serif font-bold text-white text-sm mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-luxury-400" />
            <span>Disponibilidad por Tipo de Mesa</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#070b14] border border-slate-800 p-3 rounded-xl">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mesas 2P</div>
              <div className="text-xl font-bold text-white mt-1 font-mono">
                {tables2p.filter((t) => t.status === 'available').length} / {tables2p.length}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">libres ahora</div>
            </div>

            <div className="bg-[#070b14] border border-slate-800 p-3 rounded-xl">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mesas 4P</div>
              <div className="text-xl font-bold text-white mt-1 font-mono">
                {tables4p.filter((t) => t.status === 'available').length} / {tables4p.length}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">libres ahora</div>
            </div>

            <div className="bg-[#070b14] border border-slate-800 p-3 rounded-xl">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mesas 5P</div>
              <div className="text-xl font-bold text-white mt-1 font-mono">
                {tables5p.filter((t) => t.status === 'available').length} / {tables5p.length}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">libres ahora</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
