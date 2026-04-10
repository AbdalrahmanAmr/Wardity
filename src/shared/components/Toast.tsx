import { FC, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

const ICON_MAP: Record<ToastVariant, FC<{ className?: string }>> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const COLOR_MAP: Record<ToastVariant, string> = {
  success: "bg-green-50 border-green-300 text-green-800",
  error: "bg-red-50 border-red-300 text-red-800",
  warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
  info: "bg-blue-50 border-blue-300 text-blue-800",
};

const ICON_COLOR_MAP: Record<ToastVariant, string> = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

interface ToastProps {
  item: ToastItem;
  onDismiss: (id: number) => void;
}

export const Toast: FC<ToastProps> = ({ item, onDismiss }) => {
  const Icon = ICON_MAP[item.variant];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(item.id), 4000);
    return () => clearTimeout(timer);
  }, [item.id, onDismiss]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-down ${COLOR_MAP[item.variant]}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${ICON_COLOR_MAP[item.variant]}`} />
      <p className="text-sm font-medium flex-1">{item.message}</p>
      <button
        onClick={() => onDismiss(item.id)}
        className="flex-shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors"
        aria-label="Dismiss"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

// Global toast state
let toastListeners: Array<(toasts: ToastItem[]) => void> = [];
let toasts: ToastItem[] = [];
let nextId = 1;

function emitChange(): void {
  toastListeners.forEach((listener) => listener([...toasts]));
}

function addToast(message: string, variant: ToastVariant): void {
  toasts = [...toasts, { id: nextId++, message, variant }];
  emitChange();
}

function removeToast(id: number): void {
  toasts = toasts.filter((t) => t.id !== id);
  emitChange();
}

export function useToast() {
  return {
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    warning: (message: string) => addToast(message, "warning"),
    info: (message: string) => addToast(message, "info"),
  };
}

export const ToastContainer: FC = () => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    toastListeners.push(setItems);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setItems);
    };
  }, []);

  const handleDismiss = useCallback((id: number) => removeToast(id), []);

  if (items.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      {items.map((item) => (
        <Toast key={item.id} item={item} onDismiss={handleDismiss} />
      ))}
    </div>,
    document.body,
  );
};
