import { getUnitOptions } from "@/server/actions/units";
import { useQuery } from "@tanstack/react-query";

const useUnitOptions = () => {
  return useQuery({
    queryKey: ["unitOptions"],
    queryFn: async () => await getUnitOptions(),
  });
};

export default useUnitOptions;
