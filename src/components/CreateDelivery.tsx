"use client"
import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";

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
    <Box sx={{ my: 4 }}>
      <Typography variant="h6">Create a New Delivery</Typography>
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ my: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Delivery
      </Button>
    </Box>
  );
};

export default CreateDelivery;