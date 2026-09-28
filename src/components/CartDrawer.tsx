import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/pricing';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export function CartDrawer({ onProceedToCheckout }: CartDrawerProps) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    total,
  } = useCart();

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#EBE3D5]">
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#EBE3D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4A2F22]" />
            <h2 className="font-serif text-lg font-bold text-[#241711]">Your Coffee Bag</h2>
            <span className="text-xs font-mono font-medium text-[#7A6A5E] bg-[#F4ECE1] px-2 py-0.5 rounded-full">
              {cartItems.length} items
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-[#8C6D58] hover:text-red-700 transition-colors p-1"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#6B5E55] hover:text-[#241711] hover:bg-[#F4ECE1] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#7A6A5E]">
              <div className="w-16 h-16 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#8C6D58] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#241711]">Your cup is empty</h3>
              <p className="text-xs text-[#7A6A5E] mt-1 max-w-xs">
                Explore our artisanal menu or craft a customized beverage using the custom cup builder.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-5 py-2.5 rounded-xl bg-[#4A2F22] text-white text-xs font-semibold hover:bg-[#342017] transition-colors shadow-xs"
              >
                Start Ordering
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-xl border border-[#EBE3D5] p-4 shadow-2xs flex gap-3.5"
              >
                {/* Image Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-[#F4ECE1] overflow-hidden shrink-0 flex items-center justify-center">
                  {!imgErrors[item.cartItemId] ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [item.cartItemId]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">☕</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-serif text-sm font-bold text-[#241711] truncate">
                      {item.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-[#241711] shrink-0">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>

                  {/* Size and specs */}
                  <div className="text-[11px] text-[#7A6A5E] mt-0.5 space-y-0.5">
                    <div>
                      <strong className="text-[#4A2F22]">{item.size}</strong> · {item.customization.temperature}
                      {item.customization.milk !== 'No Milk' && ` · ${item.customization.milk}`}
                    </div>

                    {item.customization.syrup !== 'None' && (
                      <div className="truncate">Syrup: {item.customization.syrup}</div>
                    )}

                    {item.customization.toppings.length > 0 && (
                      <div className="truncate text-[#8C6D58]">
                        Toppings: {item.customization.toppings.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F7F3ED]">
                    <div className="flex items-center border border-[#EBE3D5] rounded-md overflow-hidden bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#4A2F22] hover:bg-[#EAE0D3] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-semibold text-[#241711]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#4A2F22] hover:bg-[#EAE0D3] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-xs text-[#A8988B] hover:text-red-700 p-1 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal, Taxes, Total and Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EBE3D5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B5E55]">
                <span>Subtotal</span>
                <span className="font-mono">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6B5E55]">
                <span>GST (5%)</span>
                <span className="font-mono">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#241711] pt-2 border-t border-[#F4ECE1]">
                <span>Total Due</span>
                <span className="font-mono text-lg text-[#4A2F22]">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#4A2F22] hover:bg-[#342017] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
