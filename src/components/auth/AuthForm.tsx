"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { signIn, user, loading } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both your name and email.",
      });
      return;
    }
    signIn("credentials", { callbackUrl: "/dashboard" }, { displayName: name, email });
    toast({ title: "Login Successful", description: "Redirecting you to the dashboard..." });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
      });
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-[420px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your details to access your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="e.g. Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="e.g. jane.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Sign In</Button>
          <Button type="button" variant="outline" className="w-full flex items-center gap-2" onClick={handleGoogleSignIn}>
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 