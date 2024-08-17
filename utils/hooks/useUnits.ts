import { getUnits } from "@/server/actions/units";
import { useQuery } from "@tanstack/react-query";

const useUnits = () => {
  return useQuery({
    queryKey: ["units"],
    queryFn: async () => await getUnits(),
  });
};

export default useUnits;
