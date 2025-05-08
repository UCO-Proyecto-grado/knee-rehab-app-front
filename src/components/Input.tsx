import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-functional-coral focus:border-functional-coral focus:ring-functional-coral' : 'border-background-dark focus:border-functional-blue-light focus:ring-functional-blue-light';
    
    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label className="block text-typography-primary mb-2 font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`bg-background-dark text-typography-secondary rounded-md py-2 px-4 border focus:outline-none focus:ring-1 transition-all duration-200 ${errorClass} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-functional-coral text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;