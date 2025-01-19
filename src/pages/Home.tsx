"use client";

import { useState, useEffect } from "react";
import CreateDelivery from "@/components/Delivery/CreateDelivery";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import Delivery from "@/interfaces/Delivery";
import { fetchDeliveries } from "@/services/deliveriyService";
import { RainbowKitButton } from "@/components/RaibowKitButton";

interface Notification {
  open: boolean;
  message: string;
  severity: "info" | "success" | "warning" | "error";
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

  const showNotification = (message: string, severity: "info" | "success" | "warning" | "error") => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "", severity: "info" });
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">Delivery Tracker</h1>
        <RainbowKitButton />
      </div>
      <div className="space-y-6">
        <CreateDelivery
          fetchDeliveries={fetchAndSetDeliveries}
          showNotification={showNotification}
        />
        <KanbanBoard
          deliveries={deliveries}
          setDeliveries={setDeliveries}
          showNotification={showNotification}
          fetchDeliveries={fetchAndSetDeliveries}
        />
      </div>

      {/* Notification */}
      {notification.open && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white z-50 ${
            notification.severity === "success"
              ? "bg-green-500"
              : notification.severity === "error"
              ? "bg-red-500"
              : notification.severity === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
          role="alert"
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={handleCloseNotification}
              className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;