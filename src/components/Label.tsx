import React from 'react';

interface ILabelProps {
    label: string;
    htmlFor?: string;
  }

const Label: React.FC<ILabelProps> = ({
    label,
    htmlFor
}) => {
  return (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
    {label}
  </label>);
}

export default Label;