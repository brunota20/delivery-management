import axios from "axios";
import Delivery from "../interfaces/Delivery";

// Define types for the function parameters
interface HandleDeleteLogicParams {
  setIsModalOpen: (open: boolean) => void;
  setIsDeleting: (deleting: boolean) => void;
  delivery: { id: string };
  onDeleteDelivery: (deliveryId: string) => void;
  groupedDeliveries: { [key: string]: Delivery[] };
  column_key: string;
  setGroupedDeliveries: React.Dispatch<React.SetStateAction<{ [key: string]: Delivery[] }>>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleDeleteLogic = async ({
  setIsModalOpen,
  setIsDeleting,
  delivery,
  onDeleteDelivery,
  groupedDeliveries,
  column_key,
  setGroupedDeliveries,
}: HandleDeleteLogicParams) => {
  setIsModalOpen(false);
  setIsDeleting(true);

  try {
    const response = await axios.delete(`${API_BASE_URL}/delivery`, {
      params: { id: delivery.id },
    });

    if (response.status === 200) {
      onDeleteDelivery(delivery.id);

      const updatedGroup = {
        ...groupedDeliveries,
        [column_key]: groupedDeliveries[column_key].filter(
          (item) => item.id !== delivery.id
        ),
      };

      setGroupedDeliveries(updatedGroup);
    } else {
      console.error("Failed to delete delivery: Unexpected response status");
    }
  } catch (error) {
    console.error("Failed to delete delivery:", error);
  } finally {
    setIsDeleting(false);
  }
};

export default handleDeleteLogic;
