import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import toast from "react-hot-toast";

const useOnboarding = () => {
  const queryClient = useQueryClient();

  const handleSuccess = async () => {
    toast.success("Profile onboarded successfully");
    await queryClient.invalidateQueries({ queryKey: ["authUser"] }); // better than refetch here
  };

  const handleError = (error) => {
    toast.error(error?.response?.data?.message || "Something went wrong");
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return { onboardingMutation: mutate };
};

export default useOnboarding;
