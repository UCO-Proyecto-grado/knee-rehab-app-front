import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
  fullWidth = false,
}) => {
  const baseClasses = 'py-2 px-4 rounded-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: 'bg-functional-blue-light hover:bg-functional-blue-dark text-white focus:ring-functional-blue-light',
    secondary: 'bg-functional-green-light hover:bg-functional-blue-medium text-background focus:ring-functional-green-light',
    outline: 'bg-transparent border border-functional-blue-light text-functional-blue-light hover:bg-functional-blue-light hover:text-white focus:ring-functional-blue-light',
    danger: 'bg-functional-coral hover:bg-red-700 text-white focus:ring-functional-coral',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;