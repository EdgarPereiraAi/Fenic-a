import React, { useRef } from 'react';
import { MenuItem, Language } from '../types';
import { Camera, Share2, Plus } from 'lucide-react';

interface Props {
  item: MenuItem;
  lang: Language;
  isAdmin?: boolean;
  onImageUpdate?: (id: string, base64: string) => void;
  onPriceUpdate?: (id: string, price: string) => void;
  onNameUpdate?: (id: string, name: string) => void;
  onNumberUpdate?: (id: string, number: string) => void;
  onIngredientsUpdate?: (text: string) => void;
  onAddToCart?: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<Props> = ({ 
  item, 
  lang, 
  isAdmin, 
  onImageUpdate, 
  onPriceUpdate, 
  onNameUpdate, 
  onNumberUpdate,
  onIngredientsUpdate,
  onAddToCart 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isAdmin) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpdate) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpdate(item.id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `Pizzeria Fenicia Menu - ${item.name}`,
      text: `Olha esta delícia: ${item.name} (${item.price}) na Pizzeria Fenicia!`,
      url: `${window.location.origin}${window.location.pathname}#${item.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copiado!');
      } catch (err) {
        console.error('Could not copy text: ', err);
      }
    }
  };

  return (
    <div 
      id={item.id}
      className={`flex items-center gap-4 sm:gap-8 py-8 border-b border-gray-50 last:border-none group relative transition-all ${isAdmin ? 'ring-4 ring-[#FF5733]/10 rounded-[2rem] px-4 -mx-4 my-2 bg-[#FF5733]/5' : ''}`}
    >
      {/* Image Section with Enhanced Zoom */}
      <div 
        className={`flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden shadow-xl relative cursor-pointer group/img border-4 border-white bg-gray-100 transform transition-transform duration-500 hover:rotate-2 hover:scale-110 active:scale-95`}
        onClick={handleImageClick}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-125"
        />
        
        {isAdmin && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
            <Camera className="text-white" size={24} />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col justify-center min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col min-w-0 w-full">
            <div className="flex items-center gap-2 mb-1">
              {isAdmin ? (
                <div className="flex items-center gap-2 w-full">
                  <span className="text-[10px] font-black text-white bg-[#E74C3C] px-1 py-1 rounded-lg shadow-sm italic flex items-center">
                    #<input 
                      type="text" 
                      value={item.number || ''} 
                      onChange={(e) => onNumberUpdate?.(item.id, e.target.value)}
                      className="bg-transparent border-none focus:ring-0 w-6 text-center outline-none text-white font-black"
                      placeholder="?"
                    />
                  </span>
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => onNameUpdate?.(item.id, e.target.value)}
                    className="text-base sm:text-2xl font-black text-gray-900 bg-white/50 border-b-2 border-[#E74C3C]/10 focus:border-[#E74C3C] focus:outline-none w-full px-2 rounded-t-lg transition-colors"
                  />
                </div>
              ) : (
                <h3 className="text-base sm:text-2xl font-black text-gray-900 truncate tracking-tighter flex items-center group-hover:text-[#E74C3C] transition-colors">
                  {item.number && <span className="text-[10px] font-black text-white bg-[#E74C3C] px-2 py-1 rounded-lg mr-2 shadow-sm italic">#{item.number}</span>}
                  {item.name}
                </h3>
              )}
            </div>
            
            {isAdmin ? (
              <textarea 
                value={item.ingredients[lang]} 
                onChange={(e) => onIngredientsUpdate?.(e.target.value)}
                className="text-gray-600 text-xs sm:text-sm mt-2 italic font-medium leading-relaxed p-2 bg-white/50 border-2 border-transparent focus:border-[#E74C3C]/20 focus:outline-none rounded-xl w-full resize-none transition-all"
                rows={2}
                placeholder="Descreva os ingredientes..."
              />
            ) : (
              <p className="text-gray-400 text-xs sm:text-sm mt-2 italic font-medium leading-relaxed pr-4">
                {item.ingredients[lang]}
              </p>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            {isAdmin ? (
              <input 
                type="text"
                value={item.price}
                onChange={(e) => onPriceUpdate?.(item.id, e.target.value)}
                className="font-black text-lg text-[#E74C3C] w-20 bg-white border-b-2 border-[#E74C3C]/20 focus:border-[#E74C3C] focus:outline-none text-right px-1 rounded-sm"
                placeholder="0.00€"
              />
            ) : (
              <div className="bg-[#E74C3C]/5 px-3 py-1 rounded-xl">
                 <span className="font-black text-base sm:text-2xl text-[#E74C3C] whitespace-nowrap">{item.price}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleShare}
                className="p-2 rounded-xl text-gray-200 hover:text-[#E74C3C] hover:bg-[#E74C3C]/5 transition-all"
                title="Partilhar"
              >
                <Share2 size={18} />
              </button>
              
              {!isAdmin && onAddToCart && (
                <button 
                  onClick={() => onAddToCart(item)}
                  className="p-2 sm:p-3 bg-[#1D3C18] text-white rounded-2xl shadow-lg shadow-[#1D3C18]/20 hover:bg-black hover:scale-110 transition-all active:scale-90 flex items-center gap-2"
                >
                  <Plus size={20} strokeWidth={3} />
                  <span className="hidden sm:inline text-[11px] font-black uppercase tracking-widest">Adicionar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute top-2 right-2">
          <span className="bg-[#FF5733] text-white text-[8px] px-3 py-1 rounded-full font-black uppercase shadow-lg border-2 border-white">Editável</span>
        </div>
      )}
    </div>
  );
};