"use client"

import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

import Delivery from "@/interfaces/Delivery";
import handleDeleteLogic from "@/hooks/useHandleDelete";


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
      draggableId={delivery.id}
      index={index}
      isDragDisabled={loading || isDeleting}
    >
      {(provided, snapShot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            marginBottom: "8px",
            backgroundColor: snapShot.draggingOver ? "lightgray" : "white",
          }}
        >
          <Card
            sx={{
              backgroundColor: isDeleting ? "red" : loading ? "gray" : "white",
              transition: "background-color 0.3s ease",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6">{delivery.description}</Typography>
              <Typography color="textSecondary">
                Status: {delivery.status}
              </Typography>
              <Typography color="textSecondary">ID: {delivery.id}</Typography>
              <Typography color="textSecondary">
                Timestamp: {new Date(delivery.timestamp * 1000).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="error"
                onClick={() => setIsModalOpen(true)}
                disabled={loading || isDeleting}
                sx={{ marginLeft: "auto" }}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </CardActions>
          </Card>
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