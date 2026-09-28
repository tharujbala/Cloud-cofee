import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { CustomizationOptions } from '../types';

const defaultCustomization: CustomizationOptions = {
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

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <CartProvider>{children}</CartProvider>
  </ToastProvider>
);

describe('Cart Context & Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with an empty cart or stored items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it('adds an item to cart and updates subtotal and total GST tax', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        drinkId: 'latte-1',
        name: 'Artisan Latte',
        category: 'Latte',
        image: 'latte.jpg',
        size: 'Medium',
        customization: defaultCustomization,
        unitPrice: 300,
        quantity: 2,
      });
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.subtotal).toBe(600); // 300 * 2
    expect(result.current.tax).toBe(30); // 600 * 0.05 = 30 GST
    expect(result.current.total).toBe(630);
  });

  it('modifies quantity and removes items properly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        drinkId: 'latte-1',
        name: 'Artisan Latte',
        category: 'Latte',
        image: 'latte.jpg',
        size: 'Medium',
        customization: defaultCustomization,
        unitPrice: 250,
        quantity: 1,
      });
    });

    const itemId = result.current.cartItems[0].cartItemId;

    // Increment
    act(() => {
      result.current.updateQuantity(itemId, 1);
    });
    expect(result.current.itemCount).toBe(2);
    expect(result.current.subtotal).toBe(500);

    // Remove
    act(() => {
      result.current.removeItem(itemId);
    });
    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.subtotal).toBe(0);
  });
});
