"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onClose: () => void;
  size?: "md" | "lg";
  footer?: React.ReactNode;
};

const focusable = (
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable=true]'
);

export default function Modal({ title, children, primaryLabel, onPrimary, secondaryLabel, onSecondary, onClose, size = "md", footer }: ModalProps) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActive = useRef<Element | null>(null);

  useLayoutEffect(() => {
    lastActive.current = document.activeElement;
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "Tab") {
        const node = modalRef.current;
        if (!node) return;
        const els = Array.from(node.querySelectorAll<HTMLElement>(focusable)).filter(el => el.offsetParent !== null);
        if (els.length === 0) {
          e.preventDefault();
          (node as HTMLElement).focus();
          return;
        }
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
    document.addEventListener("keydown", onKey);
    const node = modalRef.current;
    // initial focus
    requestAnimationFrame(() => {
      const els = node ? Array.from(node.querySelectorAll<HTMLElement>(focusable)) : [];
      if (els.length) els[0].focus();
      else node?.focus();
    });
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setVisible(false);
      try { (lastActive.current as HTMLElement | null)?.focus?.(); } catch {}
      onClose();
    }, 200);
  }

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className={`m360-overlay${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        ref={modalRef}
        className={`m360-modal${closing ? " is-closing" : ""}`}
        role="document"
        tabIndex={-1}
        style={{ width: size === "lg" ? "min(640px,92vw)" : "min(560px,92vw)" }}
      >
        <h2 className="m360-modal-title">{title}</h2>
        {typeof children !== "undefined" && children}
        {footer !== undefined ? (
          <div className="m360-actions">{footer}</div>
        ) : (
          (primaryLabel || secondaryLabel) && (
            <div className="m360-actions">
              {secondaryLabel && (
                <button type="button" className="btn btn-ghost" onClick={onSecondary || handleClose}>{secondaryLabel}</button>
              )}
              {primaryLabel && (
                <button type="button" className="btn btn-primary" onClick={onPrimary || handleClose}>{primaryLabel}</button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
