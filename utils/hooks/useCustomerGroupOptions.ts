import { getCustomerGroupOptions } from "@/server/actions/customerGroups";
import { useQuery } from "@tanstack/react-query";

const useCustomerGroupOptions = () => {
  return useQuery({
    queryKey: ["customerGroupOptions"],
    queryFn: async () => await getCustomerGroupOptions(),
  });
};

export default useCustomerGroupOptions;
