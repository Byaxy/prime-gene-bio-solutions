import { getCustomerOptions } from "@/server/actions/customers";
import { useQuery } from "@tanstack/react-query";

const useCustomerOptions = () => {
  return useQuery({
    queryKey: ["customerOptions"],
    queryFn: async () => await getCustomerOptions(),
  });
};

export default useCustomerOptions;
