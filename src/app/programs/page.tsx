
"use client";

import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  BookOpen,
  LogOut,
  Briefcase
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const nsqfPrograms = [
    { level: 1, title: "Pre-Vocational/Preparatory Programme", description: "Basic literacy and numeracy skills for entry-level work." },
    { level: 2, title: "Certificate Programme", description: "Basic vocational skills in a specific trade, preparing for routine tasks." },
    { level: 3, title: "Advanced Certificate Programme", description: "More advanced skills for a specific job role, requires some prior knowledge." },
    { level: 4, title: "Diploma Programme", description: "Broad knowledge base in a vocational area, suitable for supervisory roles." },
    { level: 5, title: "Advanced Diploma Programme", description: "Specialized knowledge and skills, preparing for technical or managerial roles." },
    { level: 6, title: "Bachelor's Vocational Degree (B.Voc)", description: "Degree-level vocational education with in-depth practical and theoretical knowledge." },
    { level: 7, title: "Postgraduate Diploma", description: "Advanced specialization after a degree, focused on a specific professional area." },
    { level: 8, title: "Master's Vocational Degree (M.Voc)", description: "Mastery in a vocational field, including research and advanced management skills." },
    { level: 9, title: "Doctoral Level (Ph.D)", description: "Research and innovation in vocational education and skill development." },
];


export default function ProgramsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const filteredPrograms = nsqfPrograms.filter(program => 
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `level ${program.level}`.includes(searchTerm.toLowerCase())
  );

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
              <SidebarMenuButton href="/dashboard" tooltip="Dashboard">
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
              <SidebarMenuButton href="/programs" isActive tooltip="Programs">
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
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-1">NSQF Programs</h1>
                <p className="text-muted-foreground">Explore the National Skill Qualification Framework levels.</p>
            </div>
            
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="search"
                    placeholder="Search programs by title, level, or keyword..."
                    className="w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Level</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrograms.length > 0 ? filteredPrograms.map((program) => (
                    <TableRow key={program.level}>
                      <TableCell>
                        <Badge variant="secondary" className="text-base font-semibold">Level {program.level}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{program.title}</TableCell>
                      <TableCell className="text-muted-foreground">{program.description}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                            No programs found matching your search.
                        </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
