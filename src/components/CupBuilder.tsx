import { useState } from 'react';
import {
  CupSize,
  MilkType,
  CoffeeStrength,
  SugarLevel,
  SyrupType,
  ToppingType,
  Temperature,
  IceLevel,
  CustomizationOptions,
} from '../types';
import { calculatePrice, formatCurrency } from '../utils/pricing';
import { DrinkVisualizer } from './DrinkVisualizer';
import { useCart } from '../context/CartContext';
import {
  Coffee,
  Check,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sliders,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CupBuilderProps {
  initialCustomization?: Partial<CustomizationOptions>;
  onAddedToCart?: () => void;
}

const DRINK_TYPES = [
  { id: 'Espresso', name: 'Espresso', desc: 'Concentrated rich dark shot', base: '₹180' },
  { id: 'Latte', name: 'Latte', desc: 'Espresso with velvety steamed milk', base: '₹270' },
  { id: 'Cappuccino', name: 'Cappuccino', desc: 'Balanced espresso, milk & thick microfoam', base: '₹250' },
  { id: 'Mocha', name: 'Mocha', desc: 'Espresso blended with Belgian cocoa', base: '₹295' },
  { id: 'Cold Brew', name: 'Cold Brew', desc: '20-hour steeped slow cold extraction', base: '₹240' },
  { id: 'Iced Coffee', name: 'Iced Coffee', desc: 'Chilled espresso over crystal ice', base: '₹220' },
];

const CUP_SIZES: { id: CupSize; name: string; volume: string; add: string }[] = [
  { id: 'Small', name: 'Small', volume: '8 oz', add: 'Base' },
  { id: 'Medium', name: 'Medium', volume: '12 oz', add: '+₹30' },
  { id: 'Large', name: 'Large', volume: '16 oz', add: '+₹60' },
  { id: 'Extra Large', name: 'Extra Large', volume: '20 oz', add: '+₹90' },
];

const MILK_OPTIONS: { id: MilkType; name: string; desc: string; add: string }[] = [
  { id: 'Whole Milk', name: 'Whole Milk', desc: 'Creamy, rich & classic', add: 'Free' },
  { id: 'Skim Milk', name: 'Skim Milk', desc: 'Light & non-fat', add: 'Free' },
  { id: 'Almond Milk', name: 'Almond Milk', desc: 'Nutty & naturally sweet', add: '+₹50' },
  { id: 'Oat Milk', name: 'Oat Milk', desc: 'Silky micro-foam texture', add: '+₹50' },
  { id: 'Soy Milk', name: 'Soy Milk', desc: 'Plant protein richness', add: '+₹50' },
  { id: 'No Milk', name: 'No Milk', desc: 'Pure black coffee extraction', add: 'Free' },
];

const STRENGTH_OPTIONS: { id: CoffeeStrength; name: string; desc: string; add: string }[] = [
  { id: 'Light', name: 'Light', desc: 'Single shot, gentle and smooth', add: 'Free' },
  { id: 'Regular', name: 'Regular', desc: 'Double standard extraction', add: 'Free' },
  { id: 'Strong', name: 'Strong', desc: 'Triple shot with intensified body', add: '+₹40' },
  { id: 'Extra Strong', name: 'Extra Strong', desc: 'Quad shot for maximum caffeine boost', add: '+₹80' },
];

const SUGAR_OPTIONS: { id: SugarLevel; name: string; desc: string }[] = [
  { id: 'No Sugar', name: 'No Sugar', desc: 'Pure bean flavor profile (0g)' },
  { id: 'Low', name: 'Low', desc: 'A subtle hint of raw cane sweetness (4g)' },
  { id: 'Normal', name: 'Normal', desc: 'Balanced coffee shop standard (8g)' },
  { id: 'Extra', name: 'Extra', desc: 'Sweet indulgent coffee experience (14g)' },
];

const SYRUP_OPTIONS: { id: SyrupType; name: string; add: string }[] = [
  { id: 'None', name: 'None', add: 'Free' },
  { id: 'Vanilla', name: 'Madagascar Vanilla', add: '+₹35' },
  { id: 'Caramel', name: 'Buttery Salted Caramel', add: '+₹35' },
  { id: 'Hazelnut', name: 'Roasted Hazelnut', add: '+₹35' },
  { id: 'Chocolate', name: 'Belgian Cocoa Ganache', add: '+₹35' },
];

const TOPPING_OPTIONS: { id: ToppingType; name: string; add: string }[] = [
  { id: 'Whipped Cream', name: 'Handcrafted Whipped Cream', add: '+₹30' },
  { id: 'Chocolate Powder', name: 'Dusted Dark Chocolate Powder', add: '+₹30' },
  { id: 'Caramel Drizzle', name: 'Golden Salted Caramel Drizzle', add: '+₹30' },
  { id: 'Cinnamon', name: 'Ceylon Cinnamon Dust', add: '+₹30' },
  { id: 'Coffee Beans', name: 'Whole Roasted Arabica Beans', add: '+₹30' },
];

const TEMPERATURE_OPTIONS: { id: Temperature; name: string; desc: string }[] = [
  { id: 'Hot', name: 'Hot (165°F)', desc: 'Optimal serving temperature for milk sweetness' },
  { id: 'Warm', name: 'Warm (145°F)', desc: 'Kid and quick-sipping friendly temperature' },
  { id: 'Cold', name: 'Cold', desc: 'Chilled refreshing extraction over ice' },
  { id: 'Extra Cold', name: 'Extra Cold', desc: 'Sub-zero frost brew with extra ice flakes' },
];

const ICE_OPTIONS: { id: IceLevel; name: string; desc: string }[] = [
  { id: 'No Ice', name: 'No Ice', desc: 'Maximized liquid beverage volume' },
  { id: 'Light Ice', name: 'Light Ice', desc: 'Gentle chill without early dilution' },
  { id: 'Normal Ice', name: 'Normal Ice', desc: 'Classic coffeehouse cooling ratio' },
  { id: 'Extra Ice', name: 'Extra Ice', desc: 'Crisp glacial mountain frost' },
];

const STEP_TITLES = [
  'Drink Type',
  'Cup Size',
  'Milk Option',
  'Coffee Strength',
  'Sugar Level',
  'Flavor Syrup',
  'Toppings',
  'Temperature',
  'Ice Level',
];

export function CupBuilder({ initialCustomization, onAddedToCart }: CupBuilderProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [viewAllSteps, setViewAllSteps] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [customization, setCustomization] = useState<CustomizationOptions>({
    drinkType: initialCustomization?.drinkType || 'Latte',
    size: initialCustomization?.size || 'Medium',
    milk: initialCustomization?.milk || 'Whole Milk',
    strength: initialCustomization?.strength || 'Regular',
    sugar: initialCustomization?.sugar || 'Normal',
    syrup: initialCustomization?.syrup || 'None',
    toppings: initialCustomization?.toppings || [],
    temperature: initialCustomization?.temperature || 'Hot',
    iceLevel: initialCustomization?.iceLevel || 'No Ice',
  });

  const priceBreakdown = calculatePrice(customization.drinkType, customization);

  const handleToppingToggle = (topping: ToppingType) => {
    setCustomization((prev) => {
      const exists = prev.toppings.includes(topping);
      const newToppings = exists
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping];
      return { ...prev, toppings: newToppings };
    });
  };

  const applyPreset = (presetName: string) => {
    if (presetName === 'signature-oat') {
      setCustomization({
        drinkType: 'Latte',
        size: 'Large',
        milk: 'Oat Milk',
        strength: 'Strong',
        sugar: 'Low',
        syrup: 'Vanilla',
        toppings: ['Cinnamon'],
        temperature: 'Hot',
        iceLevel: 'No Ice',
      });
    } else if (presetName === 'iced-caramel-cloud') {
      setCustomization({
        drinkType: 'Iced Coffee',
        size: 'Large',
        milk: 'Whole Milk',
        strength: 'Regular',
        sugar: 'Normal',
        syrup: 'Caramel',
        toppings: ['Whipped Cream', 'Caramel Drizzle'],
        temperature: 'Cold',
        iceLevel: 'Normal Ice',
      });
    } else if (presetName === 'pure-espresso') {
      setCustomization({
        drinkType: 'Espresso',
        size: 'Small',
        milk: 'No Milk',
        strength: 'Extra Strong',
        sugar: 'No Sugar',
        syrup: 'None',
        toppings: [],
        temperature: 'Hot',
        iceLevel: 'No Ice',
      });
    }
  };

  const handleAddToCart = () => {
    addItem({
      drinkId: `custom-${customization.drinkType.toLowerCase()}`,
      name: `Custom ${customization.drinkType}`,
      category: 'Custom Drinks',
      image:
        customization.temperature === 'Cold' || customization.temperature === 'Extra Cold'
          ? 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
      size: customization.size,
      customization,
      unitPrice: priceBreakdown.finalPrice,
      quantity,
    });

    setIsCartOpen(true);
    if (onAddedToCart) onAddedToCart();
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Presets & View Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl border border-[#EBE3D5] shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#9E6747]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">
            Quick Presets:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyPreset('signature-oat')}
              className="text-xs px-2.5 py-1 rounded bg-[#F4ECE1] text-[#4A2F22] hover:bg-[#EBE0D2] font-medium transition-colors"
            >
              Bourbon Oat Latte
            </button>
            <button
              type="button"
              onClick={() => applyPreset('iced-caramel-cloud')}
              className="text-xs px-2.5 py-1 rounded bg-[#F4ECE1] text-[#4A2F22] hover:bg-[#EBE0D2] font-medium transition-colors"
            >
              Iced Caramel Cloud
            </button>
            <button
              type="button"
              onClick={() => applyPreset('pure-espresso')}
              className="text-xs px-2.5 py-1 rounded bg-[#F4ECE1] text-[#4A2F22] hover:bg-[#EBE0D2] font-medium transition-colors"
            >
              Purist Quad Espresso
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewAllSteps(!viewAllSteps)}
            className="flex items-center gap-1.5 text-xs font-medium text-[#4A2F22] hover:text-[#241711] px-3 py-1.5 rounded-lg border border-[#EBE3D5] hover:bg-[#FAF7F2] transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-[#9E6747]" />
            <span>{viewAllSteps ? 'Show Step-by-Step' : 'Show All Steps'}</span>
          </button>
          <button
            type="button"
            onClick={() =>
              setCustomization({
                drinkType: 'Latte',
                size: 'Medium',
                milk: 'Whole Milk',
                strength: 'Regular',
                sugar: 'Normal',
                syrup: 'None',
                toppings: [],
                temperature: 'Hot',
                iceLevel: 'No Ice',
              })
            }
            className="flex items-center gap-1 text-xs text-[#8C6D58] hover:text-[#241711] px-2 py-1.5 transition-colors"
            title="Reset options"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Builder Options (Left) and Live Visualizer & Price (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: The Steps Configuration */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EBE3D5] p-6 shadow-sm">
          {/* Step Indicator (Only in Guided Mode) */}
          {!viewAllSteps && (
            <div className="mb-6 pb-4 border-b border-[#F4ECE1]">
              <div className="flex items-center justify-between text-xs text-[#8C6D58] font-medium mb-2">
                <span>
                  STEP {currentStep} OF {STEP_TITLES.length}
                </span>
                <span className="font-semibold text-[#241711]">
                  {STEP_TITLES[currentStep - 1]}
                </span>
              </div>
              <div className="w-full bg-[#F4ECE1] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#4A2F22] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / STEP_TITLES.length) * 100}%` }}
                />
              </div>

              {/* Step Navigation Dots */}
              <div className="flex items-center justify-between mt-3 px-1">
                {STEP_TITLES.map((title, idx) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setCurrentStep(idx + 1)}
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition-colors ${
                      currentStep === idx + 1
                        ? 'bg-[#4A2F22] text-white'
                        : currentStep > idx + 1
                        ? 'text-[#4A2F22] hover:bg-[#F4ECE1]'
                        : 'text-[#B8A495] hover:text-[#241711]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: DRINK TYPE */}
          {(viewAllSteps || currentStep === 1) && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[#241711] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  Select Drink Foundation
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DRINK_TYPES.map((dt) => (
                  <button
                    key={dt.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, drinkType: dt.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      customization.drinkType === dt.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#241711]">{dt.name}</span>
                      {customization.drinkType === dt.id && (
                        <Check className="w-4 h-4 text-[#4A2F22]" />
                      )}
                    </div>
                    <p className="text-xs text-[#7A6A5E] mt-1 leading-snug line-clamp-1">{dt.desc}</p>
                    <span className="text-xs font-mono font-medium text-[#9E6747] mt-2 block">
                      {dt.base}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CUP SIZE */}
          {(viewAllSteps || currentStep === 2) && (
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#241711] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                  2
                </span>
                Select Cup Size
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CUP_SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, size: sz.id })}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      customization.size === sz.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#241711] block">{sz.name}</span>
                    <span className="text-xs text-[#7A6A5E] block mt-0.5">{sz.volume}</span>
                    <span className="text-xs font-mono font-medium text-[#9E6747] mt-1.5 block">
                      {sz.add}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: MILK SELECTION */}
          {(viewAllSteps || currentStep === 3) && (
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#241711] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                  3
                </span>
                Select Milk Type
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MILK_OPTIONS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, milk: m.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      customization.milk === m.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#241711]">{m.name}</span>
                      <span className="text-[11px] font-mono font-medium text-[#9E6747]">
                        {m.add}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A6A5E] mt-1 leading-tight">{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: COFFEE STRENGTH */}
          {(viewAllSteps || currentStep === 4) && (
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#241711] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                  4
                </span>
                Select Coffee Strength
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {STRENGTH_OPTIONS.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, strength: st.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      customization.strength === st.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#241711]">{st.name}</span>
                      <span className="text-[11px] font-mono font-medium text-[#9E6747]">
                        {st.add}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A6A5E] mt-1 leading-tight">{st.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: SUGAR LEVEL */}
          {(viewAllSteps || currentStep === 5) && (
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#241711] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                  5
                </span>
                Select Sweetness / Sugar Level
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SUGAR_OPTIONS.map((sg) => (
                  <button
                    key={sg.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, sugar: sg.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      customization.sugar === sg.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#241711] block">{sg.name}</span>
                    <p className="text-[11px] text-[#7A6A5E] mt-1 leading-tight">{sg.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: SYRUP */}
          {(viewAllSteps || currentStep === 6) && (
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#241711] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                  6
                </span>
                Select Artisanal Syrup
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SYRUP_OPTIONS.map((syr) => (
                  <button
                    key={syr.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, syrup: syr.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      customization.syrup === syr.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#241711]">{syr.name}</span>
                      <span className="text-[11px] font-mono font-medium text-[#9E6747]">
                        {syr.add}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: TOPPINGS */}
          {(viewAllSteps || currentStep === 7) && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[#241711] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                    7
                  </span>
                  Select Toppings (Multi-Select)
                </h3>
                <span className="text-xs text-[#8C6D58]">+₹30 each</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOPPING_OPTIONS.map((top) => {
                  const isChecked = customization.toppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => handleToppingToggle(top.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                          : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#4A2F22] border-[#4A2F22] text-white'
                              : 'border-[#B8A495]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-semibold text-[#241711]">{top.name}</span>
                      </div>
                      <span className="text-xs font-mono font-medium text-[#9E6747]">
                        {top.add}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: TEMPERATURE */}
          {(viewAllSteps || currentStep === 8) && (
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#241711] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                  8
                </span>
                Select Temperature
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TEMPERATURE_OPTIONS.map((tmp) => (
                  <button
                    key={tmp.id}
                    type="button"
                    onClick={() => {
                      const willBeCold = tmp.id === 'Cold' || tmp.id === 'Extra Cold';
                      setCustomization({
                        ...customization,
                        temperature: tmp.id,
                        iceLevel: willBeCold
                          ? customization.iceLevel === 'No Ice'
                            ? 'Normal Ice'
                            : customization.iceLevel
                          : 'No Ice',
                      });
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      customization.temperature === tmp.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#241711] block">{tmp.name}</span>
                    <p className="text-[11px] text-[#7A6A5E] mt-1 leading-tight">{tmp.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: ICE LEVEL */}
          {(viewAllSteps || currentStep === 9) && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[#241711] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4A2F22] text-white text-xs flex items-center justify-center font-mono">
                    9
                  </span>
                  Select Ice Level (Cold Brew & Iced Drinks)
                </h3>
                {customization.temperature !== 'Cold' && customization.temperature !== 'Extra Cold' && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Drink is set to {customization.temperature}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ICE_OPTIONS.map((ice) => (
                  <button
                    key={ice.id}
                    type="button"
                    onClick={() => setCustomization({ ...customization, iceLevel: ice.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      customization.iceLevel === ice.id
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#241711] block">{ice.name}</span>
                    <p className="text-[11px] text-[#7A6A5E] mt-1 leading-tight">{ice.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step Navigation Controls (Guided Mode Only) */}
          {!viewAllSteps && (
            <div className="flex items-center justify-between pt-6 border-t border-[#F4ECE1]">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#4A2F22] border border-[#EBE3D5] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Step
              </button>

              {currentStep < STEP_TITLES.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(STEP_TITLES.length, prev + 1))}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#4A2F22] text-white hover:bg-[#342017] flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  Next: {STEP_TITLES[currentStep]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  Ready to Craft!
                </span>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive Drink Visualizer & Dynamic Price Breakdown */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Real-time Drink Visualizer */}
          <DrinkVisualizer
            customization={customization}
            drinkName={`Artisan ${customization.drinkType}`}
          />

          {/* Dynamic Price Calculation Card */}
          <div className="bg-white rounded-2xl border border-[#EBE3D5] p-6 shadow-sm">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C6D58] mb-3">
              Price Calculation Breakdown
            </h4>

            <div className="space-y-2 text-xs divide-y divide-[#F4ECE1]">
              <div className="flex justify-between py-1 text-[#4A2F22]">
                <span>Base ({customization.drinkType})</span>
                <span className="font-mono">{formatCurrency(priceBreakdown.basePrice)}</span>
              </div>

              {priceBreakdown.sizeCost > 0 && (
                <div className="flex justify-between py-1 text-[#6B5E55]">
                  <span>Cup Size ({customization.size})</span>
                  <span className="font-mono">+{formatCurrency(priceBreakdown.sizeCost)}</span>
                </div>
              )}

              {priceBreakdown.milkCost > 0 && (
                <div className="flex justify-between py-1 text-[#6B5E55]">
                  <span>Alternative Milk ({customization.milk})</span>
                  <span className="font-mono">+{formatCurrency(priceBreakdown.milkCost)}</span>
                </div>
              )}

              {priceBreakdown.strengthCost > 0 && (
                <div className="flex justify-between py-1 text-[#6B5E55]">
                  <span>Extra Shots ({customization.strength})</span>
                  <span className="font-mono">+{formatCurrency(priceBreakdown.strengthCost)}</span>
                </div>
              )}

              {priceBreakdown.syrupCost > 0 && (
                <div className="flex justify-between py-1 text-[#6B5E55]">
                  <span>Syrup Infusion ({customization.syrup})</span>
                  <span className="font-mono">+{formatCurrency(priceBreakdown.syrupCost)}</span>
                </div>
              )}

              {priceBreakdown.toppingsCost > 0 && (
                <div className="flex justify-between py-1 text-[#6B5E55]">
                  <span>Toppings ({customization.toppings.length} selected)</span>
                  <span className="font-mono">+{formatCurrency(priceBreakdown.toppingsCost)}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 font-bold text-sm text-[#241711]">
                <span>Unit Price</span>
                <span className="font-mono text-base text-[#4A2F22]">
                  {formatCurrency(priceBreakdown.finalPrice)}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-5 pt-4 border-t border-[#F4ECE1] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#241711]">Quantity</span>
                <div className="flex items-center border border-[#EBE3D5] rounded-lg overflow-hidden bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#4A2F22] hover:bg-[#EFE8DD] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-semibold text-[#241711]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#4A2F22] hover:bg-[#EFE8DD] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3 px-4 rounded-xl bg-[#4A2F22] hover:bg-[#382318] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add to Cart • {formatCurrency(priceBreakdown.finalPrice * quantity)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
