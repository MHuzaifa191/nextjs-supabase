"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/actions/auth";
import { toast } from "sonner";
import { authSchema, type AuthFormData } from "@/types/auth";

export function AuthForm({ type }: { type: "login" | "signup" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    const action = type === "login" ? signIn : signUp;
    const res = await action(data);
    
    if (res?.serverError) {
      console.error(res.serverError);
      toast.error(res.serverError);
    } else if (res?.validationErrors) {
      console.error("Validation errors:", res.validationErrors);
      toast.error("Please check your input");
    } else if (res?.data?.success) {
      toast.success(type === "login" ? "Successfully logged in" : "Successfully signed up");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
      <Input type="email" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {type === "login" ? "Login" : "Sign Up"}
      </Button>
    </form>
  );
}
