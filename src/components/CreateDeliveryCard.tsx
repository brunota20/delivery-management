"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import statusMapping from "@/utils/statusMapping";
import { createDelivery } from "@/services/deliveriyService";

interface CreateDeliveryCardProps {
  column_key: string;
  onDeliveryCreated: () => void;
}

const CreateDeliveryCard: React.FC<CreateDeliveryCardProps> = ({
  column_key,
  onDeliveryCreated,
}) => {
  const [deliveryName, setDeliveryName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDelivery = async () => {
    if (!deliveryName.trim()) return;

    setIsCreating(true);
    try {
      await createDelivery(deliveryName, statusMapping[column_key])
      onDeliveryCreated();
    } catch (error) {
      console.error("Error creating delivery:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={`p-4 rounded-md shadow-md ${isCreating ? "bg-gray-400" : "bg-white"}`}>
      <h3 className="text-lg font-semibold mb-2">Create New Delivery</h3>
      <Input
        id="delivery-name"
        type="text"
        value={deliveryName}
        onChange={(e) => setDeliveryName(e.target.value)}
        placeholder="Enter delivery name"
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button
          label={isCreating ? "Creating..." : "Create"}
          onClick={handleCreateDelivery}
          disabled={isCreating || !deliveryName.trim()}
          variant="primary"
          size="small"
        />
      </div>
    </div>
  );
};

export default CreateDeliveryCard;
