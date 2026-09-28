import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { OrderType, PaymentMethod, Order } from '../types';
import { formatCurrency } from '../utils/pricing';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  ArrowRight,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (order: Order) => void;
}

export function CheckoutModal({ isOpen, onClose, onOrderCompleted }: CheckoutModalProps) {
  const { cartItems, subtotal, tax, total, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Card');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!customerName.trim()) {
      newErrors.name = 'Please provide your name for the order';
    } else if (customerName.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const phoneClean = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for order SMS updates';
    } else if (phoneClean.length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const prepTime = orderType === 'Pickup' ? '8-12 mins' : '5-8 mins';

    const newOrder = placeOrder({
      items: cartItems,
      subtotal,
      tax,
      total,
      customerName: customerName.trim(),
      phone: phone.trim(),
      orderType,
      paymentMethod,
      estimatedPrepTime: prepTime,
    });

    setPlacedOrder(newOrder);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A2F22', '#C89D7C', '#E6D5C3', '#9E6747'],
      });
    } catch (e) {
      // Fallback safe
    }
  };

  const handleDone = () => {
    if (placedOrder) {
      onOrderCompleted(placedOrder);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={placedOrder ? handleDone : onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#EBE3D5] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* SUCCESS VIEW AFTER PLACING */}
        {placedOrder ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6D58]">
                Order Confirmed
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#241711] mt-1">
                Brewing in Progress!
              </h2>
              <p className="text-xs text-[#7A6A5E] mt-1">
                Thank you, <strong className="text-[#241711]">{placedOrder.customerName}</strong>. Our baristas are handcrafting your cup now.
              </p>
            </div>

            {/* Order Specs Box */}
            <div className="w-full bg-[#FAF7F2] rounded-xl border border-[#EBE3D5] p-5 text-left space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#EBE3D5]">
                <div>
                  <span className="text-[11px] text-[#8C6D58] block uppercase tracking-wider">
                    Order Reference
                  </span>
                  <span className="font-mono text-base font-bold text-[#4A2F22]">
                    {placedOrder.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#8C6D58] block uppercase tracking-wider">
                    Est. Ready Time
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 text-xs bg-emerald-50 px-2 py-0.5 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    {placedOrder.estimatedPrepTime}
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-[#6B5E55]">
                <div className="flex justify-between">
                  <span>Order Type:</span>
                  <strong className="text-[#241711]">{placedOrder.orderType}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <strong className="text-[#241711]">{placedOrder.paymentMethod} (Simulated)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Items:</span>
                  <strong className="text-[#241711]">{placedOrder.items.length} items</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EBE3D5] text-sm font-bold text-[#241711]">
                  <span>Total Amount:</span>
                  <span className="font-mono text-[#4A2F22]">
                    {formatCurrency(placedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDone}
              className="w-full py-3 px-4 rounded-xl bg-[#4A2F22] hover:bg-[#342017] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>View in Order History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <>
            {/* Modal Header */}
            <div className="p-5 border-b border-[#EBE3D5] flex items-center justify-between bg-[#FAF7F2]">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#241711]">Checkout & Order</h2>
                <p className="text-xs text-[#7A6A5E] mt-0.5">
                  Confirm your contact details and fulfillment choice
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#6B5E55] hover:text-[#241711] hover:bg-[#EBE0D2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Scrollable */}
            <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Order Type Toggle */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58] block mb-2">
                  Fulfillment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('Pickup')}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      orderType === 'Pickup'
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F4ECE1] text-[#4A2F22] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#241711] block">Pickup Bar</span>
                      <span className="text-[11px] text-[#7A6A5E]">Grab & go at express counter</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('Dine In')}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      orderType === 'Dine In'
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F4ECE1] text-[#4A2F22] flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#241711] block">Dine In</span>
                      <span className="text-[11px] text-[#7A6A5E]">Serve to table or patio</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#241711] block mb-1">
                    Customer Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Jordan Miller"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                        : 'border-[#EBE3D5] focus:ring-2 focus:ring-[#4A2F22] focus:border-transparent'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#241711] block mb-1">
                    Phone Number (SMS Ready Notification) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500'
                        : 'border-[#EBE3D5] focus:ring-2 focus:ring-[#4A2F22] focus:border-transparent'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#241711] block mb-1">
                    Barista Notes / Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra hot milk, double cup, less ice"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EBE3D5] text-xs focus:outline-none focus:ring-2 focus:ring-[#4A2F22]"
                  />
                </div>
              </div>

              {/* Payment Method Selector (Frontend mock) */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58] block mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#4A2F22] mb-1.5" />
                    <span className="text-xs font-semibold text-[#241711]">Credit/Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#4A2F22] mb-1.5" />
                    <span className="text-xs font-semibold text-[#241711]">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      paymentMethod === 'Cash'
                        ? 'border-[#4A2F22] bg-[#FAF7F2] ring-1 ring-[#4A2F22]'
                        : 'border-[#EBE3D5] hover:border-[#C89D7C] bg-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#4A2F22] mb-1.5" />
                    <span className="text-xs font-semibold text-[#241711]">Cash on Pickup</span>
                  </button>
                </div>
              </div>

              {/* Itemized Order Summary */}
              <div className="bg-[#FAF7F2] rounded-xl border border-[#EBE3D5] p-4 text-xs space-y-2">
                <div className="font-semibold text-[#241711] pb-1.5 border-b border-[#EBE3D5] flex justify-between">
                  <span>Order Items ({cartItems.length})</span>
                  <span>Amount</span>
                </div>
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-[#6B5E55]">
                    <span className="truncate pr-2">
                      {item.quantity}× {item.name} ({item.size})
                    </span>
                    <span className="font-mono shrink-0">{formatCurrency(item.totalPrice)}</span>
                  </div>
                ))}

                <div className="pt-2 border-t border-[#EBE3D5] space-y-1">
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B5E55]">
                    <span>GST (5%)</span>
                    <span className="font-mono">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#241711] pt-1">
                    <span>Total Amount</span>
                    <span className="font-mono text-base text-[#4A2F22]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#4A2F22] hover:bg-[#342017] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Place Order • {formatCurrency(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
