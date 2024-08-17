import { getCategories } from "@/server/actions/categories";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });
};

export default useCategories;
