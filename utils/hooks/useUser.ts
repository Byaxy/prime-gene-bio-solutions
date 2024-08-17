import { getUser } from "@/server/actions/users";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
};

export default useUser;
