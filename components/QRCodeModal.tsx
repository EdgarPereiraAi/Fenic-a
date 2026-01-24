
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Share2, Copy, Check, Printer } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  
  if (!isOpen) return null;

  const currentUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 print:bg-white print:static print:p-0">
      {/* Interface do Modal (Escondida na Impressão) */}
      <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in duration-500 print:hidden">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-black text-gray-900">QR Code</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Partilhe ou imprima o seu menu</p>
          </div>

          <div className="p-6 bg-white border-2 border-gray-50 rounded-[2.5rem] shadow-sm mb-8">
            <QRCodeSVG 
              value={currentUrl} 
              size={180} 
              level="H" 
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="flex gap-3">
              <button 
                onClick={handleCopy}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                  copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              
              <button 
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gray-900 text-white font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all"
              >
                <Printer size={14} />
                Imprimir
              </button>
            </div>
            
            {navigator.share && (
              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#E74C3C] text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#C0392B] transition-all"
              >
                <Share2 size={16} />
                Enviar Menu
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ÁREA DE IMPRESSÃO (Visível apenas no preview/folha) */}
      <div id="qr-printable" className="hidden print:flex flex-col items-center justify-center w-full min-h-screen bg-white text-black p-0 m-0">
        <div className="w-[85%] border-[1px] border-gray-100 p-16 rounded-[4rem] flex flex-col items-center text-center bg-white shadow-sm">
          <div className="mb-12">
            <p className="text-[#D4AF37] font-serif text-2xl tracking-[0.4em] mb-4 uppercase">Cucina Italiana</p>
            <h1 className="text-7xl font-serif text-[#E74C3C] mb-1 leading-none">Pizzeria</h1>
            <h1 className="text-8xl font-serif text-[#27AE60] mb-6 leading-none">Fenicia</h1>
            <div className="h-1.5 w-32 bg-[#E74C3C] mx-auto rounded-full opacity-30 mb-8"></div>
            <p className="text-[18px] font-black uppercase tracking-[1em] text-gray-400">Menu Digital</p>
          </div>
          
          <div className="p-4 border-[10px] border-[#3498DB] bg-white mb-12 shadow-sm">
            <QRCodeSVG 
              value={currentUrl} 
              size={400} 
              level="H" 
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
          
          <div className="space-y-6">
            <p className="text-4xl font-serif italic text-gray-800">Aponte a câmara para ver o nosso menu</p>
          </div>

          <div className="mt-20 pt-8 border-t border-gray-100 w-full flex justify-between items-center opacity-30 px-6">
             <span className="text-[12px] font-black uppercase tracking-[0.2em]">Tavira • Algarve • Portugal</span>
             <span className="text-[12px] font-black uppercase tracking-[0.2em]">Buon Appetito</span>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body > *:not(.fixed.z-\\[200\\]) {
            display: none !important;
          }
          
          .fixed.z-\\[200\\] {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            background: white !important;
            backdrop-filter: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          #qr-printable {
            display: flex !important;
            visibility: visible !important;
          }

          @page {
            size: auto;
            margin: 0mm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};
