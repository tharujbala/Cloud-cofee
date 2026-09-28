import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Coffee, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

export type ActiveTab = 'home' | 'menu' | 'builder' | 'orders' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'builder', label: 'Build Your Drink' },
    { id: 'orders', label: 'Orders' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE3D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#4A2F22] text-[#FAF7F2] flex items-center justify-center shadow-xs group-hover:bg-[#342017] transition-colors">
            <Coffee className="w-5 h-5 text-[#E6D5C3]" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#241711] block leading-none">
              AURA COFFEE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8C6D58] font-semibold block mt-1">
              Artisan Roastery & Bar
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activeTab === link.id
                  ? 'text-[#4A2F22] font-semibold'
                  : 'text-[#6B5E55] hover:text-[#241711]'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A2F22] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Cart & Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-white border border-[#EBE3D5] text-[#241711] hover:bg-[#F4ECE1] transition-all flex items-center gap-2 shadow-2xs group"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#4A2F22] group-hover:scale-105 transition-transform" />
            <span className="text-xs font-semibold hidden sm:inline text-[#241711]">Cart</span>
            {itemCount > 0 && (
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#4A2F22] text-[#FAF7F2] text-[11px] font-mono font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-[#241711] hover:bg-[#F4ECE1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EBE3D5] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-[#4A2F22] text-white font-semibold'
                  : 'text-[#5C4D44] hover:bg-[#F4ECE1]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
