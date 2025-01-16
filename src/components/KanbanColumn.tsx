import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import DeliveryCard from "./DeliveryCard";
import Delivery from "../interfaces/Delivery";


// Define the types for the props
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
    <Droppable droppableId={column_key}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            backgroundColor: "#f4f5f7",
            width: "300px",
            height: "600px",
            margin: "8px",
            boxSizing: "border-box",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <h3 style={{ margin: 0 }}>{status}</h3>
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
  );
};

export default KanbanColumn;
