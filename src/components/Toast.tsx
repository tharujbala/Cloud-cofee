import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
        let borderColor = 'border-emerald-200';
        let bgColor = 'bg-white';

        if (toast.type === 'warning') {
          icon = <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />;
          borderColor = 'border-amber-200';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-[#4A2F22] shrink-0" />;
          borderColor = 'border-[#EBE3D5]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border ${borderColor} ${bgColor} shadow-lg flex items-center justify-between gap-3 text-xs text-[#241711] animate-in slide-in-from-bottom-3 duration-200`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-[#8C6D58] hover:text-[#241711] p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
