import React, { useState } from 'react';
import { Reservation, ReservationStatus } from '../../types';
import { Search, Phone, Mail, CheckCircle2, UserCheck, XCircle, Clock, Download } from 'lucide-react';

interface ReservationsTableProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
}

export const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = reservations.filter((res) => {
    if (statusFilter !== 'all' && res.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = `${res.customer.nombre} ${res.customer.apellido}`.toLowerCase().includes(q);
      const matchDni = res.customer.dni.toLowerCase().includes(q);
      const matchCode = res.code.toLowerCase().includes(q);
      const matchTable = `mesa ${res.tableNumber}`.toLowerCase().includes(q);
      if (!matchName && !matchDni && !matchCode && !matchTable) return false;
    }
    return true;
  });

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" /> Confirmada
          </span>
        );
      case 'seated':
        return (
          <span className="bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
            <UserCheck className="w-3 h-3" /> En Servicio
          </span>
        );
      case 'completed':
        return (
          <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3 h-3" /> Completada
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
            <XCircle className="w-3 h-3" /> Anulada
          </span>
        );
    }
  };

  const handleExportCSV = () => {
    const headers = 'Código,Horario,Fecha,Mesa,Sector,Titular,DNI,Teléfono,Email,Comensales,Estado\n';
    const rows = filtered
      .map(
        (r) =>
          `"${r.code}","${r.time}","${r.date}","Mesa ${r.tableNumber}","${r.area}","${r.customer.nombre} ${r.customer.apellido}","${r.customer.dni}","${r.customer.telefono}","${r.customer.email}",${r.partySize},"${r.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `libro_reservas_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#0b111e]/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="font-serif font-bold text-white text-base">Libro Maestro de Reservas</h3>
          <p className="text-xs text-slate-400">
            Registro cronológico de clientes, comensales y seguimiento de servicio en mesa
          </p>
        </div>

        {/* Search, Filter & CSV Export */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative min-w-[210px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, DNI o mesa..."
              className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-500 font-sans"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#070b14] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-500 cursor-pointer"
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="seated">En Servicio (Mesa)</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Anuladas</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="p-1.5 bg-[#070b14] hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-xl text-xs transition flex items-center gap-1.5 px-3"
            title="Exportar a CSV"
          >
            <Download className="w-3.5 h-3.5 text-luxury-400" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <th className="pb-3 font-semibold">Código / Horario</th>
              <th className="pb-3 font-semibold">Mesa & Sector</th>
              <th className="pb-3 font-semibold">Titular de Reserva</th>
              <th className="pb-3 font-semibold">Cubiertos</th>
              <th className="pb-3 font-semibold">Estado</th>
              <th className="pb-3 font-semibold text-right">Operaciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500 text-xs">
                  No se encontraron reservas con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              filtered.map((res) => {
                const cleanPhone = res.customer.telefono.replace(/[^\d+]/g, '');
                return (
                  <tr key={res.id} className="hover:bg-slate-800/30 transition">
                    {/* Código / Horario */}
                    <td className="py-3 pr-2">
                      <div className="font-mono font-bold text-luxury-300 text-xs">
                        {res.code}
                      </div>
                      <div className="font-bold text-white text-xs mt-0.5 font-mono">
                        {res.time} hs
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{res.date}</div>
                    </td>

                    {/* Mesa */}
                    <td className="py-3 px-2">
                      <div className="font-bold text-white text-sm">
                        Mesa #{res.tableNumber}
                      </div>
                      <div className="text-[11px] text-slate-400 capitalize">
                        {res.area === 'interior' ? 'Salón Principal' : 'Terraza Exterior'}
                      </div>
                    </td>

                    {/* Titular */}
                    <td className="py-3 px-2">
                      <div className="font-semibold text-white text-sm">
                        {res.customer.nombre} {res.customer.apellido}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                        <span>DNI:</span>
                        <strong className="text-slate-300">{res.customer.dni}</strong>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5 font-mono">
                          <Phone className="w-2.5 h-2.5 text-luxury-400" /> {res.customer.telefono}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Mail className="w-2.5 h-2.5" /> {res.customer.email}
                        </span>
                      </div>
                      {res.notes && (
                        <div className="mt-1 text-[10px] text-luxury-200 bg-luxury-950/40 px-2 py-0.5 rounded border border-luxury-900/40">
                          Nota: {res.notes}
                        </div>
                      )}
                    </td>

                    {/* Comensales */}
                    <td className="py-3 px-2">
                      <div className="font-bold text-white font-mono">
                        {res.partySize} personas
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-2">
                      {getStatusBadge(res.status)}
                    </td>

                    {/* Acciones */}
                    <td className="py-3 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'seated')}
                            className="bg-luxury-600 hover:bg-luxury-500 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow"
                            title="Sentar comensales e iniciar servicio"
                          >
                            Sentar
                          </button>
                        )}

                        {res.status === 'seated' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'completed')}
                            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow"
                            title="Liberar mesa y completar servicio"
                          >
                            Liberar
                          </button>
                        )}

                        <a
                          href={`https://wa.me/${cleanPhone}?text=Estimado%2Fa%20${encodeURIComponent(res.customer.nombre)},%20nos%20comunicamos%20desde%20Grand%20Lumi%C3%A8re%20Bistro%20en%20referencia%20a%20su%20reserva%20para%20la%20Mesa%20${res.tableNumber}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#070b14] hover:bg-slate-800 text-slate-200 border border-slate-700/80 p-1.5 rounded-lg text-[11px] transition"
                          title="Contacto directo por WhatsApp"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        </a>

                        {res.status !== 'cancelled' && res.status !== 'completed' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'cancelled')}
                            className="bg-[#070b14] hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-700/80 p-1.5 rounded-lg text-[11px] transition"
                            title="Anular reserva"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
