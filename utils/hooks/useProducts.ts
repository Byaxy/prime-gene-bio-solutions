import { getProducts } from "@/server/actions/products";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });
};

export default useProducts;
