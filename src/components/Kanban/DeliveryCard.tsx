"use client";

import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Delivery from "@/interfaces/Delivery";
import handleDeleteLogic from "@/hooks/useHandleDelete";
import Button from "../Button";

interface DeliveryCardProps {
  column_key: string;
  index: number;
  delivery: Delivery;
  loading: boolean;
  onDeleteDelivery: (deliveryId: string) => void;
  groupedDeliveries: { [key: string]: Delivery[] };
  setGroupedDeliveries: React.Dispatch<React.SetStateAction<{ [key: string]: Delivery[] }>>;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  column_key,
  index,
  delivery,
  loading,
  onDeleteDelivery,
  groupedDeliveries,
  setGroupedDeliveries,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <Draggable
      draggableId={delivery.id.toString()}
      index={index}
      isDragDisabled={loading || isDeleting}
    >
      {(provided, snapShot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 rounded-md gap-2 shadow-md transition-transform duration-200 ${
            snapShot.isDragging ? "transform scale-105 bg-gray-200" : ""
          } ${
            snapShot.draggingOver
              ? "bg-gray-200"
              : isDeleting
              ? "bg-red-500"
              : loading
              ? "bg-gray-400"
              : "bg-white"
          }`}          
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold">{delivery.description}</h3>
            <p className="text-sm text-gray-600">Status: {delivery.status}</p>
            <p className="text-sm text-gray-600">ID: {delivery.id.toString()}</p>
            <p className="text-sm text-gray-600">
            Timestamp: {new Date(Number(delivery.timestamp) * 1000).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-end p-2">
            <Button
            label={isDeleting ? "Deleting..." : "Delete"}
            onClick={() => setIsModalOpen(true)}
            variant="danger"
            size="small"
            />
          </div>
          <DeleteConfirmationModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() =>
              handleDeleteLogic({
                setIsModalOpen,
                setIsDeleting,
                delivery,
                onDeleteDelivery,
                groupedDeliveries,
                column_key,
                setGroupedDeliveries,
              })
            }
            isDeleting={isDeleting}
          />
        </div>
      )}
    </Draggable>
  );
};

export default DeliveryCard;
