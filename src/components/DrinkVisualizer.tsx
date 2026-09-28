import { useState } from 'react';
import { CustomizationOptions } from '../types';
import { Layers, RotateCcw, Eye, Sparkles, Thermometer, Flame, Snowflake, Coffee } from 'lucide-react';

interface DrinkVisualizerProps {
  customization: CustomizationOptions;
  drinkName?: string;
  className?: string;
}

export function DrinkVisualizer({
  customization,
  drinkName = 'Custom Coffee',
  className = '',
}: DrinkVisualizerProps) {
  const [viewMode, setViewMode] = useState<'front' | 'angled' | 'top' | 'layers'>('front');

  const {
    drinkType,
    size,
    milk,
    strength,
    sugar,
    syrup,
    toppings,
    temperature,
    iceLevel,
  } = customization;

  const isCold = temperature === 'Cold' || temperature === 'Extra Cold';
  const hasIce = isCold && iceLevel !== 'No Ice';
  const hasMilk = milk !== 'No Milk' && !['Espresso', 'Americano'].includes(drinkType);
  const hasWhippedCream = toppings.includes('Whipped Cream');
  const hasCaramelDrizzle = toppings.includes('Caramel Drizzle');
  const hasChocolatePowder = toppings.includes('Chocolate Powder');
  const hasCinnamon = toppings.includes('Cinnamon');
  const hasCoffeeBeans = toppings.includes('Coffee Beans');
  const hasSyrup = syrup !== 'None';

  // Cup proportions based on size
  const cupHeights: Record<string, string> = {
    Small: 'h-64 max-w-[210px]',
    Medium: 'h-72 max-w-[230px]',
    Large: 'h-80 max-w-[250px]',
    'Extra Large': 'h-92 max-w-[270px]',
  };

  // Coffee tone based on strength
  const coffeeTone: Record<string, string> = {
    Light: '#6B442A',
    Regular: '#432616',
    Strong: '#2E190E',
    'Extra Strong': '#1E0E06',
  };

  // Milk tone based on type
  const milkTone: Record<string, string> = {
    'Whole Milk': '#FBF8F3',
    'Skim Milk': '#F4EFEB',
    'Almond Milk': '#EFE4D6',
    'Oat Milk': '#E9DCB8',
    'Soy Milk': '#F2E8DC',
    'No Milk': 'transparent',
  };

  // Syrup colors
  const syrupTone: Record<string, string> = {
    Vanilla: '#D8B168',
    Caramel: '#B86F2D',
    Hazelnut: '#8E5123',
    Chocolate: '#3B1F14',
    None: 'transparent',
  };

  // Layer heights percentage calculation
  let coffeePercent = 35;
  let milkPercent = 45;
  let foamPercent = 20;

  if (drinkType === 'Espresso') {
    coffeePercent = 75;
    milkPercent = 0;
    foamPercent = 25; // Crema
  } else if (drinkType === 'Americano') {
    coffeePercent = 50;
    milkPercent = 0;
    foamPercent = 10;
  } else if (drinkType === 'Cappuccino') {
    coffeePercent = 33;
    milkPercent = 33;
    foamPercent = 34;
  } else if (drinkType === 'Latte' || drinkType === 'Iced Latte') {
    coffeePercent = 25;
    milkPercent = 60;
    foamPercent = 15;
  } else if (drinkType === 'Mocha') {
    coffeePercent = 30;
    milkPercent = 45;
    foamPercent = 25;
  } else if (drinkType === 'Cold Brew') {
    coffeePercent = 85;
    milkPercent = hasMilk ? 15 : 0;
    foamPercent = 0;
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-[#EBE3D5] p-5 shadow-sm transition-all flex flex-col justify-between ${className}`}
    >
      {/* Visualizer Header with View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F4ECE1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6D58]">
              Interactive Cup Preview
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#F4ECE1] text-[#4A2F22]">
              {size} ({size === 'Small' ? '8oz' : size === 'Medium' ? '12oz' : size === 'Large' ? '16oz' : '20oz'})
            </span>
          </div>
          <h3 className="text-lg font-serif font-bold text-[#241711] tracking-tight mt-0.5">
            {drinkName}
          </h3>
        </div>

        {/* View switcher tabs */}
        <div className="flex items-center p-1 bg-[#F7F3ED] rounded-lg border border-[#EBE3D5]/80 text-xs font-medium">
          <button
            type="button"
            onClick={() => setViewMode('front')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'front'
                ? 'bg-white text-[#241711] shadow-xs font-semibold'
                : 'text-[#6B5E55] hover:text-[#241711]'
            }`}
            title="Front Layer View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Front</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('angled')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'angled'
                ? 'bg-white text-[#241711] shadow-xs font-semibold'
                : 'text-[#6B5E55] hover:text-[#241711]'
            }`}
            title="3D Angled Perspective"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>3D Angle</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('top')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'top'
                ? 'bg-white text-[#241711] shadow-xs font-semibold'
                : 'text-[#6B5E55] hover:text-[#241711]'
            }`}
            title="Top Crema & Foam Art"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Art</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('layers')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'layers'
                ? 'bg-white text-[#241711] shadow-xs font-semibold'
                : 'text-[#6B5E55] hover:text-[#241711]'
            }`}
            title="Layer Blueprint Specs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Layers</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 min-h-[340px] flex items-center justify-center p-6 bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE1]/60 rounded-xl my-4 overflow-hidden border border-[#EFE8DD]">
        {/* Steam Animation for Hot/Warm */}
        {!isCold && viewMode !== 'top' && (
          <div className="absolute top-4 flex items-center justify-center gap-3 z-20 pointer-events-none">
            <div className="w-1.5 h-12 bg-gradient-to-t from-white/70 to-transparent rounded-full blur-[2px] animate-steam-1" />
            <div className="w-2 h-16 bg-gradient-to-t from-white/80 to-transparent rounded-full blur-[2px] animate-steam-2" />
            <div className="w-1.5 h-12 bg-gradient-to-t from-white/70 to-transparent rounded-full blur-[2px] animate-steam-3" />
          </div>
        )}

        {/* View Mode: FRONT & ANGLED */}
        {(viewMode === 'front' || viewMode === 'angled') && (
          <div
            className={`relative flex flex-col items-center justify-end transition-all duration-300 w-full ${
              viewMode === 'angled' ? 'rotate-[-3deg] skew-y-1' : ''
            }`}
          >
            {/* Temperature Badge */}
            <div className="absolute -top-3 left-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur shadow-xs border border-[#EBE3D5]">
              {isCold ? (
                <>
                  <Snowflake className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="text-cyan-800 font-medium">{temperature}</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-amber-800 font-medium">{temperature}</span>
                </>
              )}
            </div>

            {/* Whipped Cream Cap if selected */}
            {hasWhippedCream && (
              <div className="relative z-20 w-44 h-14 -mb-3 flex items-center justify-center">
                <div className="w-40 h-14 bg-gradient-to-b from-white via-[#FCFBF8] to-[#F7F2E7] rounded-t-full shadow-md border-t border-white flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ffffff_15%,transparent_60%)]" />
                  {/* Caramel Drizzle over cream */}
                  {hasCaramelDrizzle && (
                    <div className="absolute inset-x-2 top-2 h-6 flex justify-around">
                      <div className="w-1.5 h-8 bg-amber-600 rounded-full rotate-45 opacity-85 shadow-xs" />
                      <div className="w-1.5 h-8 bg-amber-600 rounded-full -rotate-45 opacity-85 shadow-xs" />
                      <div className="w-1.5 h-8 bg-amber-600 rounded-full rotate-25 opacity-85 shadow-xs" />
                    </div>
                  )}
                  {/* Chocolate Powder dust */}
                  {hasChocolatePowder && (
                    <div className="absolute inset-0 bg-[radial-gradient(#3B1F14_1px,transparent_1px)] [background-size:6px_6px] opacity-40" />
                  )}
                  {/* Cinnamon dust */}
                  {hasCinnamon && (
                    <div className="absolute inset-0 bg-[radial-gradient(#8E4A23_1px,transparent_1px)] [background-size:5px_5px] opacity-45" />
                  )}
                </div>
              </div>
            )}

            {/* The Glass Coffee Cup */}
            <div
              className={`relative w-full ${cupHeights[size] || 'h-72 max-w-[240px]'} transition-all duration-300 rounded-b-[40px] rounded-t-[10px] p-2 bg-gradient-to-r from-white/50 via-white/20 to-white/60 backdrop-blur-xs border-2 border-white/80 shadow-[0_16px_36px_rgba(36,23,17,0.12)] flex flex-col justify-end overflow-hidden`}
              style={{
                clipPath: 'polygon(3% 0%, 97% 0%, 90% 100%, 10% 100%)',
              }}
            >
              {/* Cup Rim Highlight */}
              <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-b from-white to-transparent opacity-70 z-20" />

              {/* Condensation for Cold Drinks */}
              {isCold && (
                <div className="absolute inset-0 z-15 pointer-events-none">
                  <div className="absolute top-10 left-6 w-1.5 h-1.5 rounded-full bg-white/70" />
                  <div className="absolute top-24 left-10 w-2 h-3 rounded-full bg-white/60 blur-[0.5px]" />
                  <div className="absolute top-16 right-8 w-1.5 h-2 rounded-full bg-white/70" />
                  <div className="absolute top-36 right-12 w-2 h-2.5 rounded-full bg-white/60" />
                </div>
              )}

              {/* Ice Cubes Floating */}
              {hasIce && (
                <div className="absolute inset-x-4 top-8 bottom-12 z-10 pointer-events-none flex flex-wrap gap-2 justify-center items-center opacity-85">
                  <div className="w-8 h-8 rounded-lg bg-white/35 backdrop-blur-sm border border-white/60 shadow-inner rotate-12" />
                  <div className="w-7 h-7 rounded-lg bg-white/30 backdrop-blur-sm border border-white/60 shadow-inner -rotate-15" />
                  {(iceLevel === 'Normal Ice' || iceLevel === 'Extra Ice') && (
                    <div className="w-8 h-8 rounded-lg bg-white/35 backdrop-blur-sm border border-white/60 shadow-inner rotate-45" />
                  )}
                  {iceLevel === 'Extra Ice' && (
                    <div className="w-7 h-7 rounded-lg bg-white/30 backdrop-blur-sm border border-white/60 shadow-inner -rotate-6" />
                  )}
                </div>
              )}

              {/* FOAM / CREMA LAYER (TOP) */}
              <div
                className="w-full relative transition-all duration-300 overflow-hidden flex items-center justify-center"
                style={{
                  height: `${foamPercent}%`,
                  backgroundColor:
                    drinkType === 'Espresso' || drinkType === 'Americano'
                      ? '#B88656' // Crema
                      : hasMilk
                      ? '#FAF6EE'
                      : '#3D2314',
                }}
              >
                {/* Microfoam bubble texture */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,#fff_20%,transparent_70%)]" />
                {/* Toppings on foam if no whipped cream */}
                {!hasWhippedCream && hasChocolatePowder && (
                  <div className="absolute inset-0 bg-[radial-gradient(#3B1F14_1px,transparent_1px)] [background-size:5px_5px] opacity-50" />
                )}
                {!hasWhippedCream && hasCinnamon && (
                  <div className="absolute inset-0 bg-[radial-gradient(#8E4A23_1px,transparent_1px)] [background-size:4px_4px] opacity-50" />
                )}
                {!hasWhippedCream && hasCaramelDrizzle && (
                  <div className="w-full h-1 bg-amber-600/80 rounded-full blur-[0.5px] rotate-6" />
                )}
                {!hasWhippedCream && hasCoffeeBeans && (
                  <div className="flex gap-2 items-center">
                    <span className="w-2.5 h-4 bg-[#23120B] rounded-full rotate-12 border border-[#432616]" />
                    <span className="w-2.5 h-4 bg-[#23120B] rounded-full -rotate-15 border border-[#432616]" />
                  </div>
                )}
              </div>

              {/* MILK / BLEND LAYER (MIDDLE) */}
              {hasMilk && (
                <div
                  className="w-full relative transition-all duration-300"
                  style={{
                    height: `${milkPercent}%`,
                    background: `linear-gradient(to bottom, ${milkTone[milk]}, ${coffeeTone[strength]} 90%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-white/20 via-transparent to-black/10" />
                </div>
              )}

              {/* COFFEE / ESPRESSO BASE LAYER (BOTTOM) */}
              <div
                className="w-full relative transition-all duration-300"
                style={{
                  height: `${hasMilk ? coffeePercent : 100 - foamPercent}%`,
                  backgroundColor: coffeeTone[strength],
                }}
              >
                {/* Bottom glass shadow/reflection */}
                <div className="absolute inset-x-0 bottom-0 h-4 bg-black/30" />

                {/* Syrup layer at the bottom */}
                {hasSyrup && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-4 transition-all duration-300"
                    style={{
                      backgroundColor: syrupTone[syrup],
                      boxShadow: `0 0 12px ${syrupTone[syrup]}`,
                    }}
                  />
                )}
              </div>

              {/* Glass vertical light shine */}
              <div className="absolute inset-y-0 left-4 w-3 bg-gradient-to-r from-white/40 to-transparent pointer-events-none z-20" />
            </div>

            {/* Cup Coaster / Saucer */}
            <div className="w-48 h-3.5 mt-2 bg-gradient-to-r from-[#D8C7B5] via-[#ECE1D4] to-[#D8C7B5] rounded-full shadow-md border-t border-white/60" />
          </div>
        )}

        {/* View Mode: TOP VIEW (Crema & Latte Art) */}
        {viewMode === 'top' && (
          <div className="flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
            <div className="relative w-56 h-56 rounded-full bg-[#EAE2D5] p-3 shadow-xl border-4 border-[#FDFBF7] flex items-center justify-center">
              {/* Cup inner rim */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FAF5EE] to-[#E9DCB8] p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {/* Surface Liquid */}
                <div
                  className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor:
                      drinkType === 'Espresso' || drinkType === 'Americano'
                        ? '#A67343'
                        : hasMilk
                        ? '#EADDC7'
                        : '#351D10',
                  }}
                >
                  {/* Crema Marbling Ring */}
                  <div className="absolute inset-2 rounded-full border-4 border-[#C88A4F]/40 opacity-70" />

                  {/* Foam Art (Rosetta or Heart for lattes/cappuccinos) */}
                  {hasMilk && (
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-10 rounded-full bg-[#FFFBF4] shadow-xs flex items-center justify-center">
                        <div className="w-7 h-5 rounded-full bg-[#E8D4B4]" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#FFFBF4] -mt-2 shadow-xs" />
                      <div className="w-4 h-8 bg-[#FFFBF4] rounded-full -mt-2" />
                    </div>
                  )}

                  {/* Ice cubes floating if iced */}
                  {hasIce && (
                    <div className="absolute inset-4 flex items-center justify-around">
                      <div className="w-8 h-8 rounded-md bg-white/40 border border-white/60 backdrop-blur-xs rotate-12" />
                      <div className="w-9 h-9 rounded-md bg-white/40 border border-white/60 backdrop-blur-xs -rotate-20" />
                    </div>
                  )}

                  {/* Drizzles & Powder from top */}
                  {hasCaramelDrizzle && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full border-2 border-amber-600/70 border-dashed" />
                    </div>
                  )}
                  {hasChocolatePowder && (
                    <div className="absolute inset-0 bg-[radial-gradient(#3B1F14_1.5px,transparent_1.5px)] [background-size:6px_6px] opacity-40" />
                  )}
                  {hasCinnamon && (
                    <div className="absolute inset-0 bg-[radial-gradient(#8E4A23_1.5px,transparent_1.5px)] [background-size:5px_5px] opacity-45" />
                  )}
                  {hasCoffeeBeans && (
                    <div className="absolute top-6 right-8 flex gap-1">
                      <span className="w-3 h-5 bg-[#23120B] rounded-full rotate-45 border border-[#432616]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-[#7A6A5E] mt-3 font-medium">
              Top Crema & Barista Pour Perspective
            </p>
          </div>
        )}

        {/* View Mode: LAYERS BREAKDOWN (Blueprint) */}
        {viewMode === 'layers' && (
          <div className="w-full max-w-sm space-y-2 py-2 animate-in fade-in duration-200">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6A5E] mb-3 text-center">
              Drink Architecture & Volumetric Ratio
            </h4>

            {/* Whipped Cream layer if any */}
            {hasWhippedCream && (
              <div className="p-2.5 rounded-lg bg-white border border-[#EBE3D5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-[#F7F2E7] border border-[#DDD]" />
                  <span className="font-semibold text-[#241711]">Whipped Cream Top</span>
                </div>
                <span className="text-[#8C6D58] font-mono">Topping</span>
              </div>
            )}

            {/* Microfoam / Crema */}
            <div className="p-2.5 rounded-lg bg-white border border-[#EBE3D5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded bg-[#FAF6EE] border border-[#DDD]" />
                <span className="font-semibold text-[#241711]">
                  {drinkType === 'Espresso' ? 'Velvety Crema' : 'Textured Micro-foam'}
                </span>
              </div>
              <span className="text-[#8C6D58] font-mono">{foamPercent}%</span>
            </div>

            {/* Steamed Milk */}
            {hasMilk && (
              <div className="p-2.5 rounded-lg bg-white border border-[#EBE3D5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded border border-[#CCC]"
                    style={{ backgroundColor: milkTone[milk] }}
                  />
                  <div>
                    <span className="font-semibold text-[#241711]">{milk}</span>
                    <span className="text-[10px] text-[#8C6D58] block">{temperature} Blend</span>
                  </div>
                </div>
                <span className="text-[#8C6D58] font-mono">{milkPercent}%</span>
              </div>
            )}

            {/* Coffee Espresso Core */}
            <div className="p-2.5 rounded-lg bg-white border border-[#EBE3D5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded border border-black/20"
                  style={{ backgroundColor: coffeeTone[strength] }}
                />
                <div>
                  <span className="font-semibold text-[#241711]">{drinkType} Core</span>
                  <span className="text-[10px] text-[#8C6D58] block">
                    {strength} roast profile
                  </span>
                </div>
              </div>
              <span className="text-[#8C6D58] font-mono">{coffeePercent}%</span>
            </div>

            {/* Syrup Foundation */}
            {hasSyrup && (
              <div className="p-2.5 rounded-lg bg-white border border-[#EBE3D5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded border border-[#CCC]"
                    style={{ backgroundColor: syrupTone[syrup] }}
                  />
                  <span className="font-semibold text-[#241711]">{syrup} Infusion</span>
                </div>
                <span className="text-[#8C6D58] font-mono">Base Infusion</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Ingredients Pill Chips Beside/Under */}
      <div className="pt-2 border-t border-[#F4ECE1]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D58] block mb-2">
          Current Ingredients Profile
        </span>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4ECE1] text-[#3D2314] font-medium">
            <Coffee className="w-3 h-3 text-[#7B4B32]" />
            {drinkType} ({strength})
          </span>

          {milk !== 'No Milk' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4ECE1] text-[#3D2314] font-medium">
              🥛 {milk}
            </span>
          )}

          {syrup !== 'None' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4ECE1] text-[#3D2314] font-medium">
              🍯 {syrup} Syrup
            </span>
          )}

          {sugar !== 'No Sugar' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4ECE1] text-[#3D2314] font-medium">
              🍬 {sugar} Sugar
            </span>
          )}

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4ECE1] text-[#3D2314] font-medium">
            <Thermometer className="w-3 h-3 text-[#7B4B32]" />
            {temperature}
          </span>

          {isCold && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E8F3F7] text-[#1E5B6E] font-medium">
              🧊 {iceLevel}
            </span>
          )}

          {toppings.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FDF0E3] text-[#7A3E14] font-medium"
            >
              ✨ {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
