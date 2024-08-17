import { getExpenseCategories } from "@/server/actions/expenseCategories";
import { useQuery } from "@tanstack/react-query";

const useExpenseCategories = () => {
  return useQuery({
    queryKey: ["expensesCategories"],
    queryFn: async () => await getExpenseCategories(),
  });
};

export default useExpenseCategories;
