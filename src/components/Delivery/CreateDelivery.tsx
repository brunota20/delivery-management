"use client";

import React, { useState } from "react";
import Button from "../Button";
import Label from "../Label";
import Input from "../Input";
import { createDelivery } from "@/services/deliveriyService";

interface CreateDeliveryProps {
  fetchDeliveries: () => Promise<void>;
  showNotification: (message: string, severity: "success" | "error" | "warning") => void;
}

const CreateDelivery: React.FC<CreateDeliveryProps> = ({ fetchDeliveries, showNotification }) => {
  const [description, setDescription] = useState<string>("");

  const handleCreate = async () => {
    if (!description.trim()) {
      showNotification("Description is required", "warning");
      return;
    }

    try {
      createDelivery(description, "Pending" )
      fetchDeliveries()
      setDescription("");
      showNotification("Delivery created successfully", "success");
    } catch (error) {
      console.error("Error creating delivery:", error);
      showNotification("Failed to create delivery", "error");
    }
  };

  return (
    <div className="my-8 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Create a New Delivery</h2>
      <div className="flex flex-col gap-2">
        <Label
        label="Description"
        />
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      </div>
      <div>
      <Button
        label="Create Delivery"
        onClick={handleCreate}
        variant="primary"
        size="medium"
        />
      </div>
    </div>
  );
};

export default CreateDelivery;
