import { useState } from 'react';
import { Drink } from '../types';
import { formatCurrency } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Sliders, Coffee } from 'lucide-react';

interface DrinkCardProps {
  drink: Drink;
  onCustomize: (drink: Drink) => void;
}

export function DrinkCard({ drink, onCustomize }: DrinkCardProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = () => {
    setIsAdding(true);
    addItem({
      drinkId: drink.id,
      name: drink.name,
      category: drink.category,
      image: drink.image,
      size: drink.defaultCustomization.size,
      customization: drink.defaultCustomization,
      unitPrice: drink.price,
      quantity: 1,
    });

    setTimeout(() => {
      setIsAdding(false);
      setIsCartOpen(true);
    }, 250);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EBE3D5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Drink Image / Resilient Fallback */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4ECE1]">
          {!imgError ? (
            <img
              src={drink.image}
              alt={drink.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#EAE0D3] p-4 text-center">
              <Coffee className="w-10 h-10 text-[#8C6D58] mb-2" />
              <span className="text-xs font-serif font-bold text-[#3D2314]">{drink.name}</span>
            </div>
          )}

          {/* Calorie & Category minimal text tag overlay */}
          <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-[#4A2F22] border border-[#EBE3D5]">
            {drink.category}
          </div>

          <div className="absolute top-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2 py-1 rounded text-[11px] font-mono text-[#5A453A] border border-[#EBE3D5]">
            {drink.calories} kcal
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Rating & Reviews - Clean metadata without pill boxes */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A6A5E] mb-2">
            <span className="flex items-center gap-1 font-semibold text-[#241711]">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {drink.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{drink.reviewsCount} reviews</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#241711] group-hover:text-[#4A2F22] transition-colors leading-tight">
            {drink.name}
          </h3>

          <p className="text-xs text-[#6B5E55] mt-1.5 line-clamp-2 leading-relaxed">
            {drink.description}
          </p>

          {/* Key ingredients preview */}
          <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-[#8C6D58]">
            {drink.ingredients.slice(0, 3).map((ing, idx) => (
              <span key={ing}>
                {ing}
                {idx < Math.min(2, drink.ingredients.length - 1) && <span className="ml-1 text-[#C8B8A6]">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 mt-2 flex items-center justify-between gap-2 border-t border-[#F7F3ED]">
        <div className="py-2">
          <span className="text-[11px] text-[#8C6D58] block uppercase tracking-wider font-semibold">
            From
          </span>
          <span className="font-mono text-base font-bold text-[#241711]">
            {formatCurrency(drink.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCustomize(drink)}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-[#4A2F22] hover:bg-[#F4ECE1] border border-[#EBE3D5] flex items-center gap-1.5 transition-colors"
            title="Customize ingredients & size"
          >
            <Sliders className="w-3.5 h-3.5 text-[#9E6747]" />
            <span>Customize</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#4A2F22] hover:bg-[#342017] text-white flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            title="Quick add default to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
