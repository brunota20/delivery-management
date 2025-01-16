import { useState, useMemo } from "react";
import Delivery from "../interfaces/Delivery";

export function useDeliveryFilter(deliveries: Delivery[]) {
  const [filterText, setFilterText] = useState("");

  const filteredDeliveries = useMemo(() => {
    if (!Array.isArray(deliveries)) return [];
    return deliveries.filter((delivery) =>
      delivery.description.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, deliveries]);

  return {
    filterText,
    setFilterText,
    filteredDeliveries,
  };
}
