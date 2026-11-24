import React, { useState } from 'react';
import { ShieldCheck, X, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, pass: string) => boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Por favor completá los datos de acceso.');
      return;
    }

    const ok = onLogin(email.trim(), password.trim());
    if (ok) {
      setError(null);
      onClose();
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@restaurante.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Ingreso para Administrador</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Acceso para dueños y empleados del restaurante
          </p>
        </div>

        {/* Demo Fast Fill */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full mb-3 py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Usar cuenta de prueba (1 clic)</span>
        </button>

        {error && (
          <div className="mb-3 p-2 bg-rose-950/70 border border-rose-500 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@restaurante.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-4 rounded-xl shadow transition"
          >
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};
