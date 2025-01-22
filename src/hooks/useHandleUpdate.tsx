import { updateDeliveryStatus } from "@/services/deliveryService";
import HTTP_STATUS from "@/utils/httpStatus";
import axios from "axios";

// Define types for the function parameters
interface HandleUpdateLogicParams {
  selectedDelivery: string | null;
  selectedStatus: string | null;
  showNotification: (message: string, type: "success" | "warning" | "error") => void;
  fetchDeliveries: () => void;
  setLoading: (loading: boolean) => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const handleUpdateLogic = async ({
  selectedDelivery,
  selectedStatus,
  showNotification,
  fetchDeliveries,
  setLoading,
}: HandleUpdateLogicParams) => {
  if (!selectedDelivery || !selectedStatus) {
    showNotification("Delivery ID and status are required", "warning");
    return;
  }

  try {
    const response = await updateDeliveryStatus(selectedDelivery, selectedStatus)

    if (response.status === HTTP_STATUS.NO_CONTENT) {
      setLoading(true);
    } else if (response.status === HTTP_STATUS.OK) {
      setLoading(false);
      fetchDeliveries();
      showNotification("Delivery status updated successfully", "success");
    }
  } catch (error) {
    console.error("Error updating delivery status:", error);
    setLoading(false);
    showNotification("Failed to update delivery status", "error");
  }
};

export default handleUpdateLogic;
