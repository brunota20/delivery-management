"use client"

import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import FilterDeliveryStatus from "./FilterDeliveryStatus";

import handleUpdateLogic from "@/hooks/useHandleUpdate";
import Delivery from "@/interfaces/Delivery";
import { useDeliveryFilter } from "@/hooks/useDeliveryFilter";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  deliveries: Delivery[];
  setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
  showNotification: (message: string, severity: "success" | "error" | "warning") => void;
  fetchDeliveries: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  deliveries,
  setDeliveries,
  showNotification,
  fetchDeliveries,
}) => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [groupedDeliveries, setGroupedDeliveries] = useState<{ [key: string]: Delivery[] }>({});

  const { filterText, setFilterText, filteredDeliveries } = useDeliveryFilter(deliveries);

  const statusMapping: { [key: string]: string } = {
    0: "Pending",
    1: "In progress",
    2: "Completed",
  };

  // Group deliveries by status
  useEffect(() => {
    const grouped = Object.keys(statusMapping).reduce((acc, key) => {
      const status = statusMapping[key];
      acc[key] = filteredDeliveries.filter(
        (delivery) => delivery.status === status
      );
      return acc;
    }, {} as { [key: string]: Delivery[] });
    setGroupedDeliveries(grouped);
  }, [filteredDeliveries]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    setLoadingStates((prev) => ({ ...prev, [draggableId]: true }));

    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === draggableId
        ? { ...delivery, status: statusMapping[destination.droppableId] }
        : delivery
    );

    setDeliveries(updatedDeliveries);

    await handleUpdateLogic({
      selectedDelivery: draggableId,
      selectedStatus: statusMapping[destination.droppableId],
      showNotification,
      fetchDeliveries,
      setLoading: (loading: boolean) =>
        setLoadingStates((prev) => ({ ...prev, [draggableId]: loading })),
    });

    setLoadingStates((prev) => ({ ...prev, [draggableId]: false }));
  };

  const handleDeleteDelivery = (deliveryId: string) => {
    const updatedDeliveries = deliveries.filter((delivery) => delivery.id !== deliveryId);
    setDeliveries(updatedDeliveries);

    // Re-group deliveries after deletion
    setGroupedDeliveries((prev) => {
      const updatedGrouped = { ...prev };
      Object.keys(updatedGrouped).forEach((key) => {
        updatedGrouped[key] = updatedGrouped[key].filter(
          (delivery) => delivery.id !== deliveryId
        );
      });
      return updatedGrouped;
    });
  };

  return (
    <Box>
      <FilterDeliveryStatus
        filterText={filterText}
        setFilterText={setFilterText}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            my: 4,
            gap: 2,
            overflowY: "auto",
            '@media (max-width: 768px)': {
              justifyContent: "center",
              flexWrap: "wrap",
            },
          }}
        >
          {Object.entries(statusMapping).map(([key, status]) => (
            <KanbanColumn
              key={key}
              column_key={key}
              status={status}
              groupedDeliveries={groupedDeliveries}
              setGroupedDeliveries={setGroupedDeliveries}
              loadingStates={loadingStates}
              onDeleteDelivery={handleDeleteDelivery}
            />
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;