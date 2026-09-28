import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DrinkCard } from '../components/DrinkCard';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider } from '../context/CartContext';
import { Drink } from '../types';

const mockDrink: Drink = {
  id: 'test-cappuccino',
  name: 'Artisan Cappuccino',
  category: 'Cappuccino',
  description: 'Balanced espresso, milk & thick microfoam',
  price: 250,
  rating: 4.8,
  reviewsCount: 215,
  image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d',
  calories: 140,
  ingredients: ['Espresso', 'Whole Milk', 'Micro-Foam'],
  availableSizes: ['Small', 'Medium', 'Large'],
  defaultCustomization: {
    drinkType: 'Cappuccino',
    size: 'Medium',
    milk: 'Whole Milk',
    strength: 'Regular',
    sugar: 'Low',
    syrup: 'None',
    toppings: [],
    temperature: 'Hot',
    iceLevel: 'No Ice',
  },
};

describe('DrinkCard Component', () => {
  it('renders drink title, description, price, and rating', () => {
    const onCustomize = vi.fn();

    render(
      <ToastProvider>
        <CartProvider>
          <DrinkCard drink={mockDrink} onCustomize={onCustomize} />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByText('Artisan Cappuccino')).toBeInTheDocument();
    expect(screen.getByText(/Balanced espresso, milk & thick microfoam/i)).toBeInTheDocument();
    expect(screen.getByText(/250/)).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('triggers customize callback when Customize button is clicked', () => {
    const onCustomize = vi.fn();

    render(
      <ToastProvider>
        <CartProvider>
          <DrinkCard drink={mockDrink} onCustomize={onCustomize} />
        </CartProvider>
      </ToastProvider>
    );

    const customizeBtn = screen.getByRole('button', { name: /customize/i });
    fireEvent.click(customizeBtn);

    expect(onCustomize).toHaveBeenCalledWith(mockDrink);
  });
});
