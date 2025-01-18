// src/components/FilterDeliveryStatus.tsx
import React from "react";
import { useDebouncedFunction } from "@/hooks/useDebouncedFunction";
import Label from "./Label";
import Input from "./Input";

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
      <Label
        label="Search by Description"
        htmlFor="search"
        />
      <Input
        id="search"
        type="text"
        defaultValue={filterText}
        onChange={handleChange}
        placeholder="Enter description..."
      />
      <input
      />
    </div>
  );
  
};

export default FilterDeliveryStatus;
