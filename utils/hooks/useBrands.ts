import { getBrands } from "@/server/actions/brands";
import { useQuery } from "@tanstack/react-query";

const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getBrands(),
  });
};

export default useBrands;
