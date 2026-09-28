import { Coffee, ArrowRight, Sparkles, Sliders, ShieldCheck, Flame } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onBuildDrink: () => void;
}

export function Hero({ onOrderNow, onBuildDrink }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EEE4] to-[#FAF7F2] py-12 sm:py-20 border-b border-[#EBE3D5]">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6D5C3]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C89D7C]/15 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EBE3D5] text-xs font-semibold text-[#8C6D58] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9E6747]" />
              <span>Single-Origin Specialty Harvest · 2026 Batch</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#241711] leading-[1.08] text-balance">
              Craft Your <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#4A2F22]">Perfect Cup</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B5E55] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the art of specialty coffee. From hand-selected micro-lot beans to our interactive 9-step cup builder and visualizer, personalize every extraction, milk texture, and artisanal flavor note.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#4A2F22] hover:bg-[#342017] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBuildDrink}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#4A2F22] border border-[#EBE3D5] font-semibold text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Sliders className="w-4 h-4 text-[#9E6747]" />
                <span>Build Your Drink</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#EBE3D5]/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#7A6A5E]">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#9E6747]" />
                <span>100% Arabica Specialty Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#9E6747]" />
                <span>Fresh Micro-Batch Roasted</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E6747]" />
                <span>Real-Time Layer Visualizer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#EBE3D5] p-5 shadow-xl overflow-hidden">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4ECE1]">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
                  alt="Artisan Latte Art"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E6D5C3]">
                    Barista Choice
                  </span>
                  <h3 className="font-serif text-lg font-bold">Bourbon Vanilla Oat Latte</h3>
                  <div className="flex items-center justify-between mt-1 text-xs text-white/90">
                    <span>Double Shot · Oat Microfoam · Cinnamon</span>
                    <span className="font-mono font-bold">₹270</span>
                  </div>
                </div>
              </div>

              {/* Live Tasting Specs Card */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5]">
                  <span className="text-[10px] text-[#8C6D58] uppercase font-bold block">Roast</span>
                  <span className="text-xs font-semibold text-[#241711] mt-0.5 block">Medium Dark</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5]">
                  <span className="text-[10px] text-[#8C6D58] uppercase font-bold block">Elevation</span>
                  <span className="text-xs font-semibold text-[#241711] mt-0.5 block">1,850m</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5]">
                  <span className="text-[10px] text-[#8C6D58] uppercase font-bold block">Notes</span>
                  <span className="text-xs font-semibold text-[#241711] mt-0.5 block">Cocoa & Fig</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
