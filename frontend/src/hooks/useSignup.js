import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup, //calls the function from api.js
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }), //refresh
  });

  return { isPending, error, signupMutation: mutate };
};
export default useSignUp;