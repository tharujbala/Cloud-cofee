import { describe, it, expect } from 'vitest';
import { calculatePrice, formatCurrency } from '../utils/pricing';
import { CustomizationOptions } from '../types';

describe('Price Calculation Logic (INR)', () => {
  const baseCustomization: CustomizationOptions = {
    drinkType: 'Latte',
    size: 'Medium',
    milk: 'Whole Milk',
    strength: 'Regular',
    sugar: 'Normal',
    syrup: 'None',
    toppings: [],
    temperature: 'Hot',
    iceLevel: 'No Ice',
  };

  it('calculates the base price and size cost correctly for a standard Medium Latte in INR', () => {
    const result = calculatePrice('Latte', baseCustomization);
    // Latte base is ₹270, Medium size is +₹30
    expect(result.basePrice).toBe(270);
    expect(result.sizeCost).toBe(30);
    expect(result.customizationCost).toBe(30);
    expect(result.finalPrice).toBe(300);
  });

  it('applies alternative milk upcharge of ₹50 for Oat Milk', () => {
    const customWithOat: CustomizationOptions = {
      ...baseCustomization,
      milk: 'Oat Milk',
    };
    const result = calculatePrice('Latte', customWithOat);
    expect(result.milkCost).toBe(50);
    expect(result.finalPrice).toBe(350); // 270 + 30 (Medium) + 50 (Oat)
  });

  it('applies extra espresso shots and syrup charges in INR', () => {
    const customExtra: CustomizationOptions = {
      ...baseCustomization,
      strength: 'Strong', // +40
      syrup: 'Caramel', // +35
    };
    const result = calculatePrice('Latte', customExtra);
    expect(result.strengthCost).toBe(40);
    expect(result.syrupCost).toBe(35);
    expect(result.finalPrice).toBe(375); // 270 + 30 + 40 + 35
  });

  it('applies multi-topping charges at ₹30 per topping', () => {
    const customTopped: CustomizationOptions = {
      ...baseCustomization,
      toppings: ['Whipped Cream', 'Caramel Drizzle'], // 2 * 30 = 60
    };
    const result = calculatePrice('Latte', customTopped);
    expect(result.toppingsCost).toBe(60);
    expect(result.finalPrice).toBe(360);
  });

  it('formats currency with INR ₹ symbol', () => {
    expect(formatCurrency(250)).toContain('250');
    expect(formatCurrency(250)).toContain('₹');
  });
});
