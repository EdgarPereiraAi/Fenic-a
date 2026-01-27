
import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const languages: { code: Language; label: string; flagUrl: string; color: string }[] = [
  { 
    code: 'pt', 
    label: 'Portugal', 
    flagUrl: 'https://flagcdn.com/w160/pt.png', 
    color: '#2D5A27' 
  }, 
  { 
    code: 'en', 
    label: 'UK', 
    flagUrl: 'https://flagcdn.com/w160/gb.png', 
    color: '#C41E3A' 
  }, 
  { 
    code: 'es', 
    label: 'Espanha', 
    flagUrl: 'https://flagcdn.com/w160/es.png', 
    color: '#AA151B' 
  },
  { 
    code: 'fr', 
    label: 'França', 
    flagUrl: 'https://flagcdn.com/w160/fr.png', 
    color: '#0055A4' 
  },    
  { 
    code: 'de', 
    label: 'Alemanha', 
    flagUrl: 'https://flagcdn.com/w160/de.png', 
    color: '#D4AF37' 
  },  
];

export const LanguageSelector: React.FC<Props> = ({ currentLang, onLangChange }) => {
  return (
    <div className="flex gap-4 p-3 bg-white/90 backdrop-blur-2xl rounded-full border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLangChange(lang.code)}
          className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-500 overflow-hidden ${
            currentLang === lang.code
              ? 'scale-115 shadow-2xl ring-4 ring-white ring-offset-2 ring-offset-[#E74C3C]'
              : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
          }`}
          title={lang.label}
        >
          <img 
            src={lang.flagUrl} 
            alt={lang.label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {currentLang === lang.code && (
            <div 
              className="absolute inset-0 opacity-10" 
              style={{ backgroundColor: lang.color }}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
        </button>
      ))}
    </div>
  );
};
