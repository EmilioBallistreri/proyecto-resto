import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { User, ShieldCheck, Sparkles, Check, ArrowRight, Utensils } from 'lucide-react';

interface AppEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: 'client' | 'admin', user?: UserProfile) => void;
  currentUser: UserProfile | null;
  currentRole: 'client' | 'admin' | null;
}

export const AppEntryModal: React.FC<AppEntryModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  currentUser,
  currentRole,
}) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>(currentRole === 'admin' ? 'admin' : 'client');

  // Client form fields
  const [nombre, setNombre] = useState(currentUser?.nombre || '');
  const [apellido, setApellido] = useState(currentUser?.apellido || '');
  const [dni, setDni] = useState(currentUser?.dni || '');
  const [telefono, setTelefono] = useState(currentUser?.telefono || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  // Admin form fields
  const [adminEmail, setAdminEmail] = useState('admin@restaurante.com');
  const [adminPass, setAdminPass] = useState('admin123');

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !dni.trim() || !telefono.trim() || !email.trim()) {
      setError('Por favor completá todos los campos para registrarte.');
      return;
    }

    const profile: UserProfile = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim(),
      email: email.trim(),
    };

    onSelectRole('client', profile);
    onClose();
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPass.trim()) {
      setError('Completá las credenciales de administrador.');
      return;
    }

    const adminProfile: UserProfile = {
      nombre: 'Administrador',
      apellido: 'Restaurante',
      dni: '00.000.000',
      telefono: '+54 11 0000-0000',
      email: adminEmail.trim(),
    };

    onSelectRole('admin', adminProfile);
    onClose();
  };

  const handleFillDemoClient = () => {
    setNombre('Juan');
    setApellido('Pérez');
    setDni('38.291.844');
    setTelefono('+54 11 4455-6677');
    setEmail('juan.perez@gmail.com');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
        {/* Logo superior */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg mb-2">
            <Utensils className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">Bienvenido a Restaurante Plano</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingresá como cliente para reservar o como dueño para gestionar
          </p>
        </div>

        {/* Selector de Perfil / Rol */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab('client');
              setError(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'client'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Soy Cliente</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setError(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Soy Dueño / Admin</span>
          </button>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-rose-950/70 border border-rose-500 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Tab 1: Registro como Cliente */}
        {activeTab === 'client' && (
          <div>
            <button
              type="button"
              onClick={handleFillDemoClient}
              className="w-full mb-3 py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Autocompletar datos de prueba (Demo)</span>
            </button>

            <form onSubmit={handleClientSubmit} className="space-y-2.5">
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
                    placeholder="38.291.844"
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
                    placeholder="+54 11 4455-6677"
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

              <button
                type="submit"
                className="w-full mt-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>Entrar a Elegir Mesa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Acceso como Administrador */}
        {activeTab === 'admin' && (
          <div>
            <div className="mb-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-semibold">Credenciales del Dueño:</span>
              <div className="text-slate-300 font-mono text-[11px]">
                Email: <strong className="text-white">admin@restaurante.com</strong>
              </div>
              <div className="text-slate-300 font-mono text-[11px]">
                Clave: <strong className="text-white">admin123</strong>
              </div>
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Entrar al Panel de Control</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

