import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, CustomizationOptions, CupSize } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: {
    drinkId: string;
    name: string;
    category: string;
    image: string;
    size: CupSize;
    customization: CustomizationOptions;
    unitPrice: number;
    quantity?: number;
  }) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'coffee_shop_cart_v1';

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage:', e);
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addItem = (item: {
    drinkId: string;
    name: string;
    category: string;
    image: string;
    size: CupSize;
    customization: CustomizationOptions;
    unitPrice: number;
    quantity?: number;
  }) => {
    const qty = item.quantity || 1;
    const customKey = JSON.stringify({
      id: item.drinkId,
      size: item.size,
      c: item.customization,
    });

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => JSON.stringify({ id: ci.drinkId, size: ci.size, c: ci.customization }) === customKey
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + qty;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          totalPrice: Number((current.unitPrice * newQty).toFixed(2)),
        };
        return updated;
      }

      const newItem: CartItem = {
        cartItemId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        drinkId: item.drinkId,
        name: item.name,
        category: item.category,
        image: item.image,
        size: item.size,
        customization: item.customization,
        unitPrice: item.unitPrice,
        quantity: qty,
        totalPrice: Number((item.unitPrice * qty).toFixed(2)),
      };
      return [...prev, newItem];
    });

    showToast(`Added ${item.name} (${item.size}) to cart`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: Number((item.unitPrice * newQty).toFixed(2)),
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (cartItemId: string) => {
    const target = cartItems.find((i) => i.cartItemId === cartItemId);
    if (target) {
      showToast(`Removed ${target.name} from cart`, 'info');
    }
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => Number(cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0).toFixed(2)),
    [cartItems]
  );

  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = useMemo(() => Number((subtotal + tax).toFixed(2)), [subtotal, tax]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
