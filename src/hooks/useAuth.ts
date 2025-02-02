import { fetcher } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "@/schema/auth";
import Cookies from "js-cookie";
import { LoginResponse } from "@/interface/LoginResponse";
import { toast } from "sonner";

export const useAuth = () => {
  const { mutate, error, isPending } = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (payload: LoginSchema) =>
      fetcher<LoginResponse>("/auth/login", {
        method: "POST",
        body: payload,
      }),
    onSuccess: (data: LoginResponse) => {
      Cookies.set("token", data.data.token);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, error, isPending };
};
