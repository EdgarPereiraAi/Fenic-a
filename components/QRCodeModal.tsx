
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, Share2, Maximize, CreditCard, Layout } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type QRPrintSize = 'CARD' | 'TABLE' | 'POSTER';

export const QRCodeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [printSize, setPrintSize] = useState<QRPrintSize>('TABLE');
  
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

  const handlePrint = () => {
    window.print();
  };

  const getQRSize = () => {
    switch(printSize) {
      case 'CARD': return 120;
      case 'POSTER': return 400;
      default: return 220;
    }
  };

  const getLabel = () => {
    switch(printSize) {
      case 'CARD': return 'Tamanho Cartão de Visita';
      case 'POSTER': return 'Tamanho Poster / Parede';
      default: return 'Tamanho Standard para Mesa';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md print:bg-white print:p-0 overflow-hidden">
      {/* Control Panel (Hidden on Print) */}
      <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in duration-500 print:hidden">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-gray-100 hover:bg-[#E74C3C] hover:text-white text-gray-500 transition-all active:scale-90"
        >
          <X size={24} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-2 bg-[#FF5733] rounded-full mb-6 shadow-sm"></div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Imprimir QR Code</h2>
          <p className="text-gray-500 text-xs font-medium mb-8">Escolha o formato ideal para o seu estabelecimento.</p>
          
          {/* Format Selector */}
          <div className="grid grid-cols-3 gap-2 w-full mb-8">
            <button 
              onClick={() => setPrintSize('CARD')}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${printSize === 'CARD' ? 'border-[#FF5733] bg-[#FF5733]/5 text-[#FF5733]' : 'border-gray-100 text-gray-400'}`}
            >
              <CreditCard size={20} />
              <span className="text-[9px] font-black uppercase">Cartão</span>
            </button>
            <button 
              onClick={() => setPrintSize('TABLE')}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${printSize === 'TABLE' ? 'border-[#FF5733] bg-[#FF5733]/5 text-[#FF5733]' : 'border-gray-100 text-gray-400'}`}
            >
              <Layout size={20} />
              <span className="text-[9px] font-black uppercase">Mesa</span>
            </button>
            <button 
              onClick={() => setPrintSize('POSTER')}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${printSize === 'POSTER' ? 'border-[#FF5733] bg-[#FF5733]/5 text-[#FF5733]' : 'border-gray-100 text-gray-400'}`}
            >
              <Maximize size={20} />
              <span className="text-[9px] font-black uppercase">Parede</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-dashed border-gray-100 mb-8 transform hover:scale-105 transition-transform duration-500">
            <QRCodeSVG 
              value={currentUrl} 
              size={140} 
              level="H" 
              includeMargin={true}
              imageSettings={{
                src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=64&h=64&fit=crop&auto=format",
                height: 30,
                width: 30,
                excavate: true,
              }}
            />
          </div>

          <div className="flex gap-4 w-full">
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-black uppercase text-[10px] tracking-widest shadow-sm active:scale-95"
            >
              <Share2 size={16} />
              Partilhar
            </button>
            <button 
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#FF5733] text-white hover:bg-[#E64A19] transition-all font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#FF5733]/30 active:scale-95"
            >
              <Printer size={16} />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Actual Printable Element (Visible only on print) */}
      <div className="hidden print:flex flex-col items-center justify-center w-full h-screen bg-white">
        <div className="p-12 border-[3px] border-black flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif text-[#E74C3C]">Pizzeria Fenicia</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-1">Menu Digital</p>
          </div>
          
          <QRCodeSVG 
            value={currentUrl} 
            size={getQRSize()} 
            level="H" 
            includeMargin={true}
          />
          
          <div className="mt-8 text-center">
            <p className="text-lg font-bold">Leia o código para ver o menu</p>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest italic">{getLabel()}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body > *:not(.print-root) {
            display: none !important;
          }
          .print-visible {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
