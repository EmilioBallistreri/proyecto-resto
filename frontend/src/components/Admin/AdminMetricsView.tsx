import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, Calendar, Clock, BarChart3, ChevronRight, Phone } from 'lucide-react';

interface AdminMetricsViewProps {
  getMetricsForPeriod: (period: 'today' | '2days' | '7days' | '10days' | '30days') => any;
}

export const AdminMetricsView: React.FC<AdminMetricsViewProps> = ({ getMetricsForPeriod }) => {
  const [period, setPeriod] = useState<'today' | '2days' | '7days' | '10days' | '30days'>('today');

  const data = getMetricsForPeriod(period);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Barra de Filtros de Tiempo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Período de Análisis:</span>
        </span>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setPeriod('today')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              period === 'today'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Hoy (13 Nov)
          </button>

          <button
            onClick={() => setPeriod('2days')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              period === '2days'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Últimos 2 días
          </button>

          <button
            onClick={() => setPeriod('7days')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              period === '7days'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Última Semana (7 días)
          </button>

          <button
            onClick={() => setPeriod('10days')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              period === '10days'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Próximos 10 días
          </button>

          <button
            onClick={() => setPeriod('30days')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              period === '30days'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Mes Completo (30 días)
          </button>
        </div>
      </div>

      {/* Tarjetas Principales de Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Ventas Estimadas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ventas Estimadas</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            $ {data.estimatedSales.toLocaleString('es-AR')}
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Ticket prom. $6.500 / comensal</p>
        </div>

        {/* Total Personas / Comensales */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Comensales</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {data.totalGuests} <span className="text-sm font-normal text-slate-400">personas</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Registrados en el período</p>
        </div>

        {/* Ocupación de Mesas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ocupación Promedio</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {data.occupancyPercentage}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all"
              style={{ width: `${data.occupancyPercentage}%` }}
            />
          </div>
        </div>

        {/* Total Reservas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Reservas</span>
            <Calendar className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {data.totalReservations} <span className="text-sm font-normal text-slate-400">mesas</span>
          </div>
          <p className="text-[10px] text-sky-400 mt-1">Hora pico: {data.peakHour}</p>
        </div>
      </div>

      {/* Lista detallada de reservas del período */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
        <h4 className="font-bold text-white text-sm mb-3 flex items-center justify-between">
          <span>Detalle de Reservas del Período ({data.reservations.length})</span>
          <span className="text-xs text-amber-400 font-normal">{data.periodLabel}</span>
        </h4>

        <div className="space-y-2">
          {data.reservations.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              No hay reservas en este rango de fechas.
            </div>
          ) : (
            data.reservations.map((res: any) => {
              const cleanPhone = res.customer.telefono.replace(/[^\d+]/g, '');
              return (
                <div
                  key={res.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Mesa #{res.tableNumber}</span>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                        {res.date} • {res.time} hs
                      </span>
                      <span className="text-slate-400">
                        {res.partySize} personas ({res.area === 'interior' ? 'Salón' : 'Patio'})
                      </span>
                    </div>

                    <div className="text-slate-300 mt-1">
                      <strong>{res.customer.nombre} {res.customer.apellido}</strong> • DNI: {res.customer.dni} • Tel: {res.customer.telefono}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(res.customer.nombre)},%20te%20escribimos%20del%20restaurante%20por%20tu%20reserva%20para%20la%20Mesa%20${res.tableNumber}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition text-xs font-bold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

