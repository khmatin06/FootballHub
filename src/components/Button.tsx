import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full font-bold tracking-wide
        transition-all duration-200 ease-in-out
        active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variant === 'primary' ? 'bg-green-700 hover:bg-green-600 text-white border border-green-600' : ''}
        ${variant === 'secondary' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : ''}
        ${variant === 'gold' ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 border border-yellow-500 font-extrabold' : ''}
        ${variant === 'danger' ? 'bg-red-700/80 hover:bg-red-600 text-white border border-red-600' : ''}
        ${size === 'sm' ? 'px-3 py-1.5 text-xs' : ''}
        ${size === 'md' ? 'px-5 py-2.5 text-sm' : ''}
        ${size === 'lg' ? 'px-8 py-3.5 text-base' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
