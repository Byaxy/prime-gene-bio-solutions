import { getBrandOptions } from "@/server/actions/brands";
import { useQuery } from "@tanstack/react-query";

const useBrandOptions = () => {
  return useQuery({
    queryKey: ["brandOptions"],
    queryFn: async () => await getBrandOptions(),
  });
};

export default useBrandOptions;
