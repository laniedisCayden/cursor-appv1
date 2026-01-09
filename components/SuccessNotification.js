"use client";

import { useState, useEffect } from "react";

/**
 * Reusable success notification component
 * @param {boolean} visible - Whether the notification is visible
 * @param {boolean} shouldAnimate - Whether to trigger bounce animation
 * @param {string} message - Notification message
 * @param {string} variant - 'success' or 'error' (determines color)
 * @param {function} onClose - Callback when notification should be dismissed
 */
export function SuccessNotification({
  visible,
  shouldAnimate,
  message,
  variant = "success",
  onClose,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Fade-out effect after delay, cancelled if hovered
  useEffect(() => {
    if (visible && !shouldAnimate && !isHovered) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [visible, shouldAnimate, isHovered, onClose]);

  if (!visible) return null;

  const bgColor = variant === "error" ? "bg-red-600" : "bg-green-600";
  const hoverColor = "hover:text-white/80";

  return (
    <div
      className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-lg ${bgColor} px-3 py-2 shadow-md flex items-center gap-2 min-w-[220px] text-white
        transition-opacity duration-1000 ${!shouldAnimate && !isHovered ? 'opacity-0' : 'opacity-100'}
        ${shouldAnimate ? 'animate-bounce-in' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'auto' }}
    >
      {variant === "error" && (
        <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      )}
      <span className="font-semibold text-sm text-white text-center">{message}</span>
      <button 
        onClick={() => {
          if (onClose) onClose();
          setIsHovered(false);
        }} 
        className={`ml-auto text-white ${hoverColor} rounded`} 
        title="Close" 
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
