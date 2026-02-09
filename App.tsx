
import React, { useState, useEffect, useMemo } from 'react';
import { MENU_DATA, CHEF_LOGO } from './data';
import { MenuItemCard } from './components/MenuItemCard';
import { LanguageSelector } from './components/LanguageSelector';
import { PrintMenuModal } from './components/PrintMenuModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { OrderNotepad } from './components/OrderNotepad';
import { QRCodeModal } from './components/QRCodeModal';
import { translations } from './translations';
import { Language, MenuItem, CartItem, Category } from './types';
import { Search, Phone, ChevronDown, Unlock, ClipboardList, ArrowRight, Printer, QrCode, RefreshCcw, MapPin, Clock, CloudUpload, AlertTriangle, CheckCircle } from 'lucide-react';

const PHONE_NUMBER = "281325175"; 
const FORMATTED_PHONE = "281 325 175";

const OrderButtons: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <div className="flex flex-row gap-3 w-full max-w-lg mx-auto my-6 px-4">
      <a
        href={`tel:+351${PHONE_NUMBER}`}
        className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#E74C3C] text-white hover:bg-[#C0392B] transition-all duration-300 font-black shadow-lg shadow-[#E74C3C]/40 hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
      >
        <Phone size={20} />
        {t.callToOrder} - {FORMATTED_PHONE}
      </a>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];

  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [masterMenu, setMasterMenu] = useState<Category[]>(MENU_DATA);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

   const loadMenu = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      setMasterMenu(MENU_DATA); 
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const syncMenuToUpstash = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(masterMenu)
      });
      
      if (!response.ok) throw new Error('Erro ao salvar no servidor.');
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      alert(`Erro na sincronização: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    loadMenu();
    const savedAdminStatus = localStorage.getItem('pizzaria_fenicia_is_admin') === 'true';
    const savedCart = localStorage.getItem('pizzaria_fenicia_cart');
    if (savedCart) try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    setIsAdmin(savedAdminStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem('pizzaria_fenicia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = masterMenu.map(cat => document.getElementById(cat.id));
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveCategory(masterMenu[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [masterMenu]);

  const updateMenuItem = (itemId: string, updates: Partial<MenuItem>) => {
    const newMenu = masterMenu.map(cat => ({
      ...cat,
      items: cat.items.map(item => item.id === itemId ? { ...item, ...updates } : item)
    }));
    setMasterMenu(newMenu);
  };

  const handleIngredientsUpdate = (itemId: string, l: Language, text: string) => {
    const newMenu = masterMenu.map(cat => ({
      ...cat,
      items: cat.items.map(item => item.id === itemId ? {
        ...item,
        ingredients: { ...item.ingredients, [l]: text }
      } : item)
    }));
    setMasterMenu(newMenu);
  };

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => setCartItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCartItems([]);
  const handleLogin = () => { setIsAdmin(true); localStorage.setItem('pizzaria_fenicia_is_admin', 'true'); };
  const handleLogout = () => { setIsAdmin(false); localStorage.setItem('pizzaria_fenicia_is_admin', 'false'); };

  const filteredMenu = useMemo(() => {
    if (!searchTerm) return masterMenu;
    const term = searchTerm.toLowerCase();
    return masterMenu.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.toLowerCase().includes(term) ||
        Object.values(item.ingredients).some(ing => (ing as string).toLowerCase().includes(term))
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchTerm, masterMenu]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      setActiveCategory(id);
    }
  };

  const CATEGORY_COLORS: Record<string, string> = {
    'entradas': '#FF5733', 'saladas': '#2ECC71', 'massas': '#F1C40F',
    'especialidades': '#9B59B6', 'pizzas-classicas': '#E74C3C', 'pizzas-especiais': '#C0392B',
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {isAdmin && (
        <div className="bg-[#1D3C18] text-white py-3 px-4 sticky top-0 z-[110] shadow-2xl flex flex-wrap items-center justify-between gap-4 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-[#27AE60]">
              <Unlock size={14} /> {t.adminPanel}
            </div>
            <button 
              onClick={syncMenuToUpstash}
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                saveSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#27AE60] text-white hover:bg-[#1E8449]'
              } ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : saveSuccess ? <CheckCircle size={14} /> : <CloudUpload size={14} />}
              {saveSuccess ? 'OK!' : t.updateMenu}
            </button>
          </div>
          <button onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 transition-all text-white">
            {t.logout}
          </button>
        </div>
      )}

      {apiError && !isAdmin && (
        <div className="bg-amber-100 text-amber-900 py-2 px-4 text-center text-[10px] font-black uppercase tracking-widest border-b border-amber-200">
          <div className="flex items-center justify-center gap-2"><AlertTriangle size={12} /> Offline Mode - Loading local data</div>
        </div>
      )}

      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center pt-4 px-4 pointer-events-none ${isAdmin ? 'mt-14' : ''}`}>
        <div className="pointer-events-auto scale-110 sm:scale-125 transform transition-all duration-500">
          <LanguageSelector currentLang={lang} onLangChange={setLang} />
        </div>
      </div>

      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] md:w-[85vh] h-[110vw] md:h-[85vh] animate-[spin_80s_linear_infinite]">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover rounded-full shadow-[0_0_150px_rgba(231,76,60,0.6)] saturate-[1.8] contrast-[1.2] brightness-[1.1]" alt="Hero" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,white_85%)] z-[1]"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in duration-1000 mt-20">
          <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[4rem] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative overflow-hidden">
            <h1 className="text-7xl md:text-[10rem] leading-[0.8] font-serif tracking-tighter relative z-10">
              <span className="text-[#E74C3C] block mb-2">Pizzeria</span>
              <span className="text-[#27AE60] block -mt-4 md:-mt-8">Fenicia</span>
            </h1>
          </div>
          <p className="text-gray-900 text-lg md:text-2xl font-serif italic tracking-wide max-w-lg font-black mx-auto mt-8">{t.slogan}</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto -mt-12 relative z-30"><OrderButtons lang={lang} /></div>

      <div className="sticky top-20 z-40 max-w-xl mx-auto px-4 mt-12 mb-8">
        <div className="relative group shadow-2xl rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
          <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-14 pr-6 py-5 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 text-base font-bold transition-all" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-20 flex flex-wrap justify-center gap-3">
        {masterMenu.map((category) => (
          <button key={category.id} onClick={() => scrollToCategory(category.id)} className={`group flex items-center justify-between px-6 py-5 rounded-3xl font-black transition-all duration-300 shadow-lg ${activeCategory === category.id ? 'scale-105 shadow-2xl ring-4 ring-white z-10' : 'opacity-90 hover:opacity-100 hover:-translate-y-1'}`} style={{ backgroundColor: CATEGORY_COLORS[category.id] || '#ccc', color: 'white' }}>
            <div className="flex flex-col items-start gap-1"><span className="uppercase tracking-[0.2em] text-[11px] leading-none">{t.explore}</span><span className="text-sm uppercase tracking-tight">{category.title[lang] || category.title.pt}</span></div>
            <div className={`p-2 rounded-2xl bg-white/20 transition-transform ${activeCategory === category.id ? 'rotate-90' : 'group-hover:translate-x-1'}`}><ArrowRight size={18} /></div>
          </button>
        ))}
      </div>

      <main className="max-w-3xl mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="text-center py-20 flex flex-col items-center gap-4"><RefreshCcw size={48} className="animate-spin text-[#E74C3C]" /><p className="text-gray-400 font-black uppercase tracking-widest text-xs">{t.loadingMenu}</p></div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-32 opacity-30"><Search size={64} className="mx-auto mb-4" /><p className="text-gray-500 text-xl font-serif italic">{t.noItemsFound}</p></div>
        ) : (
          filteredMenu.map((category) => (
            <section key={category.id} id={category.id} className="mb-20 scroll-mt-32">
              <div className="mb-8 flex items-center gap-4 px-2"><div className="w-3 h-10 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[category.id] }}></div><h2 className="text-4xl text-gray-900 font-black tracking-tighter">{category.title[lang] || category.title.pt}</h2></div>
              <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 space-y-2">
                {category.items.map((item) => (
                  <MenuItemCard 
                    key={item.id} item={item} lang={lang} isAdmin={isAdmin}
                    onImageUpdate={(id, base64) => updateMenuItem(id, { image: base64 })}
                    onPriceUpdate={(id, price) => updateMenuItem(id, { price })}
                    onNameUpdate={(id, name) => updateMenuItem(id, { name })}
                    onNumberUpdate={(id, number) => updateMenuItem(id, { number })}
                    onIngredientsUpdate={(text) => handleIngredientsUpdate(item.id, lang, text)}
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
          <button onClick={() => setIsNotepadOpen(true)} className="relative p-5 bg-[#1D3C18] text-white rounded-[2rem] shadow-xl hover:scale-110 active:scale-90">
            <ClipboardList size={28} />
            {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-[#E74C3C] text-white text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full border-4 border-[#FAF9F6] animate-bounce">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>}
          </button>
        )}
        <button onClick={() => setIsQRCodeModalOpen(true)} className="p-5 bg-[#27AE60] text-white rounded-[2rem] shadow-xl hover:scale-110"><QrCode size={28} /></button>
        {isAdmin && <button onClick={() => setIsPrintModalOpen(true)} className="p-5 bg-[#D4AF37] text-white rounded-[2rem] shadow-xl hover:scale-110"><Printer size={28} /></button>}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`p-5 bg-gray-900 text-white rounded-[2rem] shadow-xl transition-all duration-700 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}><ChevronDown className="rotate-180" size={28} /></button>
      </div>

      <PrintMenuModal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} menuData={masterMenu} lang={lang} />
      <QRCodeModal isOpen={isQRCodeModalOpen} onClose={() => setIsQRCodeModalOpen(false)} lang={lang} />
      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} lang={lang} />
      <OrderNotepad isOpen={isNotepadOpen} onClose={() => setIsNotepadOpen(false)} items={cartItems} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onClear={clearCart} lang={lang} phoneNumber={PHONE_NUMBER} />

      <footer className="bg-white pt-24 pb-40 border-t border-gray-100 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <img src={CHEF_LOGO} alt="Chef" className="w-20 h-20 object-contain opacity-40 grayscale mx-auto mb-8" />
          <h3 className="text-5xl md:text-7xl text-[#1D3C18] mb-12 font-black italic tracking-tighter">Pizzeria Fenicia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto mb-20">
            <div className="flex flex-col items-center gap-4"><div className="p-4 bg-[#E74C3C]/10 rounded-full text-[#E74C3C]"><MapPin size={28} /></div><p className="text-gray-900 font-black text-lg">{t.location}</p></div>
            <div className="flex flex-col items-center gap-4"><div className="p-4 bg-[#27AE60]/10 rounded-full text-[#27AE60]"><Clock size={28} /></div><p className="text-gray-900 font-black text-lg">12h-15h | 19h-22h</p></div>
          </div>
          <button onClick={() => isAdmin ? handleLogout() : setIsLoginModalOpen(true)} className="text-[9px] text-gray-300 hover:text-[#FF5733] transition-all uppercase tracking-[0.5em] font-black border border-gray-100 px-6 py-3 rounded-full">{isAdmin ? t.closePanel : t.restrictedAccess}</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
