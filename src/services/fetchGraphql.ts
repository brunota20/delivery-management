import Delivery from "@/interfaces/Delivery";
import { connectToContract } from "./connectContract";


const resolvers = {
  Query: {
    deliveries: async () => {
      try {
        const contract = await connectToContract();
        const deliveries = await contract.getDeliveries();
        console.log(deliveries)

        // Parse BigInt values into numbers and format data
        return deliveries.map((delivery: Delivery) => ({
          id: delivery.id,
          description: delivery.description,
          status: delivery.status,
          customer: delivery.customer,
          timestamp: new Date(delivery.timestamp).toISOString(),
        }));
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        throw new Error("Failed to fetch deliveries.");
      }
    },
  },
};

export default resolvers;
