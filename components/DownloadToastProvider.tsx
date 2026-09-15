"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Toast = {
  id: number;
  message: string;
  leaving: boolean;
};

type ToastContextValue = {
  showDownloadToast: (fileName?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const VISIBLE_DURATION = 3700;
const EXIT_DURATION = 280;

export default function DownloadToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_DURATION);
  }, []);

  const showDownloadToast = useCallback(
    (fileName = "Daniel-De-Torres-CV.pdf") => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message: fileName, leaving: false }]);
      setTimeout(() => dismiss(id), VISIBLE_DURATION);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showDownloadToast }}>
      {children}
      <div className="toast-viewport" aria-live="polite">
        {toasts.map((toast) => (
          <div
            className={`toast${toast.leaving ? " leaving" : ""}`}
            key={toast.id}
            role="status"
          >
            <div className="toast-icon">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </div>
            <div className="toast-body">
              <div className="toast-title">CV downloaded</div>
              <div className="toast-message">
                {toast.message} is on its way to your downloads folder.
              </div>
            </div>
            <button
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={() => dismiss(toast.id)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <div className="toast-progress">
              <i style={{ animationDuration: `${VISIBLE_DURATION}ms` }}></i>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useDownloadToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      "useDownloadToast must be used within a DownloadToastProvider",
    );
  }
  return ctx;
}
