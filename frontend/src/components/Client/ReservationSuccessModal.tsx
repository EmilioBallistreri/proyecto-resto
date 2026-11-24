import React, { useEffect } from 'react';
import { Reservation } from '../../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, Share2, X } from 'lucide-react';

interface ReservationSuccessModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  }, [isOpen]);

  if (!isOpen || !reservation) return null;

  const handleShareWhatsApp = () => {
    const text = `¡Hola! Reservé la Mesa ${reservation.tableNumber} (${reservation.area === 'interior' ? 'Salón' : 'Patio'}) para hoy a las ${reservation.time} hs a nombre de ${reservation.customer.nombre} ${reservation.customer.apellido}. Código: ${reservation.code}.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-white">¡Mesa Reservada!</h2>
        <p className="text-xs text-slate-400 mt-1">
          El restaurante ya fue notificado con tus datos.
        </p>

        {/* Tarjeta de Reserva */}
        <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-left text-xs space-y-2">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-slate-400">Código de Reserva:</span>
            <span className="font-mono font-bold text-amber-400 text-sm">{reservation.code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Mesa:</span>
            <strong className="text-white">Mesa #{reservation.tableNumber} ({reservation.area === 'interior' ? 'Salón' : 'Patio'})</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Horario:</span>
            <strong className="text-emerald-400">{reservation.time} hs • {reservation.date}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Titular:</span>
            <span className="text-white font-medium">{reservation.customer.nombre} {reservation.customer.apellido}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">DNI:</span>
            <span className="text-slate-300">{reservation.customer.dni}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Personas:</span>
            <span className="text-white font-medium">{reservation.partySize} comensales</span>
          </div>
        </div>

        <button
          onClick={handleShareWhatsApp}
          className="w-full mt-4 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
        >
          <Share2 className="w-4 h-4" />
          <span>Enviar comprobante a mi WhatsApp</span>
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
        >
          Volver al Plano
        </button>
      </div>
    </div>
  );
};
