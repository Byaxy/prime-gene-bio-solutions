import { getExpenses } from "@/server/actions/expenses";
import { useQuery } from "@tanstack/react-query";

const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => await getExpenses(),
  });
};

export default useExpenses;
