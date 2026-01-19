
import React, { useState, useEffect, useMemo } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { MENU_DATA } from './data';
import { MenuItemCard } from './components/MenuItemCard';
import { LanguageSelector } from './components/LanguageSelector';
import { QRCodeModal } from './components/QRCodeModal';
import { PrintMenuModal } from './components/PrintMenuModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Language } from './types';
import { Search, QrCode, Phone, Instagram, MapPin, ChevronDown, MessageCircle, Lock, Unlock, Printer, LogOut } from 'lucide-react';

const PHONE_NUMBER = "+351123456789"; 

const CATEGORY_COLORS: Record<string, string> = {
  'entradas': '#FF5733',        
  'saladas': '#2ECC71',         
  'massas': '#F1C40F',          
  'especialidades': '#9B59B6',  
  'pizzas-classicas': '#E74C3C', 
  'pizzas-especiais': '#C0392B', 
};

const OrderButtons: React.FC = () => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Olá! Gostaria de consultar o menu e fazer um pedido na Pizzaria Fenícia.`);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-row gap-3 w-full max-w-md mx-auto my-6 px-4">
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E74C3C] text-white hover:bg-[#C0392B] transition-all duration-300 font-bold shadow-md shadow-[#E74C3C]/30 hover:scale-105 active:scale-95 text-sm"
      >
        <Phone size={18} />
        Telefone
      </a>
      <button
        onClick={handleWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#27AE60] text-white hover:bg-[#219150] transition-all duration-300 font-bold shadow-md shadow-[#27AE60]/30 hover:scale-105 active:scale-95 text-sm"
      >
        <MessageCircle size={18} />
        WhatsApp
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [customPrices, setCustomPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedImages = localStorage.getItem('pizzaria_fenicia_custom_images');
    const savedPrices = localStorage.getItem('pizzaria_fenicia_custom_prices');
    const savedAdminStatus = localStorage.getItem('pizzaria_fenicia_is_admin') === 'true';
    
    if (savedImages) {
      try {
        setCustomImages(JSON.parse(savedImages));
      } catch (e) {
        console.error("Failed to parse custom images", e);
      }
    }
    if (savedPrices) {
      try {
        setCustomPrices(JSON.parse(savedPrices));
      } catch (e) {
        console.error("Failed to parse custom prices", e);
      }
    }
    setIsAdmin(savedAdminStatus);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = MENU_DATA.map(cat => document.getElementById(cat.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveCategory(MENU_DATA[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageUpdate = (id: string, base64: string) => {
    const newImages = { ...customImages, [id]: base64 };
    setCustomImages(newImages);
    localStorage.setItem('pizzaria_fenicia_custom_images', JSON.stringify(newImages));
  };

  const handlePriceUpdate = (id: string, price: string) => {
    const newPrices = { ...customPrices, [id]: price };
    setCustomPrices(newPrices);
    localStorage.setItem('pizzaria_fenicia_custom_prices', JSON.stringify(newPrices));
  };

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('pizzaria_fenicia_is_admin', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.setItem('pizzaria_fenicia_is_admin', 'false');
  };

  const processedMenu = useMemo(() => {
    return MENU_DATA.map(cat => ({
      ...cat,
      items: cat.items.map(item => ({
        ...item,
        image: customImages[item.id] || item.image,
        price: customPrices[item.id] || item.price
      }))
    }));
  }, [customImages, customPrices]);

  const filteredMenu = useMemo(() => {
    if (!searchTerm) return processedMenu;
    return processedMenu.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredients[lang].toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchTerm, lang, processedMenu]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveCategory(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-10 -left-10 w-64 h-64 opacity-60 md:opacity-100">
            <img 
              src="https://images.unsplash.com/photo-1590779033100-9f60702a0509?auto=format&fit=crop&w=400&q=80" 
              className="w-full h-full object-contain rotate-[-15deg]"
              alt="Fresh tomatoes"
            />
          </div>
          <div className="absolute -top-10 -right-20 w-80 h-80 opacity-60 md:opacity-100">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" 
              className="w-full h-full object-contain rotate-[15deg]"
              alt="Fresh pizza"
            />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-[#D4AF37] text-4xl md:text-5xl font-serif mb-8 tracking-[0.2em] uppercase">Menu</h2>
          
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center relative">
              <h1 className="text-6xl md:text-9xl tracking-tight leading-none mb-2">
                <span className="text-[#E74C3C] block font-serif">Pizzeria</span>
                <span className="text-[#27AE60] block font-serif mt-[-10px] md:mt-[-20px]">Fenicia</span>
              </h1>
              <div className="mt-4 md:absolute md:-right-32 md:bottom-0">
                <img 
                   src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" 
                   className="w-20 h-20 md:w-32 md:h-32 object-contain filter drop-shadow-md grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                   alt="Chef icon"
                />
              </div>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm md:text-base font-medium mt-12 mb-8 max-w-lg mx-auto leading-relaxed border-t border-gray-100 pt-6">
            O autêntico sabor da tradição em cada fatia. <br className="hidden md:block" />
            Ingredientes frescos, paixão italiana e herança mediterrânea.
          </p>
          
          <div className="flex justify-center mt-6">
            <LanguageSelector currentLang={lang} onLangChange={setLang} />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto -mt-8 relative z-20">
        <OrderButtons />
      </div>

      {isAdmin && (
        <div className="bg-[#FF5733] text-white py-2 text-center sticky top-0 z-[60] font-black text-xs shadow-xl flex items-center justify-center gap-4 animate-pulse">
          <div className="flex items-center gap-2 uppercase tracking-widest">
            <Unlock size={14} /> MODO DE EDIÇÃO ATIVO
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white text-[#FF5733] px-3 py-1 rounded-full flex items-center gap-1 hover:bg-black hover:text-white transition-all font-black uppercase text-[10px]"
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 mt-8 mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#E74C3C] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="O que procura hoje?..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 bg-white border-2 border-transparent rounded-xl shadow-lg focus:border-[#E74C3C] focus:ring-0 focus:outline-none text-gray-900 text-base transition-all"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {processedMenu.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`py-3 px-4 rounded-xl text-center font-bold transition-all duration-300 shadow-md border border-white/10 flex flex-col items-center gap-1 group overflow-hidden relative ${
                activeCategory === category.id ? 'scale-105 shadow-xl ring-2 ring-black/10 z-10' : 'opacity-90 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: CATEGORY_COLORS[category.id] || '#ccc',
                color: 'white'
              }}
            >
              <span className="uppercase tracking-widest text-[10px] sm:text-xs relative z-10">{category.title}</span>
              {activeCategory === category.id && (
                <div className="w-1 h-1 bg-white rounded-full mt-0.5 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nenhum prato encontrado.</p>
          </div>
        ) : (
          filteredMenu.map((category) => (
            <section key={category.id} id={category.id} className="mb-16 scroll-mt-24">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-2 h-8 rounded-full shadow-md" style={{ backgroundColor: CATEGORY_COLORS[category.id] }}></div>
                <h2 className="text-3xl text-gray-900 font-black">{category.title}</h2>
              </div>
              <div className="bg-white rounded-[1.5rem] p-6 shadow-xl border border-gray-100 space-y-2">
                {category.items.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    lang={lang} 
                    isAdmin={isAdmin}
                    onImageUpdate={handleImageUpdate}
                    onPriceUpdate={handlePriceUpdate}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <div className="max-w-4xl mx-auto py-12 bg-white/50 backdrop-blur-sm rounded-t-[2rem] mt-16">
        <div className="text-center mb-6">
          <p className="text-[#FF5733] text-[10px] font-black uppercase tracking-[0.3em]">Ficou com fome?</p>
          <h3 className="text-3xl text-gray-900 mt-1 font-black">Peça agora mesmo</h3>
        </div>
        <OrderButtons />
        
        <div className="flex justify-center mt-12 px-4">
          <button 
            onClick={() => setIsPrintModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1D3C18] text-white hover:bg-black transition-all font-black uppercase text-xs tracking-[0.2em] shadow-xl active:scale-95"
          >
            <Printer size={20} />
            Gerar Menu para Impressão (A4/A3/A2)
          </button>
        </div>
      </div>

      <footer className="bg-white pt-16 pb-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12">
            <h3 className="text-5xl text-[#1D3C18] mb-2 font-black italic font-serif">Pizzeria Fenicia</h3>
            <p className="text-[#E74C3C] font-black tracking-[0.4em] text-xs uppercase mb-8">Tavira, Algarve</p>
            <p className="text-gray-600 max-w-md mx-auto italic text-base mb-10">
              "A verdadeira experiência da pizza artesanal."
            </p>
            <div className="flex justify-center gap-8 text-gray-400">
               <Instagram size={24} className="hover:text-[#E74C3C] transition-all cursor-pointer hover:scale-110" />
               <Phone size={24} className="hover:text-[#27AE60] transition-all cursor-pointer hover:scale-110" />
               <MapPin size={24} className="hover:text-gray-600 transition-all cursor-pointer hover:scale-110" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-sm text-gray-600">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-100">
              <h4 className="font-black text-gray-900 uppercase tracking-widest mb-4 text-xs">Nosso Horário</h4>
              <p className="font-bold text-[#1D3C18]">Segunda a Sábado</p>
              <div className="flex flex-col gap-1 mt-2 font-black text-gray-800 text-lg">
                <span>12:00h - 15:00h</span>
                <span>19:00h - 22:00h</span>
              </div>
              <p className="text-[#E74C3C] font-black pt-4 uppercase tracking-widest text-xs">Domingo: Encerrado</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-100 flex flex-col justify-center">
              <h4 className="font-black text-gray-900 uppercase tracking-widest mb-4 text-xs">Onde Estamos</h4>
              <p className="font-bold text-gray-800">Largo da Caracolinha, n.8</p>
              <p className="text-gray-600">8800-310 Tavira</p>
              <p className="text-gray-600">Algarve, Portugal</p>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 space-y-8">
            <p className="text-[#1D3C18] font-black text-2xl drop-shadow-sm font-serif">Obrigado Pela sua Visita!</p>
            
            <button 
              onClick={() => isAdmin ? handleLogout() : setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-2 text-[10px] text-gray-300 hover:text-[#FF5733] transition-all uppercase tracking-[0.4em] font-black px-4 py-2 rounded-lg border border-transparent hover:border-gray-200"
            >
              {isAdmin ? <Lock size={14} /> : <Unlock size={14} />}
              {isAdmin ? 'Sair da Gestão' : 'Gestão'}
            </button>

            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Iva incluido à Taxa em vigor</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <button
          onClick={() => setIsQRModalOpen(true)}
          className="p-3.5 bg-white text-[#E74C3C] rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-all duration-300 active:scale-95 group"
        >
          <QrCode size={22} className="group-hover:rotate-12 transition-transform" />
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`p-3.5 bg-gray-900 text-white rounded-full shadow-lg transition-all duration-500 hover:bg-black active:scale-90 ${isScrolled ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'}`}
        >
          <ChevronDown className="rotate-180" size={22} />
        </button>
      </div>

      <QRCodeModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
      <PrintMenuModal 
        isOpen={isPrintModalOpen} 
        onClose={() => setIsPrintModalOpen(false)} 
        menuData={processedMenu}
        lang={lang}
      />
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <SpeedInsights />
    </div>
  );
};

export default App;
