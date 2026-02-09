
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Share2, Copy, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const QRCodeModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = React.useState(false);
  const t = translations[lang];
  
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
          title: `Pizzeria Fenicia Menu`,
          url: currentUrl,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-black text-gray-900">{t.shareMenu}</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">{t.pointCamera}</p>
          </div>

          <div className="p-8 bg-white border-2 border-gray-50 rounded-[2.5rem] shadow-sm mb-8 transform transition-transform hover:scale-105 duration-500">
            <QRCodeSVG 
              value={currentUrl} 
              size={180} 
              level="H" 
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? t.linkCopied : t.copyLink}
            </button>
            
            {navigator.share && (
              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#E74C3C] text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#C0392B] transition-all shadow-lg shadow-[#E74C3C]/20"
              >
                <Share2 size={16} />
                {t.sendFriends}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
