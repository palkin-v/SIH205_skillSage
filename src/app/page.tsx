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
  Sparkles,
  BookOpen,
} from "lucide-react";
import { LearnerProfileForm, FormSchema } from "@/components/dashboard/learner-profile-form";
import { generatePathwaysAction } from "@/app/actions";
import type { GeneratePersonalizedTrainingPathwaysOutput } from "@/ai/flows/generate-personalized-training-pathways";
import { useToast } from "@/hooks/use-toast";
import { PathwayDisplay } from "@/components/dashboard/pathway-display";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { DashboardHeader } from "@/components/dashboard/header";
import { Logo } from "@/components/logo";

export default function DashboardPage() {
  const [pathwayData, setPathwayData] = React.useState<GeneratePersonalizedTrainingPathwaysOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (values: FormSchema) => {
    setIsLoading(true);
    setPathwayData(null);
    try {
      const result = await generatePathwaysAction(values);
      setPathwayData(result);
      toast({
        title: "Pathways Generated",
        description: "Your personalized career pathways are ready.",
      });
    } catch (error) {
      console.error("Error generating pathways:", error);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Failed to generate pathways. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Profile">
                <User />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Programs">
                <BookOpen />
                NSQF Programs
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Settings">
                <Settings />
                Settings
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
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/1/40/40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sidebar-foreground">
                Guest User
              </span>
              <span className="text-sidebar-foreground/70">guest@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <DashboardHeader />
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LearnerProfileForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              <div className="mt-8">
                {isLoading && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <Loader2 className="animate-spin" />
                      Generating your personalized pathways...
                    </div>
                    <div className="space-y-4">
                       <PathwayDisplay.Skeleton />
                    </div>
                  </div>
                )}
                {pathwayData ? (
                  <PathwayDisplay data={pathwayData} />
                ) : !isLoading && (
                   <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
                      <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Welcome to your Career Dashboard</h3>
                      <p className="text-muted-foreground">Fill out your profile to generate personalized training pathways and unlock your potential.</p>
                   </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ProgressTracker />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
