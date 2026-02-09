
import React, { useState } from 'react';
import { X, Printer, Layout, Columns as ColumnsIcon, Maximize, Image as ImageIcon, Droplets, Type, Check, RectangleHorizontal } from 'lucide-react';
import { Category, Language } from '../types';
import { translations } from '../translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuData: Category[];
  lang: Language;
}

type PaperSize = 'A5' | 'A4' | 'A3' | 'A2' | 'A1';
type FontSize = 'XS' | 'SM' | 'NOR' | 'LG';
type Orientation = 'portrait' | 'landscape';

export const PrintMenuModal: React.FC<Props> = ({ isOpen, onClose, menuData, lang }) => {
  const t = translations[lang];
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [showImages, setShowImages] = useState(true);
  const [grayscale, setGrayscale] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('NOR');
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
      default: return isPortrait ? { w: '210mm', h: '297mm' } : { w: '297mm', h: '210mm' };
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'XS': return 'text-[9px]';
      case 'SM': return 'text-[11px]';
      case 'LG': return 'text-[15px]';
      default: return 'text-[13px]';
    }
  };

  const dims = getPageDimensions();
  const cols = getColumns();

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/90 backdrop-blur-md print:bg-white print:static overflow-hidden">
      <div className="absolute left-4 top-4 bottom-4 z-[170] flex flex-col w-72 print:hidden animate-in slide-in-from-left duration-500">
        <div className="bg-white rounded-[2rem] h-full flex flex-col shadow-2xl overflow-hidden border border-white/20">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-gray-900 font-black uppercase tracking-tight text-base font-serif">{t.adjustments}</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-all text-gray-400">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="space-y-1.5">
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[8px] flex items-center gap-1.5">
                <Maximize size={10} /> {t.paper}
              </h3>
              <div className="grid grid-cols-3 gap-1">
                {(['A5', 'A4', 'A3', 'A2', 'A1'] as PaperSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setPaperSize(size)}
                    className={`py-1.5 rounded-lg font-black transition-all border-2 text-[9px] ${
                      paperSize === size 
                        ? 'bg-[#E74C3C] text-white border-[#E74C3C]' 
                        : 'bg-white text-gray-400 border-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[8px] flex items-center gap-1.5">
                <Layout size={10} /> {t.orientation}
              </h3>
              <div className="flex gap-1">
                  <button 
                      onClick={() => setOrientation('portrait')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border-2 transition-all font-black text-[9px] ${orientation === 'portrait' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-100'}`}
                  >
                      <RectangleHorizontal size={10} className="rotate-90" /> {t.portrait}
                  </button>
                  <button 
                      onClick={() => setOrientation('landscape')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border-2 transition-all font-black text-[9px] ${orientation === 'landscape' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-100'}`}
                  >
                      <RectangleHorizontal size={10} /> {t.landscape}
                  </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[8px] flex items-center gap-1.5">
                <Type size={10} /> {t.fontSize}
              </h3>
              <div className="flex gap-1 p-1 bg-gray-50 rounded-lg">
                  {(['XS', 'SM', 'NOR', 'LG'] as FontSize[]).map((f) => (
                      <button 
                        key={f} 
                        onClick={() => setFontSize(f)} 
                        className={`flex-1 py-1 rounded-md text-[8px] font-black transition-all ${fontSize === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                      >
                        {f}
                      </button>
                  ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-gray-400 font-black uppercase tracking-widest text-[8px] flex items-center gap-1.5">
                <ColumnsIcon size={10} /> {t.columns}
              </h3>
              <div className="flex gap-1 p-1 bg-gray-50 rounded-lg">
                  {['auto', 1, 2, 3, 4].map((c) => (
                      <button 
                        key={c} 
                        onClick={() => setCustomCols(c as any)} 
                        className={`flex-1 py-1 rounded-md text-[8px] font-black transition-all uppercase ${customCols === c ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                      >
                        {c}
                      </button>
                  ))}
              </div>
            </div>

            <div className="pt-1 space-y-1.5">
              <button 
                onClick={() => setShowImages(!showImages)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-black text-[9px] transition-all border-2 ${
                  showImages ? 'bg-[#27AE60]/5 text-[#27AE60] border-[#27AE60]/20' : 'bg-white text-gray-400 border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2"><ImageIcon size={12} /> {t.photos}</div>
                {showImages && <Check size={12} />}
              </button>

              <button 
                onClick={() => setGrayscale(!grayscale)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-black text-[9px] transition-all border-2 ${
                  grayscale ? 'bg-gray-900/5 text-gray-900 border-gray-900/20' : 'bg-white text-gray-400 border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2"><Droplets size={12} /> {t.bw}</div>
                {grayscale && <Check size={12} />}
              </button>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E74C3C] text-white font-black uppercase tracking-widest text-[10px] hover:bg-[#C0392B] transition-all shadow-xl shadow-[#E74C3C]/20 active:scale-95"
            >
              <Printer size={14} />
              {t.print}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-auto flex justify-center py-10 pl-72 print:p-0 print:m-0 print:overflow-visible scrollbar-hide">
        <div 
          id="printable-menu"
          className={`bg-white shadow-2xl print:shadow-none relative print:m-0 print:border-none ${grayscale ? 'grayscale contrast-125' : ''}`}
          style={{
            width: dims.w,
            minHeight: dims.h,
            padding: '12mm',
          }}
        >
          <div className="flex flex-col h-full bg-white">
            <div className="text-center mb-8 w-full">
              <p className="text-[#D4AF37] font-serif text-lg tracking-[0.3em] mb-0.5 uppercase">Cucina Italiana</p>
              <h1 className="text-5xl text-[#E74C3C] font-serif leading-[0.8] tracking-tighter">Pizzeria</h1>
              <h1 className="text-6xl text-[#27AE60] font-serif leading-[0.8] tracking-tighter -mt-1">Fenicia</h1>
              <div className="flex items-center justify-center gap-4 my-3">
                <div className="h-[1px] w-10 bg-gray-100"></div>
                <p className="uppercase tracking-[0.4em] text-[7px] font-black text-gray-300">Tavira • Algarve</p>
                <div className="h-[1px] w-10 bg-gray-100"></div>
              </div>
            </div>

            <div 
              className="w-full"
              style={{ 
                display: 'block',
                columnCount: cols,
                columnGap: '10mm',
                columnRule: '1px solid #f9fafb'
              }}
            >
              {menuData.map((category) => (
                <div key={category.id} className="break-inside-avoid mb-6">
                  <div className="flex items-center gap-2 mb-3 pb-1 border-b-2 border-[#E74C3C]/10">
                    <div className="w-1 h-5 bg-[#27AE60]"></div>
                    <h2 className="text-base font-serif text-[#1D3C18] uppercase tracking-wide italic font-black">
                      {category.title[lang] || category.title.pt}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className={`flex gap-2.5 border-b border-gray-50 pb-2.5 last:border-none last:pb-0 break-inside-avoid ${getFontSizeClass()}`}>
                        {showImages && (
                          <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mt-0.5">
                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline gap-1.5 mb-0.5">
                            <span className="font-black text-gray-900 uppercase tracking-tighter truncate">
                              {item.number && <span className="text-[0.7em] text-[#E74C3C] mr-1 font-mono">#{item.number}</span>}
                              {item.name}
                            </span>
                            <span className="font-black text-[#E74C3C] tabular-nums whitespace-nowrap">{item.price}</span>
                          </div>
                          <p className="text-[0.85em] text-gray-500 italic leading-tight font-medium">
                            {item.ingredients[lang] || item.ingredients['pt']}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
