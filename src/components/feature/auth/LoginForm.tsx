"use client";

import { useAuth } from "@/hooks/useAuth";
import { loginSchema, LoginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { mutate: login, error, isPending } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData: LoginSchema) => {
    login(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-sm"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          disabled={isPending}
          className="w-full px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Masukkan email Anda"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          disabled={isPending}
          className="w-full px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Masukkan password Anda"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error instanceof Error ? error.message : "Terjadi kesalahan"}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
};
