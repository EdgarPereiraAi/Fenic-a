
import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem('admin_password') || 'Fenicía123';
    
    if (password === currentPassword) {
      onLogin();
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-[1rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-[#E74C3C] p-10 flex flex-col items-center text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
          >
            <X size={20} />
          </button>
          <div className="w-16 h-16 border-2 border-white/50 rounded-full flex items-center justify-center mb-4">
            <Lock size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-serif uppercase tracking-widest text-center">Área de Gestão</h2>
          <p className="text-white/90 text-[10px] font-bold mt-2 uppercase tracking-widest">Apenas para pessoal autorizado</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 bg-white">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  autoFocus
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all font-bold text-center tracking-widest ${
                    error ? 'border-red-500 bg-red-50 text-red-900' : 'border-transparent focus:border-[#E74C3C]'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-[10px] font-black uppercase mt-2 animate-bounce">
                  <AlertCircle size={14} />
                  Senha incorreta
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#1D3C18] text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <ShieldCheck size={18} />
              Aceder Painel
            </button>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-50">
            <p className="text-center text-[10px] text-gray-400 font-medium italic">
              Dica: Contacte o suporte se esqueceu a senha.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
