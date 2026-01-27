"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

// =============================================================================
// Styles
// =============================================================================

const sizeStyles = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

// =============================================================================
// Component
// =============================================================================

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  // Handle overlay click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (closeOnOverlayClick && e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-500 m-0 h-full w-full max-w-none max-h-none bg-transparent p-4 backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        "open:flex open:items-center open:justify-center"
      )}
    >
      <div
        role="document"
        className={cn(
          "relative w-full rounded-2xl bg-white p-6 shadow-elevated",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          sizeStyles[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="mb-4 flex items-start justify-between">
            <div>
              {title && (
                <h2 className="font-heading text-xl font-semibold text-sand-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-sand-600">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "rounded-lg p-2 text-sand-400 transition-colors hover:bg-sand-100 hover:text-sand-600",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500"
                )}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </dialog>
  );
}

// =============================================================================
// Modal Footer (for action buttons)
// =============================================================================

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
    >
      {children}
    </div>
  );
}
