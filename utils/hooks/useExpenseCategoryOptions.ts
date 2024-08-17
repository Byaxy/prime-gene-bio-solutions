import { getExpenseCategoryOptions } from "@/server/actions/expenseCategories";
import { useQuery } from "@tanstack/react-query";

const useExpenseCategoryOptions = () => {
  return useQuery({
    queryKey: ["expensesCategoryOptions"],
    queryFn: async () => await getExpenseCategoryOptions(),
  });
};

export default useExpenseCategoryOptions;
