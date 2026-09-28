import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { useToast } from './ToastContext';

interface OrderContextType {
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceDemoOrderStatus: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'coffee_shop_orders_v1';

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-demo-1041',
    orderNumber: '#RF-8241',
    date: '2026-09-28T09:35:00.000Z',
    items: [
      {
        cartItemId: 'item_demo_1',
        drinkId: 'vanilla-bean-latte',
        name: 'Bourbon Vanilla Latte',
        category: 'Latte',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
        size: 'Medium',
        customization: {
          drinkType: 'Latte',
          size: 'Medium',
          milk: 'Oat Milk',
          strength: 'Regular',
          sugar: 'Normal',
          syrup: 'Vanilla',
          toppings: ['Cinnamon'],
          temperature: 'Hot',
          iceLevel: 'No Ice',
        },
        unitPrice: 385,
        quantity: 1,
        totalPrice: 385,
      },
      {
        cartItemId: 'item_demo_2',
        drinkId: 'classic-cappuccino',
        name: 'Artisan Cappuccino',
        category: 'Cappuccino',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
        size: 'Small',
        customization: {
          drinkType: 'Cappuccino',
          size: 'Small',
          milk: 'Whole Milk',
          strength: 'Strong',
          sugar: 'Low',
          syrup: 'None',
          toppings: ['Chocolate Powder'],
          temperature: 'Hot',
          iceLevel: 'No Ice',
        },
        unitPrice: 320,
        quantity: 1,
        totalPrice: 320,
      },
    ],
    subtotal: 705,
    tax: 35,
    total: 740,
    customerName: 'Marcus Vance',
    phone: '+91 98765 43210',
    orderType: 'Pickup',
    paymentMethod: 'UPI',
    status: 'Ready',
    estimatedPrepTime: '8-10 mins',
  },
  {
    id: 'ord-demo-1040',
    orderNumber: '#RF-8239',
    date: '2026-09-28T08:15:00.000Z',
    items: [
      {
        cartItemId: 'item_demo_3',
        drinkId: 'nitro-cold-brew',
        name: 'Nitro Cascade Cold Brew',
        category: 'Cold Brew',
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
        size: 'Large',
        customization: {
          drinkType: 'Cold Brew',
          size: 'Large',
          milk: 'No Milk',
          strength: 'Strong',
          sugar: 'No Sugar',
          syrup: 'None',
          toppings: [],
          temperature: 'Extra Cold',
          iceLevel: 'No Ice',
        },
        unitPrice: 340,
        quantity: 2,
        totalPrice: 680,
      },
    ],
    subtotal: 680,
    tax: 34,
    total: 714,
    customerName: 'Elena Rostova',
    phone: '+91 98123 45678',
    orderType: 'Dine In',
    paymentMethod: 'Card',
    status: 'Completed',
    estimatedPrepTime: 'Completed',
  },
];

function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return INITIAL_DEMO_ORDERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_ORDERS;
  } catch (e) {
    console.error('Failed to load orders from localStorage:', e);
    return INITIAL_DEMO_ORDERS;
  }
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [orders]);

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Date.now(),
      orderNumber: `#RF-${randomNum}`,
      date: new Date().toISOString(),
      status: 'Preparing',
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const advanceDemoOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextStatus: OrderStatus =
            ord.status === 'Preparing' ? 'Ready' : ord.status === 'Ready' ? 'Completed' : 'Preparing';
          showToast(`Order ${ord.orderNumber} status changed to ${nextStatus}`, 'info');
          return { ...ord, status: nextStatus };
        }
        return ord;
      })
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, advanceDemoOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
