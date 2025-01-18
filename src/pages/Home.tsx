"use client"

import { useState, useEffect } from "react";
import { Box, Container, Typography, Snackbar, Alert, AlertColor } from "@mui/material";
import CreateDelivery from "@/components/CreateDelivery";
import KanbanBoard from "@/components/KanbanBoard";
import Delivery from "@/interfaces/Delivery";
import { fetchDeliveries } from "@/services/deliveriyService";

interface Notification {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const Home: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: "",
    severity: "info",
  });

  const fetchAndSetDeliveries = async () => {
    try {
      const deliveriesData = await fetchDeliveries();
      setDeliveries(deliveriesData);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
      showNotification("Failed to fetch deliveries", "error");
    }
  };

  useEffect(() => {
    fetchAndSetDeliveries();
  }, []);

  const showNotification = (message: string, severity: AlertColor) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "", severity: "info" });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Delivery Tracker
        </Typography>
        <CreateDelivery
          fetchDeliveries={fetchDeliveries}
          setDeliveries={setDeliveries}
          showNotification={showNotification}
        />
        <KanbanBoard
          deliveries={deliveries}
          setDeliveries={setDeliveries}
          showNotification={showNotification}
          fetchDeliveries={fetchAndSetDeliveries}
        />
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
