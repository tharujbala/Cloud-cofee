export type DrinkCategory =
  | 'All'
  | 'Espresso'
  | 'Americano'
  | 'Cappuccino'
  | 'Latte'
  | 'Mocha'
  | 'Cold Coffee'
  | 'Iced Latte'
  | 'Cold Brew'
  | 'Tea'
  | 'Special Drinks';

export type CupSize = 'Small' | 'Medium' | 'Large' | 'Extra Large';

export type MilkType =
  | 'Whole Milk'
  | 'Skim Milk'
  | 'Almond Milk'
  | 'Oat Milk'
  | 'Soy Milk'
  | 'No Milk';

export type CoffeeStrength = 'Light' | 'Regular' | 'Strong' | 'Extra Strong';

export type SugarLevel = 'No Sugar' | 'Low' | 'Normal' | 'Extra';

export type SyrupType = 'Vanilla' | 'Caramel' | 'Hazelnut' | 'Chocolate' | 'None';

export type ToppingType =
  | 'Whipped Cream'
  | 'Chocolate Powder'
  | 'Caramel Drizzle'
  | 'Cinnamon'
  | 'Coffee Beans';

export type Temperature = 'Hot' | 'Warm' | 'Cold' | 'Extra Cold';

export type IceLevel = 'No Ice' | 'Light Ice' | 'Normal Ice' | 'Extra Ice';

export interface CustomizationOptions {
  drinkType: string;
  size: CupSize;
  milk: MilkType;
  strength: CoffeeStrength;
  sugar: SugarLevel;
  syrup: SyrupType;
  toppings: ToppingType[];
  temperature: Temperature;
  iceLevel: IceLevel;
}

export interface Drink {
  id: string;
  name: string;
  category: Exclude<DrinkCategory, 'All'>;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  popular?: boolean;
  recommended?: boolean;
  favorite?: boolean;
  calories: number;
  ingredients: string[];
  availableSizes: CupSize[];
  defaultCustomization: CustomizationOptions;
}

export interface CartItem {
  cartItemId: string;
  drinkId: string;
  name: string;
  category: string;
  image: string;
  size: CupSize;
  customization: CustomizationOptions;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type OrderType = 'Pickup' | 'Dine In';
export type PaymentMethod = 'Cash' | 'Card' | 'UPI';
export type OrderStatus = 'Preparing' | 'Ready' | 'Completed';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerName: string;
  phone: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  estimatedPrepTime: string;
}

export interface PriceBreakdown {
  basePrice: number;
  sizeCost: number;
  milkCost: number;
  strengthCost: number;
  syrupCost: number;
  toppingsCost: number;
  customizationCost: number;
  finalPrice: number;
}
