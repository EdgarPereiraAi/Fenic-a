
import React, { useState } from 'react';
import { X, Printer, Layout, Columns as ColumnsIcon, Maximize, FileText, Image as ImageIcon, Droplets, ZoomIn } from 'lucide-react';
import { Category, Language } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuData: Category[];
  lang: Language;
}

type PaperSize = 'A4' | 'A3' | 'A2' | 'TENT';
type ImageScale = 'sm' | 'md' | 'lg';

export const PrintMenuModal: React.FC<Props> = ({ isOpen, onClose, menuData, lang }) => {
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const [showImages, setShowImages] = useState(true);
  const [grayscale, setGrayscale] = useState(false);
  const [imageScale, setImageScale] = useState<ImageScale>('md');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getColumns = () => {
    if (paperSize === 'A4') return 1;
    if (paperSize === 'A3') return 2;
    if (paperSize === 'A2') return 3;
    return 1;
  };

  const getPageDimensions = () => {
    switch (paperSize) {
      case 'A3': return { w: '297mm', h: '420mm' };
      case 'A2': return { w: '420mm', h: '594mm' };
      case 'TENT': return { w: '100mm', h: '210mm' };
      default: return { w: '210mm', h: '297mm' };
    }
  };

  const getImageSizeClass = () => {
    switch (imageScale) {
      case 'sm': return 'w-10 h-10';
      case 'lg': return 'w-20 h-20';
      default: return 'w-14 h-14';
    }
  };

  const dims = getPageDimensions();
  const cols = getColumns();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl print:p-0 print:bg-white overflow-hidden">
      {/* Sidebar Controls */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 print:hidden w-72 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-2xl space-y-6">
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2 opacity-60">
              <Maximize size={14} /> Formato do Papel
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(['A4', 'A3', 'A2', 'TENT'] as PaperSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setPaperSize(size)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl font-black transition-all border-2 ${
                    paperSize === size 
                      ? 'bg-white text-black border-white shadow-lg' 
                      : 'text-white border-white/10 hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs">{size === 'TENT' ? 'Mesa' : size}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2 opacity-60">
              <Layout size={14} /> Opções de Estilo
            </h3>
            
            <button 
              onClick={() => setShowImages(!showImages)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-xs transition-all border-2 ${
                showImages ? 'bg-[#27AE60] text-white border-[#27AE60]' : 'bg-white/5 text-white border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={16} /> Incluir Fotos
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-all ${showImages ? 'bg-white' : 'bg-white/20'}`}>
                <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${showImages ? 'right-1 bg-[#27AE60]' : 'left-1 bg-white'}`}></div>
              </div>
            </button>

            {showImages && (
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <h4 className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                  <ZoomIn size={12} /> Tamanho das Imagens
                </h4>
                <div className="flex gap-1">
                  {(['sm', 'md', 'lg'] as ImageScale[]).map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setImageScale(scale)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                        imageScale === scale ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5'
                      }`}
                    >
                      {scale === 'sm' ? 'Pequeno' : scale === 'md' ? 'Médio' : 'Grande'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => setGrayscale(!grayscale)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-xs transition-all border-2 ${
                grayscale ? 'bg-gray-600 text-white border-gray-600' : 'bg-white/5 text-white border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <Droplets size={16} /> Modo Económico
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-all ${grayscale ? 'bg-white' : 'bg-white/20'}`}>
                <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${grayscale ? 'right-1 bg-gray-600' : 'left-1 bg-white'}`}></div>
              </div>
            </button>
          </div>
          
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#E74C3C] text-white font-black uppercase tracking-widest hover:bg-[#C0392B] transition-all shadow-xl shadow-[#E74C3C]/30 active:scale-95"
            >
              <Printer size={18} />
              Imprimir Menu
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 rounded-xl bg-white/5 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all text-[10px]"
            >
              Fechar Pré-visualização
            </button>
          </div>
        </div>
      </div>

      {/* Print Preview Area */}
      <div className="w-full h-full overflow-auto flex justify-center py-12 pl-80 pr-12 print:p-0 print:overflow-visible scrollbar-hide">
        <div 
          id="printable-menu"
          className={`bg-white shadow-2xl print:shadow-none transition-all duration-500 relative print:m-0 ${grayscale ? 'grayscale contrast-125' : ''}`}
          style={{
            width: dims.w,
            minHeight: dims.h,
            padding: paperSize === 'TENT' ? '8mm' : '12mm',
          }}
        >
          <div className={`flex flex-col border-[6px] border-[#1D3C18] p-1 h-full relative`}>
             <div className="border-[1px] border-[#1D3C18] p-8 flex flex-col h-full bg-white">
                
                {/* Header Section */}
                <div className="text-center mb-10 w-full relative">
                  <div className="absolute top-0 right-0 opacity-20">
                     <img 
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" 
                        className="w-24 h-24 object-contain grayscale"
                        alt=""
                     />
                  </div>
                  <p className="text-[#D4AF37] font-serif text-lg tracking-[0.2em] mb-1">Desde 1998</p>
                  <h1 className="text-6xl text-[#E74C3C] font-serif leading-none">Pizzeria</h1>
                  <h1 className="text-7xl text-[#27AE60] font-serif leading-none -mt-4">Fenicia</h1>
                  <div className="flex items-center justify-center gap-4 my-4">
                    <div className="h-[1px] w-12 bg-gray-200"></div>
                    <p className="uppercase tracking-[0.5em] text-[9px] font-black text-gray-400">Tavira • Algarve • Portugal</p>
                    <div className="h-[1px] w-12 bg-gray-200"></div>
                  </div>
                </div>

                {/* Categories Grid */}
                <div 
                  className="w-full gap-x-10 gap-y-10"
                  style={{ 
                    display: 'block',
                    columnCount: cols,
                    columnGap: '12mm',
                    columnRule: '1px solid #f3f4f6'
                  }}
                >
                  {menuData.map((category) => (
                    <div key={category.id} className="break-inside-avoid mb-10">
                      <div className="flex items-center gap-3 mb-5 pb-1 border-b-2 border-[#E74C3C]/10">
                        <div className="w-1.5 h-6 bg-[#27AE60]"></div>
                        <h2 className="text-xl font-serif text-[#1D3C18] uppercase tracking-widest italic font-bold">
                          {category.title}
                        </h2>
                      </div>
                      <div className="space-y-5">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex gap-3 border-b border-gray-50 pb-3 last:border-none last:pb-0 break-inside-avoid group">
                            {showImages && (
                              <div className={`${getImageSizeClass()} flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mt-1 shadow-sm`}>
                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex justify-between items-baseline gap-2">
                                <span className="font-black text-gray-900 text-[13px] flex-1 leading-tight">
                                  {item.number && <span className="text-[8px] text-[#E74C3C] mr-1.5 font-mono bg-[#E74C3C]/5 px-1 rounded">#{item.number}</span>}
                                  {item.name}
                                </span>
                                <span className="font-black text-sm text-[#E74C3C] tabular-nums">{item.price}</span>
                              </div>
                              <p className="text-[9px] text-gray-400 italic font-medium leading-[1.3] pr-2 mt-0.5">
                                {item.ingredients[lang]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-10 border-t-2 border-dashed border-gray-100 flex flex-col items-center w-full">
                  <div className="flex items-center justify-between w-full max-w-2xl gap-8 px-4">
                    <div className="hidden sm:flex flex-col text-left opacity-30">
                      <p className="text-[7px] font-black uppercase tracking-widest text-[#1D3C18]">Pizzeria Fenicia</p>
                      <p className="text-[7px] font-medium text-gray-600">Largo da Caracolinha, n.8</p>
                      <p className="text-[7px] font-medium text-gray-600">8800-310 Tavira</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm mb-3">
                        <QRCodeSVG value={window.location.origin} size={paperSize === 'A2' ? 100 : 70} level="M" />
                      </div>
                      <p className="text-[9px] font-black text-gray-900 uppercase tracking-[0.4em]">Menu Digital</p>
                      <p className="text-[7px] text-gray-400 mt-0.5 uppercase font-bold">Aponte para o catálogo completo</p>
                    </div>

                    <div className="hidden sm:flex flex-col text-right opacity-30">
                      <p className="text-[7px] font-black uppercase tracking-widest text-[#1D3C18]">Informações</p>
                      <p className="text-[7px] font-medium text-gray-600">+351 123 456 789</p>
                      <p className="text-[7px] font-medium text-gray-600">IVA incluído</p>
                    </div>
                  </div>
                  <p className="mt-8 text-[8px] text-gray-300 font-black uppercase tracking-[0.5em]">Obrigado pela sua visita</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
            margin: 0;
            padding: 0;
          }
          #printable-menu, #printable-menu * {
            visibility: visible;
          }
          #printable-menu {
            position: fixed;
            left: 0;
            top: 0;
            width: ${dims.w} !important;
            height: ${dims.h} !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          @page {
            size: ${paperSize === 'TENT' ? '100mm 210mm' : paperSize.toLowerCase()};
            margin: 0;
          }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
