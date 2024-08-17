import { getUsers } from "@/server/actions/users";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });
};

export default useUsers;
