import React from 'react';

interface IInputProps {
    id: string;
    type: string;
    value?: string;
    defaultValue?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }

const Input: React.FC<IInputProps> = ({
  id,
  type,
  value,
  defaultValue,
  onChange,
  placeholder,
}) => {
  return (
  <input 
    id={id} 
    type={type}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    placeholder={placeholder}
    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
  </input>);
}          

export default Input;