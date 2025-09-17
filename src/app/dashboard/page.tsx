
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
  LogOut,
  Briefcase
} from "lucide-react";
import { LearnerProfileForm, FormSchema } from "@/components/dashboard/learner-profile-form";
import { generatePathwaysAction } from "@/app/actions";
import type { GeneratePersonalizedTrainingPathwaysOutput } from "@/ai/flows/generate-personalized-training-pathways";
import { useToast } from "@/hooks/use-toast";
import { PathwayDisplay } from "@/components/dashboard/pathway-display";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { DashboardHeader } from "@/components/dashboard/header";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Pathway } from "@/lib/types";

function transformAiDataToPathways(data: GeneratePersonalizedTrainingPathwaysOutput): Pathway[] {
  return data.trainingPathways.map((pathway, index) => ({
    id: `pathway-${index}`,
    courses: pathway.courses.map(name => ({ name, completed: false })),
    microCredentials: pathway.microCredentials.map(name => ({ name, completed: false })),
    certifications: pathway.certifications.map(name => ({ name, completed: false })),
    onTheJobTraining: pathway.onTheJobTraining.map(name => ({ name, completed: false })),
  }));
}


export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [aiData, setAiData] = React.useState<GeneratePersonalizedTrainingPathwaysOutput | null>(null);
  const [pathways, setPathways] = React.useState<Pathway[] | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);


  const handleFormSubmit = async (values: FormSchema) => {
    setIsLoading(true);
    setAiData(null);
    setPathways(null);

    try {
      const result = await generatePathwaysAction(values);
      setAiData(result);
      setPathways(transformAiDataToPathways(result));
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

  const handleToggleComplete = (pathwayIndex: number, itemType: keyof Omit<Pathway, 'id'>, itemIndex: number) => {
    setPathways(prevPathways => {
      if (!prevPathways) return null;
      const newPathways = [...prevPathways];
      const item = newPathways[pathwayIndex][itemType][itemIndex];
      item.completed = !item.completed;
      return newPathways;
    });
  };


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
              <SidebarMenuButton href="/dashboard" isActive tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/jobs" tooltip="Job Insights">
                <Briefcase />
                Job Insights
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/programs" tooltip="Programs">
                <BookOpen />
                NSQF Programs
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/profile" tooltip="Profile">
                <User />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings" tooltip="Settings">
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
        <main className="p-4 sm:p-6 lg:p-8">
          <DashboardHeader />
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LearnerProfileForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              <div className="mt-8">
                {isLoading && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                      <Loader2 className="animate-spin" />
                      Generating your personalized pathways...
                    </div>
                    <p className="text-muted-foreground">Our AI is analyzing your profile. This may take a moment.</p>
                    <div className="space-y-4 pt-4">
                       <PathwayDisplay.Skeleton />
                    </div>
                  </div>
                )}
                {aiData && pathways ? (
                  <PathwayDisplay data={aiData} pathways={pathways} onToggleComplete={handleToggleComplete} />
                ) : !isLoading && (
                   <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-card mt-8">
                      <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Unlock Your Potential</h3>
                      <p className="text-muted-foreground max-w-md">Fill out your profile form above, and our AI will generate a personalized roadmap to help you achieve your career goals.</p>
                   </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ProgressTracker pathways={pathways} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
