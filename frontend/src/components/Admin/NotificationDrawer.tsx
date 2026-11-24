import React, { useState } from 'react';
import { AppNotification } from '../../types';
import { soundService } from '../../services/audio';
import { Bell, Volume2, VolumeX, CheckCheck, X, Clock } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(soundService.isEnabled());

  if (!isOpen) return null;

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    soundService.setEnabled(newState);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Notificaciones</h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              title={soundOn ? 'Sonido activado' : 'Silenciado'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Acciones */}
        <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{notifications.length} avisos</span>
          <button
            onClick={onMarkAllRead}
            className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 text-[11px]"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Marcar todas leídas</span>
          </button>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No hay notificaciones pendientes.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3 rounded-xl border transition cursor-pointer text-xs ${
                  notif.read
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                    : 'bg-slate-800 border-amber-500/50 text-white shadow'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                    <span>{notif.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {notif.message}
                </p>

                {notif.tableNumber && (
                  <div className="mt-1.5">
                    <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      Mesa #{notif.tableNumber}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
