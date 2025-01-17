"use client";

import React, { useState } from "react";
import axios from "axios";

interface CreateDeliveryProps {
  fetchDeliveries: () => void;
  showNotification: (message: string, severity: "success" | "error" | "warning") => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateDelivery: React.FC<CreateDeliveryProps> = ({ fetchDeliveries, showNotification }) => {
  const [description, setDescription] = useState<string>("");

  const handleCreate = async () => {
    if (!description.trim()) {
      showNotification("Description is required", "warning");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/create-delivery`, { description });
      fetchDeliveries();
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Delivery
      </button>
      </div>
    </div>
  );
};

export default CreateDelivery;
