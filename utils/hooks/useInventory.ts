import { getInventory } from "@/server/actions/inventory";
import { useQuery } from "@tanstack/react-query";

const useInventory = () => {
  return useQuery({
    queryKey: ["invetory"],
    queryFn: async () => await getInventory(),
  });
};

export default useInventory;
