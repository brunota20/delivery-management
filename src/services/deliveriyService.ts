import Delivery from "@/interfaces/Delivery";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchDeliveries = async (): Promise<Delivery[]> => {
  const response = await axios.get<{ deliveries: Delivery[] }>(`${API_BASE_URL}/get-deliveries`);
  return response.data.deliveries || [];
};

export const createDelivery = async (description: string, status: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-delivery`, {
      description,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating delivery:", error);
    throw error;
  }
};
