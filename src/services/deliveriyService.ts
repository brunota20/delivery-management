import Delivery from "@/interfaces/Delivery";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log(API_BASE_URL)

export const fetchDeliveries = async (): Promise<Delivery[]> => {
  const response = await axios.get<{ deliveries: Delivery[] }>(`${API_BASE_URL}/get-deliveries`);
  return response.data.deliveries || [];
};