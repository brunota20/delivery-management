import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import DeliveryCard from "./DeliveryCard";
import Delivery from "../interfaces/Delivery";

interface KanbanColumnProps {
  column_key: string;
  status: string;
  groupedDeliveries: { [key: string]: Delivery[] };
  setGroupedDeliveries: React.Dispatch<React.SetStateAction<{ [key: string]: Delivery[] }>>;
  loadingStates: { [key: string]: boolean };
  onDeleteDelivery: (deliveryId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column_key,
  status,
  groupedDeliveries,
  setGroupedDeliveries,
  loadingStates,
  onDeleteDelivery,
}) => {
  return (
    <div className="flex flex-col p-4 bg-gray-100 w-72 h-[600px] gap-4 box-border">
      <h3 className="text-lg font-bold">{status}</h3>

      <Droppable droppableId={column_key}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-full"
          >
            {groupedDeliveries[column_key]?.map((delivery, index) => (
              <DeliveryCard
                key={delivery.id}
                column_key={column_key}
                index={index}
                delivery={delivery}
                loading={loadingStates[delivery.id] || false}
                onDeleteDelivery={onDeleteDelivery}
                groupedDeliveries={groupedDeliveries}
                setGroupedDeliveries={setGroupedDeliveries}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
