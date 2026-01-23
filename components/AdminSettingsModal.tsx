
import React, { useState } from 'react';
import { X, Key, Save, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      localStorage.setItem('admin_password', newPassword);
      setStatus('success');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <Key className="text-[#FF5733]" size={24} />
            <h2 className="text-xl font-black uppercase tracking-tight">Alterar Senha</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nova Senha</label>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#FF5733] rounded-2xl outline-none font-bold transition-all"
              placeholder="Digite a nova senha"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirmar Senha</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none font-bold transition-all ${
                status === 'error' ? 'border-red-500' : 'border-transparent focus:border-[#FF5733]'
              }`}
              placeholder="Repita a nova senha"
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center justify-center gap-2 text-green-600 font-black uppercase text-xs animate-in slide-in-from-top">
              <CheckCircle2 size={16} /> Senha Alterada com Sucesso
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-[#FF5733] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#FF5733]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Guardar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};
