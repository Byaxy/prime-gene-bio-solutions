import { getCustomers } from "@/server/actions/customers";
import { useQuery } from "@tanstack/react-query";

const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => await getCustomers(),
  });
};

export default useCustomers;
