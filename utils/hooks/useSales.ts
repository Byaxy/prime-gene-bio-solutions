import { getSales } from "@/server/actions/sales";
import { useQuery } from "@tanstack/react-query";

const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => await getSales(),
  });
};

export default useSales;
