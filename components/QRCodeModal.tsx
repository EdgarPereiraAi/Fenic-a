
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Share2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Menu Pizzaria Fenícia',
          url: currentUrl,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-gray-100 hover:bg-[#E74C3C] hover:text-white text-gray-500 transition-all active:scale-90"
        >
          <X size={24} />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          <div className="w-20 h-2 bg-[#FF5733] rounded-full mb-8 shadow-sm"></div>
          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Menu Digital</h2>
          <p className="text-gray-500 text-base font-medium mb-10">Aponte a câmara para visualizar o menu completo na sua mesa.</p>
          
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl border-4 border-gray-50 mb-10 transform hover:scale-105 transition-transform duration-500">
            <QRCodeSVG 
              value={currentUrl} 
              size={220} 
              level="H" 
              includeMargin={true}
              imageSettings={{
                src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=64&h=64&fit=crop&auto=format",
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>

          <div className="flex gap-4 w-full">
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-black uppercase text-xs tracking-widest shadow-sm active:scale-95"
            >
              <Share2 size={20} />
              Partilhar
            </button>
            <button 
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#FF5733] text-white hover:bg-[#E64A19] transition-all font-black uppercase text-xs tracking-widest shadow-xl shadow-[#FF5733]/30 active:scale-95"
            >
              <Download size={20} />
              Imprimir
            </button>
          </div>
        </div>
        
        <div className="bg-[#FAF9F6] py-6 text-center border-t border-gray-100">
          <p className="text-xs text-[#FF5733] font-black tracking-[0.5em] uppercase">Pizzaria Fenícia</p>
        </div>
      </div>
    </div>
  );
};
