import { CustomizationOptions, PriceBreakdown } from '../types';

export const BASE_DRINK_PRICES: Record<string, number> = {
  Espresso: 180,
  Americano: 210,
  Cappuccino: 250,
  Latte: 270,
  Mocha: 295,
  'Cold Brew': 240,
  'Iced Latte': 280,
  'Cold Coffee': 250,
  'Vanilla Cold Brew': 280,
  'Caramel Macchiato': 310,
  'Chai Tea Latte': 220,
  'Matcha Green Tea': 280,
  'Irish Cream Breve': 320,
  'Spanish Cortado': 220,
  'Affogato al Caffe': 290,
};

export const DEFAULT_BASE_PRICE = 240;

export function calculatePrice(
  drinkNameOrType: string,
  customization: CustomizationOptions
): PriceBreakdown {
  const basePrice = BASE_DRINK_PRICES[drinkNameOrType] || BASE_DRINK_PRICES[customization.drinkType] || DEFAULT_BASE_PRICE;

  // Cup Size Adjustment (in INR)
  let sizeCost = 0;
  if (customization.size === 'Medium') sizeCost = 30;
  else if (customization.size === 'Large') sizeCost = 60;
  else if (customization.size === 'Extra Large') sizeCost = 90;

  // Milk Cost (Alternative milk upcharge in INR)
  let milkCost = 0;
  if (
    customization.milk === 'Almond Milk' ||
    customization.milk === 'Oat Milk' ||
    customization.milk === 'Soy Milk'
  ) {
    milkCost = 50;
  }

  // Coffee Strength Cost (Extra espresso shots in INR)
  let strengthCost = 0;
  if (customization.strength === 'Strong') strengthCost = 40;
  else if (customization.strength === 'Extra Strong') strengthCost = 80;

  // Syrup Cost (in INR)
  let syrupCost = 0;
  if (customization.syrup && customization.syrup !== 'None') {
    syrupCost = 35;
  }

  // Toppings Cost (₹30 per topping)
  const toppingsCost = (customization.toppings?.length || 0) * 30;

  const customizationCost = Number((sizeCost + milkCost + strengthCost + syrupCost + toppingsCost).toFixed(2));
  const finalPrice = Number((basePrice + customizationCost).toFixed(2));

  return {
    basePrice,
    sizeCost,
    milkCost,
    strengthCost,
    syrupCost,
    toppingsCost,
    customizationCost,
    finalPrice,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}
