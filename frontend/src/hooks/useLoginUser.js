import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api";

const useLogin=()=>{
    
    const queryClient = useQueryClient();
    
    const { mutate, isPending, error } = useMutation({
        mutationFn: login, //calls the function from api.js
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }), //refresh
        onError : ()=> toast.error(error?.response?.data?.message || "Something went wrong")
    });

    return { isPending, error, loginMutation: mutate };

}

export default useLogin;