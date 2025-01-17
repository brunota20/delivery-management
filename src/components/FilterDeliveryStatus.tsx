// src/components/FilterDeliveryStatus.tsx
import React from "react";
import { useDebouncedFunction } from "@/hooks/useDebouncedFunction";

interface FilterDeliveryStatusProps {
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDeliveryStatus: React.FC<FilterDeliveryStatusProps> = ({
  filterText,
  setFilterText,
}) => {
  const debouncedSetFilterText = useDebouncedFunction((text: string) => {
    setFilterText(text);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterText(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
        Search by Description
      </label>
      <input
        id="search"
        type="text"
        defaultValue={filterText}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter description..."
      />
    </div>
  );
  
};

export default FilterDeliveryStatus;
