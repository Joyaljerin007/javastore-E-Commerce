import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icon =
            toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-sky-500 shrink-0" />
            );

          const borderBg =
            toast.type === 'success'
              ? 'border-emerald-200 bg-emerald-50/95 text-emerald-950 dark:bg-emerald-950/90 dark:border-emerald-800 dark:text-emerald-100'
              : toast.type === 'error'
              ? 'border-rose-200 bg-rose-50/95 text-rose-950 dark:bg-rose-950/90 dark:border-rose-800 dark:text-rose-100'
              : toast.type === 'warning'
              ? 'border-amber-200 bg-amber-50/95 text-amber-950 dark:bg-amber-950/90 dark:border-amber-800 dark:text-amber-100'
              : 'border-sky-200 bg-sky-50/95 text-sky-950 dark:bg-sky-950/90 dark:border-sky-800 dark:text-sky-100';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md ${borderBg}`}
            >
              {icon}
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
                <p className="text-xs opacity-90 mt-0.5 leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4 opacity-60 hover:opacity-100" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
