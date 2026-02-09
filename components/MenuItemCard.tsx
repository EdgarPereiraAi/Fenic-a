
import React, { useRef, useState } from 'react';
import { MenuItem, Language } from '../types';
import { Camera, Share2, Plus, Loader2 } from 'lucide-react';
import { upload } from '@vercel/blob/client';

interface Props {
  item: MenuItem;
  lang: Language;
  isAdmin?: boolean;
  onImageUpdate?: (id: string, url: string) => void;
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
  const [isUploading, setIsUploading] = useState(false);

  // Renderização segura de ingredientes (suporta objeto ou stringlegada)
  const currentIngredients = typeof item.ingredients === 'object' 
    ? (item.ingredients[lang] || item.ingredients['pt'] || '')
    : (item.ingredients as unknown as string);

  const handleImageClick = () => {
    if (isAdmin && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpdate) {
      try {
        setIsUploading(true);
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        onImageUpdate(item.id, newBlob.url);
      } catch (error) {
        console.error('Erro no upload:', error);
        alert('Falha ao carregar imagem no Vercel Blob.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `Pizzeria Fenicia - ${item.name}`,
      text: `Olha esta delícia: ${item.name} (${item.price}) na Pizzeria Fenicia!`,
      url: `${window.location.origin}${window.location.pathname}#${item.id}`,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.error(err); }
    } else {
      try { await navigator.clipboard.writeText(shareData.url); alert('Link copiado!'); } catch (err) { console.error(err); }
    }
  };

  return (
    <div 
      id={item.id}
      className={`flex items-start gap-4 sm:gap-8 py-6 border-b border-gray-50 last:border-none group relative transition-all ${isAdmin ? 'ring-2 ring-[#FF5733]/10 rounded-[2rem] px-4 -mx-4 my-2 bg-[#FF5733]/5' : ''}`}
    >
      <div 
        className={`flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-[1.8rem] overflow-hidden shadow-md relative cursor-pointer group/img border-4 border-white bg-gray-100 transform transition-transform duration-500 hover:rotate-2 hover:scale-105 active:scale-95 mt-1`}
        onClick={handleImageClick}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isUploading ? 'opacity-30' : 'opacity-100'}`}
        />
        {isAdmin && (
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isUploading ? 'opacity-100' : 'opacity-0 group-hover/img:opacity-100'}`}>
            {isUploading ? <Loader2 className="text-white animate-spin" size={20} /> : <Camera className="text-white" size={20} />}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-start gap-2 mb-1">
              {isAdmin ? (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white bg-[#E74C3C] px-2 py-1 rounded-lg shadow-sm italic flex items-center flex-shrink-0">
                      #<input 
                        type="text" 
                        value={item.number || ''} 
                        onChange={(e) => onNumberUpdate?.(item.id, e.target.value)}
                        className="bg-transparent border-none focus:ring-0 w-6 text-center outline-none text-white font-black p-0"
                      />
                    </span>
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => onNameUpdate?.(item.id, e.target.value)}
                      className="text-base sm:text-xl font-black text-gray-900 bg-white/50 border-b-2 border-[#E74C3C]/10 focus:border-[#E74C3C] focus:outline-none w-full px-2 rounded-t-lg transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tighter flex items-start group-hover:text-[#E74C3C] transition-colors leading-tight">
                  {item.number && <span className="text-[9px] font-black text-white bg-[#E74C3C] px-1.5 py-0.5 rounded-md mr-1.5 shadow-sm italic mt-0.5 flex-shrink-0">#{item.number}</span>}
                  <span className="break-words">{item.name}</span>
                </h3>
              )}
            </div>
            {isAdmin ? (
              <textarea 
                value={currentIngredients} 
                onChange={(e) => onIngredientsUpdate?.(e.target.value)}
                className="text-gray-800 text-xs sm:text-sm mt-2 italic font-medium leading-relaxed p-2 bg-white/50 border-2 border-transparent focus:border-[#E74C3C]/20 focus:outline-none rounded-xl w-full resize-none transition-all"
                rows={2}
                placeholder="Ingredientes..."
              />
            ) : (
              <p className="text-gray-500 text-xs sm:text-sm mt-1 italic font-medium leading-tight pr-2 break-words">
                {currentIngredients}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {isAdmin ? (
              <input 
                type="text"
                value={item.price}
                onChange={(e) => onPriceUpdate?.(item.id, e.target.value)}
                className="font-black text-sm text-[#E74C3C] w-20 bg-white border-b-2 border-[#E74C3C]/20 focus:border-[#E74C3C] focus:outline-none text-right px-1 rounded-sm"
              />
            ) : (
              <div className="bg-[#E74C3C]/5 px-2 py-0.5 rounded-lg">
                 <span className="font-black text-sm sm:text-lg text-[#E74C3C] whitespace-nowrap">{item.price}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <button onClick={handleShare} className="p-1.5 rounded-lg text-gray-300 hover:text-[#E74C3C] transition-all"><Share2 size={16} /></button>
              {!isAdmin && onAddToCart && (
                <button onClick={() => onAddToCart(item)} className="p-2 sm:p-2.5 bg-[#1D3C18] text-white rounded-xl shadow-lg hover:scale-110 active:scale-90 flex items-center gap-2">
                  <Plus size={18} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
