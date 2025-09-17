
"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  Settings,
  LifeBuoy,
  Loader2,
  BookOpen,
  LogOut,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Job Insights">
                 <Link href="/jobs">
                    <Briefcase />
                    Job Insights
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Programs">
                <Link href="/programs">
                    <BookOpen />
                    NSQF Programs
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive tooltip="Profile">
                <Link href="/profile">
                    <User />
                    Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                    <Settings />
                    Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Support">
                <LifeBuoy />
                Support
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Button variant="ghost" onClick={signOut} className="w-full justify-start text-sm">
                    <LogOut className="mr-2" /> Sign Out
                </Button>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2 border-t mt-2">
            <Avatar>
              <AvatarImage src={user.photoURL ?? ""} alt="User" />
              <AvatarFallback>{user.displayName?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sidebar-foreground">
                {user.displayName}
              </span>
              <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
           <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-1">Your Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and account details.</p>
            </div>
          <Card>
            <CardHeader>
                <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "User"} />
                        <AvatarFallback className="text-3xl">{user.displayName?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <Button>Change Picture</Button>
                        <Button variant="ghost">Remove Picture</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.displayName ?? ""} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email ?? ""} readOnly />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
