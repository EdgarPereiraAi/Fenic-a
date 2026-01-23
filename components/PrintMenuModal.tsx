
import React, { useState } from 'react';
import { X, Printer, Layout, Columns as ColumnsIcon, Maximize, FileText, Image as ImageIcon, Droplets, ZoomIn, Type, ArrowLeftRight, Check } from 'lucide-react';
import { Category, Language } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuData: Category[];
  lang: Language;
}

type PaperSize = 'A5' | 'A4' | 'A3' | 'A2' | 'A1' | 'TENT';
type ImageScale = 'sm' | 'md' | 'lg';
type FontSize = 'xs' | 'sm' | 'base' | 'lg';
type Orientation = 'portrait' | 'landscape';

export const PrintMenuModal: React.FC<Props> = ({ isOpen, onClose, menuData, lang }) => {
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [showImages, setShowImages] = useState(true);
  const [grayscale, setGrayscale] = useState(false);
  const [imageScale, setImageScale] = useState<ImageScale>('md');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [customCols, setCustomCols] = useState<number | 'auto'>('auto');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getColumns = () => {
    if (customCols !== 'auto') return customCols;
    if (orientation === 'landscape') {
        if (paperSize === 'A5') return 1;
        if (paperSize === 'A4') return 2;
        if (paperSize === 'A3') return 3;
        return 4;
    }
    if (paperSize === 'A4') return 1;
    if (paperSize === 'A3') return 2;
    if (paperSize === 'A2') return 3;
    if (paperSize === 'A1') return 4;
    return 1;
  };

  const getPageDimensions = () => {
    const isPortrait = orientation === 'portrait';
    switch (paperSize) {
      case 'A5': return isPortrait ? { w: '148mm', h: '210mm' } : { w: '210mm', h: '148mm' };
      case 'A3': return isPortrait ? { w: '297mm', h: '420mm' } : { w: '420mm', h: '297mm' };
      case 'A2': return isPortrait ? { w: '420mm', h: '594mm' } : { w: '594mm', h: '420mm' };
      case 'A1': return isPortrait ? { w: '594mm', h: '841mm' } : { w: '841mm', h: '594mm' };
      case 'TENT': return { w: '100mm', h: '210mm' };
      default: return isPortrait ? { w: '210mm', h: '297mm' } : { w: '297mm', h: '210mm' };
    }
  };

  const getImageSizeClass = () => {
    switch (imageScale) {
      case 'sm': return 'w-8 h-8 sm:w-10 sm:h-10';
      case 'lg': return 'w-16 h-16 sm:w-20 sm:h-20';
      default: return 'w-12 h-12 sm:w-14 sm:h-14';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'xs': return 'text-[8px]';
      case 'sm': return 'text-[10px]';
      case 'lg': return 'text-[14px]';
      default: return 'text-[12px]';
    }
  };

  const dims = getPageDimensions();
  const cols = getColumns();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg print:p-0 print:bg-white overflow-hidden">
      {/* Sidebar Controls - Now with high contrast */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 print:hidden w-80 max-h-[90vh] overflow-y-auto scrollbar-hide py-10">
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.3)] space-y-8 animate-in slide-in-from-left duration-500">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-gray-900 font-black uppercase tracking-tighter text-xl">Configurar Menu</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[9px] mb-3 flex items-center gap-2">
                <Maximize size={12} /> Formato do Papel
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(['A5', 'A4', 'A3', 'A2', 'A1'] as PaperSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setPaperSize(size)}
                    className={`py-3 rounded-xl font-black transition-all border-2 text-[11px] ${
                      paperSize === size 
                        ? 'bg-[#E74C3C] text-white border-[#E74C3C] shadow-lg shadow-[#E74C3C]/20' 
                        : 'bg-gray-50 text-gray-500 border-transparent hover:border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[9px] mb-3 flex items-center gap-2">
                <Layout size={12} /> Orientação
              </h3>
              <div className="flex gap-2">
                  <button 
                      onClick={() => setOrientation('portrait')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-black text-[11px] ${orientation === 'portrait' ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-gray-50 text-gray-500 border-transparent'}`}
                  >
                      <Layout size={14} className="rotate-90" /> Retrato
                  </button>
                  <button 
                      onClick={() => setOrientation('landscape')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-black text-[11px] ${orientation === 'landscape' ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-gray-50 text-gray-500 border-transparent'}`}
                  >
                      <Layout size={14} /> Paisagem
                  </button>
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[9px] mb-3 flex items-center gap-2">
                <Type size={12} /> Tamanho da Fonte
              </h3>
              <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl">
                  {(['xs', 'sm', 'base', 'lg'] as FontSize[]).map((f) => (
                      <button 
                        key={f} 
                        onClick={() => setFontSize(f)} 
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${fontSize === f ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {f === 'base' ? 'NOR' : f}
                      </button>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[9px] mb-3 flex items-center gap-2">
                <ColumnsIcon size={12} /> Colunas
              </h3>
              <div className="flex gap-1.5 p-1 bg-gray-50 rounded-xl">
                  {['auto', 1, 2, 3].map((c) => (
                      <button 
                        key={c} 
                        onClick={() => setCustomCols(c as any)} 
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${customCols === c ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {c}
                      </button>
                  ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={() => setShowImages(!showImages)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-xs transition-all border-2 ${
                  showImages ? 'bg-[#27AE60]/10 text-[#27AE60] border-[#27AE60]/30' : 'bg-gray-50 text-gray-400 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${showImages ? 'bg-[#27AE60] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <ImageIcon size={14} />
                  </div>
                  Incluir Fotos
                </div>
                {showImages && <Check size={16} />}
              </button>

              <button 
                onClick={() => setGrayscale(!grayscale)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-xs transition-all border-2 ${
                  grayscale ? 'bg-gray-900/10 text-gray-900 border-gray-900/30' : 'bg-gray-50 text-gray-400 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${grayscale ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <Droplets size={14} />
                  </div>
                  Modo Económico
                </div>
                {grayscale && <Check size={16} />}
              </button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100">
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#E74C3C] text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#C0392B] transition-all shadow-xl shadow-[#E74C3C]/30 active:scale-95 mb-4"
            >
              <Printer size={18} />
              Imprimir Menu
            </button>
            <p className="text-center text-[10px] text-gray-400 font-medium">Lembre-se de configurar as margens como "Nenhuma" no navegador para melhor resultado.</p>
          </div>
        </div>
      </div>

      {/* Print Preview Area - Visible with better framing */}
      <div className="w-full h-full overflow-auto flex justify-center py-20 pl-[400px] pr-20 print:p-0 print:overflow-visible scrollbar-hide">
        <div 
          id="printable-menu"
          className={`bg-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] print:shadow-none transition-all duration-500 relative print:m-0 border-8 border-white ${grayscale ? 'grayscale contrast-125' : ''}`}
          style={{
            width: dims.w,
            minHeight: dims.h,
            padding: paperSize === 'TENT' ? '8mm' : '15mm',
          }}
        >
          <div className={`flex flex-col border-[8px] border-[#1D3C18] p-1 h-full relative`}>
             <div className="border-[1px] border-[#1D3C18] p-6 sm:p-10 flex flex-col h-full bg-white">
                
                {/* Header Section */}
                <div className="text-center mb-10 w-full relative">
                  <div className="absolute top-0 right-0 opacity-10">
                     <img 
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" 
                        className="w-24 h-24 sm:w-32 sm:h-32 object-contain grayscale"
                        alt=""
                     />
                  </div>
                  <p className="text-[#D4AF37] font-serif text-lg sm:text-2xl tracking-[0.2em] mb-1">Cucina Italiana</p>
                  <h1 className="text-7xl sm:text-9xl text-[#E74C3C] font-serif leading-none">Pizzeria</h1>
                  <h1 className="text-8xl sm:text-[10rem] text-[#27AE60] font-serif leading-none -mt-6 sm:-mt-10">Fenicia</h1>
                  <div className="flex items-center justify-center gap-4 my-6">
                    <div className="h-[1px] w-20 bg-gray-200"></div>
                    <p className="uppercase tracking-[0.6em] text-[10px] font-black text-gray-400">Tavira • Algarve</p>
                    <div className="h-[1px] w-20 bg-gray-200"></div>
                  </div>
                </div>

                {/* Categories Grid */}
                <div 
                  className="w-full gap-x-12 gap-y-12"
                  style={{ 
                    display: 'block',
                    columnCount: cols,
                    columnGap: '15mm',
                    columnRule: '1px dashed #e5e7eb'
                  }}
                >
                  {menuData.map((category) => (
                    <div key={category.id} className="break-inside-avoid mb-12">
                      <div className="flex items-center gap-4 mb-6 pb-2 border-b-2 border-[#E74C3C]/10">
                        <div className="w-2 h-8 bg-[#27AE60]"></div>
                        <h2 className="text-2xl sm:text-3xl font-serif text-[#1D3C18] uppercase tracking-wider italic font-black">
                          {category.title}
                        </h2>
                      </div>
                      <div className="space-y-6">
                        {category.items.map((item) => (
                          <div key={item.id} className={`flex gap-4 border-b border-gray-50 pb-4 last:border-none last:pb-0 break-inside-avoid group ${getFontSizeClass()}`}>
                            {showImages && (
                              <div className={`${getImageSizeClass()} flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 mt-1 shadow-sm`}>
                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex justify-between items-baseline gap-2">
                                <span className="font-black text-gray-900 flex-1 leading-tight uppercase tracking-tight">
                                  {item.number && <span className="text-[0.7em] text-[#E74C3C] mr-2 font-mono bg-[#E74C3C]/5 px-1.5 rounded-md border border-[#E74C3C]/10 italic">#{item.number}</span>}
                                  {item.name}
                                </span>
                                <span className="font-black text-[1.1em] text-[#E74C3C] tabular-nums whitespace-nowrap">{item.price}</span>
                              </div>
                              <p className="text-[0.8em] text-gray-400 italic font-medium leading-[1.4] pr-4 mt-1">
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
                <div className="mt-auto pt-16 border-t-2 border-dashed border-gray-100 flex flex-col items-center w-full">
                  <div className="flex items-center justify-between w-full max-w-4xl gap-12 px-6">
                    <div className="hidden md:flex flex-col text-left opacity-40">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#1D3C18] mb-1">Localização</p>
                      <p className="text-[8px] font-bold text-gray-700">Largo da Caracolinha, n.8</p>
                      <p className="text-[8px] font-bold text-gray-700">8800-310 Tavira, Portugal</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 bg-white border-2 border-[#1D3C18]/5 rounded-[2rem] shadow-xl mb-4 transform -rotate-1">
                        <QRCodeSVG value={window.location.origin} size={paperSize === 'A2' || paperSize === 'A1' ? 120 : 90} level="H" />
                      </div>
                      <p className="text-[11px] font-black text-gray-900 uppercase tracking-[0.5em]">Menu Digital</p>
                      <p className="text-[8px] text-gray-400 mt-1 uppercase font-black italic tracking-widest">Digitalize para encomendar online</p>
                    </div>

                    <div className="hidden md:flex flex-col text-right opacity-40">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#1D3C18] mb-1">Contactos</p>
                      <p className="text-[8px] font-black text-[#E74C3C]">T: 281 325 175</p>
                      <p className="text-[8px] font-bold text-gray-700">IVA incluído à taxa em vigor</p>
                    </div>
                  </div>
                  <div className="mt-12 flex flex-col items-center">
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.8em] italic">Buon Appetito</p>
                    <div className="w-12 h-1 bg-gray-100 rounded-full mt-2"></div>
                  </div>
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
            page-break-after: avoid;
            page-break-before: avoid;
          }
          @page {
            size: ${paperSize === 'TENT' ? '100mm 210mm' : dims.w + ' ' + dims.h};
            margin: 0;
          }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
