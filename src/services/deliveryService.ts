import { connectToContract } from "./connectContract";

// Create a new delivery
export const createDelivery = async (description: string, status: string) => {
  try {
    const contract = await connectToContract();
    const tx = await contract.createDelivery(description, status);
    await tx.wait();
    console.log("Delivery created:", tx);
  } catch (error) {
    console.error("Error creating delivery:", error);
    throw error;
  }
};

// Update an existing delivery status
export const updateDeliveryStatus = async (deliveryId: string, status: string) => {
  try {
    const contract = await connectToContract();
    const tx = await contract.updateDeliveryStatus(deliveryId, status);
    await tx.wait();
    console.log(`Delivery ${deliveryId} updated to ${status}`);
  } catch (error) {
    console.error("Error updating delivery status:", error);
    throw error;
  }
};

// Delete a delivery
export const deleteDelivery = async (deliveryId: number) => {
  try {
    const contract = await connectToContract();
    const tx = await contract.deleteDelivery(deliveryId);
    await tx.wait();
    console.log(`Delivery ${deliveryId} deleted.`);
  } catch (error) {
    console.error("Error deleting delivery:", error);
    throw error;
  }
};
