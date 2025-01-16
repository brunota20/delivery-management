// src/components/FilterDeliveryStatus.tsx
import React from "react";
import { TextField } from "@mui/material";
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
    <TextField
      label="Search by Description"
      variant="outlined"
      fullWidth
      defaultValue={filterText}
      onChange={handleChange}
      sx={{ my: 2 }}
    />
  );
};

export default FilterDeliveryStatus;
