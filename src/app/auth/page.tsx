"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { Logo } from "@/components/logo";

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/50 p-4">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <AuthForm />
    </div>
  );
} 