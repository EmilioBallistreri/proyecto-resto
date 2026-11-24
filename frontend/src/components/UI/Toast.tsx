import React, { useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { AppNotification } from '../../types';

interface ToastProps {
  notification: AppNotification | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5500);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 border-2 border-amber-500 rounded-xl p-3.5 shadow-2xl backdrop-blur-md animate-fade-in flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <Bell className="w-4 h-4 animate-pulse" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-white text-xs">{notification.title}</h4>
          <span className="text-[10px] text-slate-400 font-mono">{notification.time}</span>
        </div>
        <p className="text-xs text-slate-300 mt-1 leading-snug">
          {notification.message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
