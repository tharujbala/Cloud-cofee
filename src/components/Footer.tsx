import { Coffee, Heart } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onNavClick: (tab: ActiveTab) => void;
}

export function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#241711] text-[#E6D5C3] pt-16 pb-12 border-t border-[#3D2314] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#3D2314]">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#4A2F22] text-[#FAF7F2] flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#E6D5C3]" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                AURA COFFEE
              </span>
            </div>
            <p className="text-xs text-[#B8A495] leading-relaxed">
              Artisan small-batch roasting and modern coffee crafting. Precision extraction, ethically sourced micro-lots, and custom cup visualization.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#B8A495]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('menu')}
                  className="hover:text-white transition-colors"
                >
                  Drink Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('builder')}
                  className="hover:text-white transition-colors"
                >
                  Custom Cup Builder
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('orders')}
                  className="hover:text-white transition-colors"
                >
                  Order Status & History
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavClick('about')}
                  className="hover:text-white transition-colors"
                >
                  Roastery Story
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Artisanal Roasts
            </h4>
            <ul className="space-y-2 text-xs text-[#B8A495]">
              <li>Espresso & Americano</li>
              <li>Velvety Lattes & Cappuccinos</li>
              <li>Slow 20-Hour Cold Brews</li>
              <li>Single-Estate Ceremonial Matcha</li>
              <li>Belgian Dark Cocoa Mochas</li>
            </ul>
          </div>

          {/* Col 4: Roastery Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Service Hours
            </h4>
            <div className="text-xs text-[#B8A495] space-y-1.5 leading-relaxed">
              <p>Mon – Fri: 6:30 AM – 7:00 PM</p>
              <p>Sat – Sun: 7:30 AM – 8:00 PM</p>
              <p className="text-[11px] text-[#8C6D58] pt-2">
                Mobile order ahead available daily for express in-store bar pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C6D58] gap-4">
          <p>© 2026 Aura Coffee Artisan Roasters. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600 inline" />
            <span>for coffee purists</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
