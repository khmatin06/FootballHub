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

const variantClasses = {
  primary: 'bg-green-700 hover:bg-green-600 text-white border border-green-600',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  gold: 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 border border-yellow-500 font-extrabold',
  danger: 'bg-red-700/80 hover:bg-red-600 text-white border border-red-600',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const buttonClass = `
    rounded-lg font-bold tracking-wide
    transition-all duration-200 ease-in-out
    active:scale-95
    disabled:opacity-40 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
}