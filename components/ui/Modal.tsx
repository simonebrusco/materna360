"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClass?: string; // optional: e.g. "max-w-md" | "max-w-lg"
  hideClose?: boolean;
};

export default function Modal({ open, onClose, title, children, footer, widthClass = "max-w-lg", hideClose }: ModalProps) {
  // Guard SSR
  if (typeof window === "undefined") return null;

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div className="modal-root" aria-modal="true" role="dialog">
      <div className="modal-backdrop" onClick={onClose} />
      <div className={`modal-panel ${widthClass}`} role="document" onClick={(e)=>e.stopPropagation()}>
        {title ? (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            {!hideClose && (
              <button type="button" aria-label="Fechar" className="modal-x" onClick={onClose}>×</button>
            )}
          </div>
        ) : !hideClose ? (
          <button type="button" aria-label="Fechar" className="modal-x modal-x--floating" onClick={onClose}>×</button>
        ) : null}

        <div className="modal-body">{children}</div>

        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, document.body);
}
