
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
    <div className="flex gap-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLangChange(lang.code)}
          className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-500 overflow-hidden ${
            currentLang === lang.code
              ? 'scale-110 shadow-lg ring-2 ring-white ring-offset-2 ring-offset-transparent'
              : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'
          }`}
          title={lang.label}
        >
          {/* Flag Image replaces text */}
          <img 
            src={lang.flagUrl} 
            alt={lang.label}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Subtle Overlay for better blending when selected */}
          {currentLang === lang.code && (
            <div 
              className="absolute inset-0 opacity-20" 
              style={{ backgroundColor: lang.color }}
            />
          )}
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
        </button>
      ))}
    </div>
  );
};
