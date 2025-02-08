import React from 'react';

type ButtonProps = {
  onClick: () => void;
  text: string;
  isActive?: boolean;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  isActive = false,
  isDisabled = false,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg transition-colors duration-200';
  const activeStyles = isActive
    ? 'bg-green-500 hover:bg-green-600'
    : 'bg-green-700 hover:bg-green-800';
  const disabledStyles = isDisabled ? 'bg-gray-300 cursor-not-allowed' : '';

  const variantStyles =
    variant === 'primary' ? activeStyles : 'bg-blue-500 hover:bg-blue-600';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
