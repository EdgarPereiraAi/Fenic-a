
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ClipboardList, Phone } from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  lang: Language;
  phoneNumber: string;
}

export const OrderNotepad: React.FC<Props> = ({ 
  isOpen, onClose, items, onUpdateQuantity, onRemove, onClear, lang, phoneNumber 
}) => {
  const t = translations[lang];
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return sum + (priceNum * item.quantity);
  }, 0);

  const telLink = phoneNumber.startsWith('+') ? phoneNumber : `+351${phoneNumber}`;

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-end sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-[#FFFDF0] w-full sm:w-[420px] max-h-[95vh] sm:max-h-[85vh] flex flex-col rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden border-t-8 border-[#1D3C18] animate-in slide-in-from-bottom duration-500"
      >
        <div className="p-4 bg-[#1D3C18] text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <ClipboardList className="text-[#D4AF37]" size={20} />
            <div>
              <h2 className="text-lg font-serif font-bold italic">{t.myOrder}</h2>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60">{t.orderSummary}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div 
          className="flex-1 overflow-y-auto relative"
          style={{ 
            backgroundImage: 'repeating-linear-gradient(#FFFDF0, #FFFDF0 31px, #E5E7EB 31px, #E5E7EB 32px)',
            backgroundAttachment: 'local',
            lineHeight: '32px'
          }}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center opacity-30">
              <ShoppingBag size={40} className="mb-2" strokeWidth={1} />
              <p className="font-serif italic text-lg text-gray-600">{t.emptyCart}</p>
            </div>
          ) : (
            <div className="px-6 py-2">
              {items.map((item) => (
                <div key={item.id} className="min-h-[64px] flex items-center gap-3 border-b border-transparent">
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-black text-gray-900 text-xs sm:text-sm truncate uppercase tracking-tight">
                        {item.quantity}x {item.name}
                      </h4>
                      <span className="font-bold text-[11px] text-[#E74C3C] tabular-nums ml-2">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 h-full">
                    <div className="flex items-center bg-white/80 rounded-full border border-gray-200 shadow-sm px-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-[#E74C3C] transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center font-black text-[11px] text-gray-900 leading-none">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-[#27AE60] transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-1.5 text-gray-300 hover:text-red-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={onClear}
                className="mt-6 w-full py-2 text-[9px] font-black uppercase text-gray-400 hover:text-red-500 transition-all flex items-center justify-center gap-1"
              >
                {t.clearAll}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border-t border-gray-100 p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-5">
            <span className="font-serif italic text-xl text-gray-900">{t.total}</span>
            <span className="font-black text-2xl text-[#E74C3C]">{total.toFixed(2)}€</span>
          </div>
          
          <div className="space-y-3">
            <a
              href={`tel:${telLink}`}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95 bg-[#E74C3C] text-white hover:bg-[#C0392B] shadow-[#E74C3C]/30"
            >
              <Phone size={20} />
              {t.callToOrder}
            </a>
          </div>
          
          <p className="text-center text-[8px] text-gray-400 mt-4 uppercase font-bold tracking-tight">
            {t.orderNote}
          </p>
        </div>
      </div>
    </div>
  );
};
