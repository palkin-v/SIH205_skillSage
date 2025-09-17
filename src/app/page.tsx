
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
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


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both your name and email.",
      });
      return;
    }
    
    try {
      signIn({ displayName: name, email });
      toast({
        title: "Login Successful",
        description: "Redirecting you to the dashboard...",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        variant: "destructive",
        title: "Sign-in Failed",
        description: error.message || "An unknown error occurred during sign-in.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/50 p-4">
       <div className="absolute top-8 left-8">
         <Logo />
       </div>
      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader className="text-center">
           <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
           <CardDescription>Enter your details to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="e.g. jane.doe@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
       <p className="text-xs text-muted-foreground mt-6">
          A project by SkillSage | Your AI Career Navigator
        </p>
    </div>
  );
}
