import { getTypes } from "@/server/actions/types";
import { useQuery } from "@tanstack/react-query";

const useTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: async () => await getTypes(),
  });
};

export default useTypes;
