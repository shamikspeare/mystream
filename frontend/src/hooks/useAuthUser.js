import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    authUser: data?.user,
    isLoading,
    isError,
  };
};

export default useAuthUser;
