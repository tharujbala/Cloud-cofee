import { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { DrinkCard } from './components/DrinkCard';
import { DrinkGrid } from './components/DrinkGrid';
import { CupBuilder } from './components/CupBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistory } from './components/OrderHistory';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { DRINKS_DATA } from './data/drinks';
import { Drink, CustomizationOptions, Order } from './types';
import { ArrowRight, Sliders, Sparkles, Star, Award, Coffee } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [builderCustomization, setBuilderCustomization] = useState<CustomizationOptions | undefined>(undefined);

  const handleCustomizeDrink = (drink: Drink) => {
    setBuilderCustomization(drink.defaultCustomization);
    setActiveTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (_order: Order) => {
    setActiveTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Curated collections for the home page
  const popularDrinks = DRINKS_DATA.filter((d) => d.popular).slice(0, 3);
  const recommendedDrinks = DRINKS_DATA.filter((d) => d.recommended).slice(0, 3);
  const customerFavorites = DRINKS_DATA.filter((d) => d.favorite).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241711]">
      {/* Top Bar Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Router View */}
      <main className="flex-1">
        {/* 1. HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-16 sm:space-y-24">
            {/* Hero Section */}
            <Hero
              onOrderNow={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBuildDrink={() => {
                setBuilderCustomization(undefined);
                setActiveTab('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Popular Drinks Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8C6D58]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E6747]" />
                    <span>Trending at Our Bar</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241711] mt-1">
                    Popular Drinks
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#4A2F22] hover:text-[#241711] flex items-center gap-1 transition-colors group"
                >
                  <span>View All 16 Specialty Drinks</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {popularDrinks.map((drink) => (
                  <DrinkCard key={drink.id} drink={drink} onCustomize={handleCustomizeDrink} />
                ))}
              </div>
            </section>

            {/* Interactive Drink Visualizer Spotlight Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#3D2314] via-[#4A2F22] to-[#2B170D] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl text-center lg:text-left">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#D8B168]">
                    Interactive Fluid Visualizer
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                    Watch Your Drink Form in Real-Time Layers
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E6D5C3] leading-relaxed">
                    Adjust milk density, choose plant alternatives, switch between 4 perspectives (Front, 3D Angle, Top Crema Art, and Layer Blueprints), and see dynamic prices update instantly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBuilderCustomization(undefined);
                        setActiveTab('builder');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-xl bg-[#FAF7F2] text-[#4A2F22] hover:bg-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 mx-auto lg:mx-0"
                    >
                      <Sliders className="w-4 h-4 text-[#9E6747]" />
                      <span>Launch Cup Builder</span>
                    </button>
                  </div>
                </div>

                {/* Decorative Visual Illustration */}
                <div className="w-full max-w-xs bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 text-center space-y-3">
                  <div className="w-16 h-28 mx-auto rounded-b-2xl rounded-t-sm border-2 border-white/60 p-1 flex flex-col justify-end overflow-hidden shadow-inner">
                    <div className="w-full h-4 bg-white/90 rounded-t-sm" />
                    <div className="w-full h-10 bg-amber-100/70" />
                    <div className="w-full h-12 bg-[#2E190E]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#E6D5C3] block">
                    Espresso · Steamed Oat · Microfoam
                  </span>
                </div>
              </div>
            </section>

            {/* Recommended Drinks Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8C6D58]">
                  <Award className="w-3.5 h-3.5 text-[#9E6747]" />
                  <span>Head Roaster's Selection</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241711] mt-1">
                  Recommended Drinks
                </h2>
                <p className="text-xs text-[#7A6A5E] mt-1">
                  Meticulously extracted to showcase subtle terroir, chocolate ganache, and natural honey notes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {recommendedDrinks.map((drink) => (
                  <DrinkCard key={drink.id} drink={drink} onCustomize={handleCustomizeDrink} />
                ))}
              </div>
            </section>

            {/* Customer Favorites Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8C6D58]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Community Loved</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241711] mt-1">
                  Customer Favorites
                </h2>
                <p className="text-xs text-[#7A6A5E] mt-1">
                  Most repeatedly ordered beverages across our San Francisco tasting bars.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {customerFavorites.map((drink) => (
                  <DrinkCard key={drink.id} drink={drink} onCustomize={handleCustomizeDrink} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. MENU TAB */}
        {activeTab === 'menu' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6D58]">
                Craft Menu
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241711]">
                Specialty Coffee & Cold Brews
              </h1>
              <p className="text-xs sm:text-sm text-[#6B5E55]">
                Filter by roast category, search specific flavor profiles, or sort by pricing and customer ratings.
              </p>
            </div>

            <DrinkGrid drinks={DRINKS_DATA} onCustomize={handleCustomizeDrink} />
          </div>
        )}

        {/* 3. BUILD YOUR DRINK TAB */}
        {activeTab === 'builder' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6D58]">
                Artisanal Studio
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#241711]">
                Custom Cup Builder
              </h1>
              <p className="text-xs sm:text-sm text-[#6B5E55]">
                Step-by-step beverage architecture. Configure coffee strength, dairy/plant milk ratios, ice densities, gourmet syrups, and handcrafted toppings.
              </p>
            </div>

            <CupBuilder
              initialCustomization={builderCustomization}
              onAddedToCart={() => {
                // Keep builder intact so user can craft another or checkout
              }}
            />
          </div>
        )}

        {/* 4. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <OrderHistory
              onStartOrder={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 5. ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Shopping Cart Slide-out Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Checkout Screen Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Non-intrusive Toast Notifications */}
      <ToastContainer />

      {/* Minimal Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </CartProvider>
    </ToastProvider>
  );
}
