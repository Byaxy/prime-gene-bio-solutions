import { getProductOptions } from "@/server/actions/products";
import { useQuery } from "@tanstack/react-query";

const useProductOptions = () => {
  return useQuery({
    queryKey: ["productOptions"],
    queryFn: async () => await getProductOptions(),
  });
};

export default useProductOptions;
