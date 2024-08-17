import { getTypeOptions } from "@/server/actions/types";
import { useQuery } from "@tanstack/react-query";

const useTypeOptions = () => {
  return useQuery({
    queryKey: ["typeOptions"],
    queryFn: async () => await getTypeOptions(),
  });
};

export default useTypeOptions;
