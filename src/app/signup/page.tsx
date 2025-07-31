import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <AuthForm type="signup" />
    </div>
  );
}
