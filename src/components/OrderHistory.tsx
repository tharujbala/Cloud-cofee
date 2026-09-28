import { useOrders } from '../context/OrderContext';
import { formatCurrency } from '../utils/pricing';
import { Clock, CheckCircle2, RotateCw, ShoppingBag } from 'lucide-react';

interface OrderHistoryProps {
  onStartOrder: () => void;
}

export function OrderHistory({ onStartOrder }: OrderHistoryProps) {
  const { orders, advanceDemoOrderStatus } = useOrders();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Preparing Brew
          </span>
        );
      case 'Ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Ready for Pickup
          </span>
        );
      case 'Completed':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F4ECE1] text-[#6B5E55]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6D58]" />
            Completed
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6D58]">
            Customer Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#241711] mt-1">
            Order History & Live Status
          </h1>
          <p className="text-xs text-[#7A6A5E] mt-1">
            Track your artisanal orders from roasting and brewing to counter pickup.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartOrder}
          className="px-4 py-2.5 rounded-xl bg-[#4A2F22] hover:bg-[#342017] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order More Coffee</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#EBE3D5] shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F4ECE1] text-[#8C6D58] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#241711]">No Previous Orders</h3>
          <p className="text-xs text-[#7A6A5E] mt-1.5 max-w-xs mx-auto">
            You have not placed any coffee orders yet. Browse our signature menu to place your first cup!
          </p>
          <button
            type="button"
            onClick={onStartOrder}
            className="mt-6 px-5 py-2.5 rounded-xl bg-[#4A2F22] text-white text-xs font-semibold hover:bg-[#342017] transition-colors shadow-xs"
          >
            Explore Menu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#EBE3D5] p-6 shadow-xs hover:shadow-md transition-all"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#F4ECE1] gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg font-bold text-[#241711]">
                        {order.orderNumber}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#7A6A5E] mt-1">
                      <span>{formattedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{order.orderType}</span>
                      <span aria-hidden="true">·</span>
                      <span>Paid via {order.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    {/* Demo Interactive Status Simulation Button */}
                    <button
                      type="button"
                      onClick={() => advanceDemoOrderStatus(order.id)}
                      className="text-[11px] font-medium text-[#4A2F22] hover:text-[#241711] bg-[#FAF7F2] hover:bg-[#F4ECE1] px-2.5 py-1.5 rounded-lg border border-[#EBE3D5] transition-colors flex items-center gap-1.5"
                      title="Advance order status (Demo simulation)"
                    >
                      <RotateCw className="w-3 h-3 text-[#9E6747]" />
                      <span>Simulate Status</span>
                    </button>

                    <div className="text-right">
                      <span className="text-[11px] text-[#8C6D58] block uppercase tracking-wider font-semibold">
                        Total
                      </span>
                      <span className="font-mono text-base font-bold text-[#4A2F22]">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="py-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={item.cartItemId || idx}
                      className="flex items-start justify-between text-xs gap-4"
                    >
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#EBE3D5] flex items-center justify-center font-mono font-semibold text-[#4A2F22] shrink-0">
                          {item.quantity}×
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#241711] text-sm">
                            {item.name}{' '}
                            <span className="font-normal text-xs text-[#7A6A5E]">
                              ({item.size})
                            </span>
                          </h4>
                          <p className="text-[11px] text-[#7A6A5E] mt-0.5">
                            {item.customization.temperature} · {item.customization.milk} ·{' '}
                            {item.customization.strength} Roast
                            {item.customization.syrup !== 'None' &&
                              ` · ${item.customization.syrup} Syrup`}
                            {item.customization.toppings.length > 0 &&
                              ` · ${item.customization.toppings.join(', ')}`}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono font-semibold text-[#241711] shrink-0">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Customer summary */}
                <div className="pt-4 border-t border-[#F4ECE1] flex flex-wrap items-center justify-between text-xs text-[#7A6A5E] gap-2">
                  <div className="flex items-center gap-1.5">
                    <span>Customer:</span>
                    <strong className="text-[#241711]">{order.customerName}</strong>
                    <span>({order.phone})</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#8C6D58]" />
                    <span>Est. Time: {order.estimatedPrepTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
