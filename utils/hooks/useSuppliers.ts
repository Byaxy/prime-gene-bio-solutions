import { getSuppliers } from "@/server/actions/suppliers";
import { useQuery } from "@tanstack/react-query";

const useSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => await getSuppliers(),
  });
};

export default useSuppliers;
