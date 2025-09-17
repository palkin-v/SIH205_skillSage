
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // The redirect will be handled by the useAuth hook,
      // so we might not even reach this point if redirect is used.
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast({
        variant: "destructive",
        title: "Sign-in Failed",
        description: error.message || "An unknown error occurred during sign-in.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center p-8 space-y-6 md:p-12 rounded-xl">
        <Logo className="text-4xl" />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome to SkillSage
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your personalized skilling assistant for a future-ready career.
          </p>
        </div>
        <div className="w-full max-w-sm pt-6">
          <Button
            onClick={handleLogin}
            className="w-full text-lg"
            size="lg"
            variant="outline"
          >
            <FcGoogle className="mr-2" /> Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
