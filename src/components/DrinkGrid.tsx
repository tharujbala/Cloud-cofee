import { useState, useMemo } from 'react';
import { Drink, DrinkCategory } from '../types';
import { DrinkCard } from './DrinkCard';
import { Search, ArrowUpDown, Coffee } from 'lucide-react';

interface DrinkGridProps {
  drinks: Drink[];
  onCustomize: (drink: Drink) => void;
  defaultCategory?: DrinkCategory;
}

const CATEGORIES: DrinkCategory[] = [
  'All',
  'Espresso',
  'Americano',
  'Cappuccino',
  'Latte',
  'Mocha',
  'Cold Coffee',
  'Iced Latte',
  'Cold Brew',
  'Tea',
  'Special Drinks',
];

export function DrinkGrid({ drinks, onCustomize, defaultCategory = 'All' }: DrinkGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');

  const filteredDrinks = useMemo(() => {
    let result = [...drinks];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((d) => d.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Popularity default
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [drinks, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full">
      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C6D58] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drinks, beans, ingredients..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EBE3D5] text-xs sm:text-sm text-[#241711] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#4A2F22] focus:border-transparent transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C6D58] hover:text-[#241711]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-[#8C6D58]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium bg-white border border-[#EBE3D5] text-[#241711] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A2F22] shadow-xs cursor-pointer"
          >
            <option value="popularity">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Pills/Buttons Scrollable Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 pt-1 mb-8 no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#4A2F22] text-white shadow-xs'
                : 'bg-white text-[#6B5E55] hover:text-[#241711] border border-[#EBE3D5] hover:bg-[#FAF7F2]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-[#7A6A5E] mb-6 pb-2 border-b border-[#EFE8DD]">
        <span>
          Showing <strong className="text-[#241711] font-mono">{filteredDrinks.length}</strong> {filteredDrinks.length === 1 ? 'drink' : 'drinks'} in{' '}
          <strong className="text-[#241711]">{selectedCategory}</strong>
        </span>
      </div>

      {/* Drink Cards Grid */}
      {filteredDrinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDrinks.map((drink) => (
            <DrinkCard key={drink.id} drink={drink} onCustomize={onCustomize} />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#EBE3D5] shadow-xs max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#F4ECE1] text-[#4A2F22] flex items-center justify-center mx-auto mb-3">
            <Coffee className="w-6 h-6" />
          </div>
          <h4 className="text-base font-serif font-bold text-[#241711]">No drinks match your search</h4>
          <p className="text-xs text-[#7A6A5E] mt-1 max-w-xs mx-auto">
            Try searching for another brew term, clearing your category filter, or customize your own cup.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#4A2F22] text-white text-xs font-semibold hover:bg-[#342017] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
