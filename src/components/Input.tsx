import React, { forwardRef, ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, icon, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error
      ? 'border-functional-coral focus:border-functional-coral focus:ring-functional-coral'
      : 'border-background-dark focus:border-functional-blue-light focus:ring-functional-blue-light';
    const paddingLeftClass = icon ? 'pl-10' : 'px-4';

    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label className="block text-typography-primary mb-2 font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-secondary">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`bg-background-dark text-typography-secondary rounded-md py-2 ${paddingLeftClass} border focus:outline-none focus:ring-1 transition-all duration-200 ${errorClass} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-functional-coral text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
