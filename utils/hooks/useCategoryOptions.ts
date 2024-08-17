import { getCategoryOptions } from "@/server/actions/categories";
import { useQuery } from "@tanstack/react-query";

const useCategoryOptions = () => {
  return useQuery({
    queryKey: ["categoryOptions"],
    queryFn: async () => await getCategoryOptions(),
  });
};

export default useCategoryOptions;
