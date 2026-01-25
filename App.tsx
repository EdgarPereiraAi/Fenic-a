
import React, { useState, useEffect, useMemo } from 'react';
import { MENU_DATA } from './data';
import { MenuItemCard } from './components/MenuItemCard';
import { LanguageSelector } from './components/LanguageSelector';
import { PrintMenuModal } from './components/PrintMenuModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { OrderNotepad } from './components/OrderNotepad';
import { QRCodeModal } from './components/QRCodeModal';
import { Language, MenuItem, CartItem } from './types';
import { Search, Phone, ChevronDown, Unlock, ClipboardList, ArrowRight, Settings, Printer, QrCode } from 'lucide-react';

const PHONE_NUMBER = "281325175"; 
const FORMATTED_PHONE = "281 325 175";

const OrderButtons: React.FC = () => {
  return (
    <div className="flex flex-row gap-3 w-full max-w-lg mx-auto my-6 px-4">
      <a
        href={`tel:+351${PHONE_NUMBER}`}
        className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#E74C3C] text-white hover:bg-[#C0392B] transition-all duration-300 font-black shadow-lg shadow-[#E74C3C]/40 hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
      >
        <Phone size={20} />
        {FORMATTED_PHONE}
      </a>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [customPrices, setCustomPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedImages = localStorage.getItem('pizzaria_fenicia_custom_images');
    const savedPrices = localStorage.getItem('pizzaria_fenicia_custom_prices');
    const savedAdminStatus = localStorage.getItem('pizzaria_fenicia_is_admin') === 'true';
    const savedCart = localStorage.getItem('pizzaria_fenicia_cart');
    
    if (savedImages) try { setCustomImages(JSON.parse(savedImages)); } catch (e) {}
    if (savedPrices) try { setCustomPrices(JSON.parse(savedPrices)); } catch (e) {}
    if (savedCart) try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    setIsAdmin(savedAdminStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem('pizzaria_fenicia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

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

  const cartTotalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const CATEGORY_COLORS: Record<string, string> = {
    'entradas': '#FF5733',        
    'saladas': '#2ECC71',         
    'massas': '#F1C40F',          
    'especialidades': '#9B59B6',  
    'pizzas-classicas': '#E74C3C', 
    'pizzas-especiais': '#C0392B', 
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] md:w-[85vh] h-[110vw] md:h-[85vh] opacity-100 animate-[spin_80s_linear_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover rounded-full shadow-[0_0_150px_rgba(231,76,60,0.6)] saturate-[1.8] contrast-[1.2] brightness-[1.1]" 
              alt="Pizza" 
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,white_85%)] z-[1]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in duration-1000">
          <div className="relative mb-14 transform hover:scale-[1.02] transition-transform duration-700 cursor-default">
            <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative overflow-hidden group">
              <h1 className="text-7xl md:text-[12rem] leading-[0.8] font-serif tracking-tighter filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
                <span className="text-[#E74C3C] block mb-2">Pizzeria</span>
                <span className="text-[#27AE60] block -mt-4 md:-mt-8">Fenicia</span>
              </h1>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#D4AF37] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-black rotate-12 shadow-2xl border-4 border-white scale-90 md:scale-100">
               <span className="text-[11px] leading-tight">ARTESANAL</span>
               <span className="text-xl">100%</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-10">
            <p className="text-gray-900 text-lg md:text-2xl font-serif italic tracking-wide max-w-lg leading-relaxed font-black">
              "A verdadeira essência italiana no coração do Algarve."
            </p>
            <div className="scale-110">
               <LanguageSelector currentLang={lang} onLangChange={setLang} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-700">
           <ChevronDown size={32} />
        </div>
      </header>

      <div className="max-w-4xl mx-auto -mt-12 relative z-30">
        <OrderButtons />
      </div>

      {isAdmin && (
        <div className="bg-[#FF5733] text-white py-2 text-center sticky top-0 z-[60] font-black text-xs shadow-xl flex items-center justify-center gap-6 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <Unlock size={14} /> Modo Gestão Ativo
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full flex items-center gap-2 transition-all border border-white/20"
            >
              <Settings size={12} /> Alterar Senha
            </button>
            <button onClick={handleLogout} className="bg-white text-[#FF5733] px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-all shadow-md">Sair</button>
          </div>
        </div>
      )}

      <div className="sticky top-2 z-40 max-w-xl mx-auto px-4 mt-12 mb-8">
        <div className="relative group shadow-2xl rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#E74C3C] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Qual é o seu desejo hoje?..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-14 pr-6 py-5 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 text-base font-bold placeholder:font-medium transition-all"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:justify-center gap-3">
          {processedMenu.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`group relative overflow-hidden flex items-center justify-between px-6 py-5 rounded-3xl font-black transition-all duration-300 shadow-lg ${
                activeCategory === category.id 
                  ? 'scale-105 shadow-2xl ring-4 ring-white z-10' 
                  : 'opacity-90 hover:opacity-100 hover:translate-y-[-2px]'
              }`}
              style={{ backgroundColor: CATEGORY_COLORS[category.id] || '#ccc', color: 'white' }}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="uppercase tracking-[0.2em] text-[11px] sm:text-xs leading-none">Explorar</span>
                <span className="text-sm sm:text-base uppercase tracking-tight">{category.title}</span>
              </div>
              <div className={`p-2 rounded-2xl bg-white/20 transition-transform duration-500 ${activeCategory === category.id ? 'rotate-90' : 'group-hover:translate-x-1'}`}>
                <ArrowRight size={18} />
              </div>
              {activeCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 pb-20">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-32 opacity-30">
            <Search size={64} className="mx-auto mb-4" strokeWidth={1} />
            <p className="text-gray-500 text-xl font-serif italic">Nenhum sabor encontrado com esse nome.</p>
          </div>
        ) : (
          filteredMenu.map((category) => (
            <section key={category.id} id={category.id} className="mb-20 scroll-mt-32">
              <div className="mb-8 flex items-end justify-between px-2">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-10 rounded-full shadow-lg" style={{ backgroundColor: CATEGORY_COLORS[category.id] }}></div>
                  <h2 className="text-4xl text-gray-900 font-black tracking-tighter">{category.title}</h2>
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">{category.items.length} Pratos</span>
              </div>
              <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 space-y-2">
                {category.items.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    lang={lang} 
                    isAdmin={isAdmin}
                    onImageUpdate={handleImageUpdate}
                    onPriceUpdate={handlePriceUpdate}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[140]">
        {!isAdmin && (
          <button
            onClick={() => setIsNotepadOpen(true)}
            className="relative p-5 bg-[#1D3C18] text-white rounded-[2rem] shadow-[0_20px_40px_rgba(29,60,24,0.4)] hover:scale-110 transition-all duration-500 active:scale-90 group"
          >
            <ClipboardList size={28} className="group-hover:rotate-12 transition-transform" />
            {cartTotalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E74C3C] text-white text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full border-4 border-[#FAF9F6] shadow-lg animate-bounce">
                {cartTotalItems}
              </span>
            )}
          </button>
        )}
        <button
          onClick={() => setIsQRCodeModalOpen(true)}
          className="p-5 bg-[#27AE60] text-white rounded-[2rem] shadow-[0_20px_40px_rgba(39,174,96,0.4)] hover:scale-110 transition-all active:scale-90 group"
          title="Partilhar QR Code"
        >
          <QrCode size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
        
        {/* Botão de Impressão Restrito ao Administrador */}
        {isAdmin && (
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="p-5 bg-[#D4AF37] text-white rounded-[2rem] shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:scale-110 transition-all active:scale-90 group"
            title="Imprimir Menu"
          >
            <Printer size={28} className="group-hover:rotate-12 transition-transform" />
          </button>
        )}
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`p-5 bg-gray-900 text-white rounded-[2rem] shadow-xl transition-all duration-700 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        >
          <ChevronDown className="rotate-180" size={28} />
        </button>
      </div>

      <PrintMenuModal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} menuData={processedMenu} lang={lang} />
      <QRCodeModal isOpen={isQRCodeModalOpen} onClose={() => setIsQRCodeModalOpen(false)} />
      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <AdminSettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      
      <OrderNotepad 
        isOpen={isNotepadOpen} 
        onClose={() => setIsNotepadOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        lang={lang}
        phoneNumber={PHONE_NUMBER}
      />

      <footer className="bg-white pt-24 pb-40 border-t border-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#E74C3C]/5 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-5xl text-[#1D3C18] mb-4 font-black italic font-serif tracking-tighter">Pizzeria Fenicia</h3>
          <p className="text-[#E74C3C] font-black tracking-[0.6em] text-[10px] uppercase mb-16">Tavira • Algarve • Portugal</p>
          <button 
            onClick={() => isAdmin ? handleLogout() : setIsLoginModalOpen(true)}
            className="text-[9px] text-gray-300 hover:text-[#FF5733] transition-all uppercase tracking-[0.5em] font-black border border-gray-100 px-6 py-3 rounded-full hover:border-[#FF5733]/20"
          >
            {isAdmin ? 'Fechar Painel' : 'Acesso Restrito'}
          </button>
          <div className="mt-20 opacity-20 hover:opacity-100 transition-opacity duration-1000">
             <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" className="w-12 h-12 mx-auto grayscale" alt="Pizza Icon" />
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

export default App;
