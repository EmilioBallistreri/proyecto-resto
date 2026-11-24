import React, { useState } from 'react';
import { Table, UserProfile } from '../../types';
import { Check, X, Sparkles, Users, Calendar, Clock } from 'lucide-react';

interface ReservationModalProps {
  table: Table | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  selectedDate: string;
  selectedTime: string;
  onConfirm: (data: {
    tableId: string;
    customer: UserProfile;
    date: string;
    time: string;
    partySize: number;
    notes?: string;
  }) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  table,
  isOpen,
  onClose,
  currentUser,
  selectedDate,
  selectedTime,
  onConfirm,
}) => {
  if (!isOpen || !table) return null;

  const [nombre, setNombre] = useState(currentUser?.nombre || '');
  const [apellido, setApellido] = useState(currentUser?.apellido || '');
  const [dni, setDni] = useState(currentUser?.dni || '');
  const [telefono, setTelefono] = useState(currentUser?.telefono || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [partySize, setPartySize] = useState<number>(table.capacity);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemo = () => {
    setNombre('Juan');
    setApellido('Pérez');
    setDni('38.291.844');
    setTelefono('+54 11 4455-6677');
    setEmail('juan.perez@gmail.com');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !dni.trim() || !telefono.trim() || !email.trim()) {
      setError('Por favor completá todos los campos para confirmar tu lugar.');
      return;
    }

    onConfirm({
      tableId: table.id,
      customer: {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        dni: dni.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
      },
      date: selectedDate,
      time: selectedTime,
      partySize,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-4">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold mb-2">
            Mesa {table.tableNumber} • {table.area === 'interior' ? 'Salón Interior' : 'Patio Exterior'}
          </div>
          <h2 className="text-xl font-bold text-white">
            Reservar para las {selectedTime} hs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ingresá tus datos para que el restaurante te reserve esta mesa.
          </p>
        </div>

        {/* Demo Fast Fill */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full mb-3 py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Autocompletar con datos de prueba</span>
        </button>

        {error && (
          <div className="mb-3 p-2 bg-rose-950/70 border border-rose-500 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juan"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Apellido</label>
              <input
                type="text"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej: Pérez"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">DNI</label>
              <input
                type="text"
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ej: 38.291.844"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Teléfono</label>
              <input
                type="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej: +54 11 4455-6677"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan.perez@gmail.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Cantidad de personas */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              ¿Cuántas personas van a ser? (Máximo: {table.capacity})
            </label>
            <div className="flex gap-1.5">
              {Array.from({ length: table.capacity }, (_, i) => i + 1).map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setPartySize(n)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                    partySize === n
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  {n} {n === 1 ? 'persona' : 'pers.'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
          >
            <Check className="w-5 h-5" />
            <span>Confirmar Reserva Ahora</span>
          </button>
        </form>
      </div>
    </div>
  );
};
