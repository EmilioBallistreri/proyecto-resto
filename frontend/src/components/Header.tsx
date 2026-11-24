import React from 'react';
import { UserProfile } from '../types';
import { soundService } from '../services/audio';
import {
  Utensils,
  User,
  ShieldCheck,
  Bell,
  Volume2,
  VolumeX,
  RefreshCw,
  UserCheck,
} from 'lucide-react';

interface HeaderProps {
  userRole: 'client' | 'admin' | null;
  currentUser: UserProfile | null;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenAppEntry: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userRole,
  currentUser,
  unreadCount,
  onOpenNotifications,
  onOpenAppEntry,
  onResetDemo,
}) => {
  const [soundEnabled, setSoundEnabled] = React.useState(soundService.isEnabled());

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundService.setEnabled(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-3 sm:px-4 py-2.5 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* Logo del Restaurante */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm sm:text-base leading-tight">
              Restaurante Plano
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400">
              {userRole === 'admin' ? 'Panel de Control del Dueño' : 'Reservá tu mesa en tiempo real'}
            </p>
          </div>
        </div>

        {/* Perfil Actual y Controles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Botón de Perfil / Rol Actual */}
          <button
            onClick={onOpenAppEntry}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              userRole === 'admin'
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-300 hover:bg-rose-900/50'
                : 'bg-amber-950/60 border-amber-500/50 text-amber-300 hover:bg-amber-900/50'
            }`}
            title="Tocar para cambiar de usuario o rol"
          >
            {userRole === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Rol: Dueño / Admin</span>
                <span className="text-[10px] text-slate-400 underline ml-0.5 sm:ml-1">Cambiar</span>
              </>
            ) : currentUser ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="max-w-[100px] truncate">{currentUser.nombre}</span>
                <span className="text-[10px] text-slate-400 underline ml-0.5">Cambiar</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Registrarse</span>
              </>
            )}
          </button>

          {/* Notificaciones */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition"
            title="Ver notificaciones en vivo"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Sonido */}
          <button
            onClick={handleToggleSound}
            className="p-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition hidden xs:flex"
            title={soundEnabled ? 'Sonido activado' : 'Silenciado'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reiniciar Demo */}
          <button
            onClick={() => {
              if (window.confirm('¿Reiniciar mesas y reservas a su estado inicial?')) {
                onResetDemo();
              }
            }}
            className="p-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition"
            title="Reiniciar datos de prueba"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
