
import React, { useRef } from 'react';
import { MenuItem, Language } from '../types';
import { Camera, Share2 } from 'lucide-react';

interface Props {
  item: MenuItem;
  lang: Language;
  isAdmin?: boolean;
  onImageUpdate?: (id: string, base64: string) => void;
  onPriceUpdate?: (id: string, price: string) => void;
}

export const MenuItemCard: React.FC<Props> = ({ item, lang, isAdmin, onImageUpdate, onPriceUpdate }) => {
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
      title: `Pizzaria Fenícia - ${item.name}`,
      text: `Olha esta delícia: ${item.name} (${item.price}) na Pizzaria Fenícia!`,
      url: `${window.location.origin}${window.location.pathname}#${item.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Could not copy text: ', err);
      }
    }
  };

  return (
    <div 
      id={item.id}
      className={`flex items-center gap-4 sm:gap-5 py-5 border-b border-gray-100 last:border-none group relative transition-all ${isAdmin ? 'ring-2 ring-[#FF5733]/20 rounded-xl px-2 -mx-2 my-1 bg-[#FF5733]/5' : ''}`}
    >
      {/* Image Section */}
      <div 
        className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-sm relative cursor-pointer group/img border border-gray-100 bg-gray-50`}
        onClick={handleImageClick}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
        />
        
        {isAdmin && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
            <Camera className="text-white" size={20} />
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
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col min-w-0">
            <h3 className="text-base sm:text-lg font-black text-gray-900 truncate tracking-tight flex items-center">
              {item.number && <span className="text-[10px] font-black text-[#FF5733] bg-[#FF5733]/10 px-1.5 py-0.5 rounded mr-1.5">#{item.number}</span>}
              {item.name}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 italic leading-tight">
              {item.ingredients[lang]}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {isAdmin ? (
              <input 
                type="text"
                value={item.price}
                onChange={(e) => onPriceUpdate?.(item.id, e.target.value)}
                className="font-black text-sm text-[#E74C3C] w-16 bg-white border-b border-[#E74C3C]/30 focus:border-[#E74C3C] focus:outline-none text-right px-1 rounded-sm"
                placeholder="0.00€"
              />
            ) : (
              <span className="font-black text-lg text-[#E74C3C] whitespace-nowrap">{item.price}</span>
            )}
            
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-lg text-gray-300 hover:text-[#E74C3C] hover:bg-gray-50 transition-all active:scale-90"
              title="Partilhar"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="absolute -top-1.5 -right-1.5">
          <span className="bg-[#FF5733] text-white text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase shadow-sm border border-white">Edit</span>
        </div>
      )}
    </div>
  );
};
