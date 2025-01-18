import React from "react";

interface IButtonProps {
  label: string; // Text to display on the button
  onClick: () => void; // Function to handle click events
  disabled?: boolean; // Disable the button
  variant?: "primary" | "secondary" | "danger" | "default"; // Button style variants
  size?: "small" | "medium" | "large"; // Size variants
}

const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = "default",
  size = "medium",
}) => {
  const baseStyles = "rounded-md font-medium focus:outline-none transition-all";
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${
        disabled ? disabledStyles : variantStyles[variant]
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
