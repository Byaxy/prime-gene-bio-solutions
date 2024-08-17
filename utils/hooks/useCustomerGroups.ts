import { getCustomerGroups } from "@/server/actions/customerGroups";
import { useQuery } from "@tanstack/react-query";

const useCustomerGroups = () => {
  return useQuery({
    queryKey: ["customerGroups"],
    queryFn: async () => await getCustomerGroups(),
  });
};

export default useCustomerGroups;
