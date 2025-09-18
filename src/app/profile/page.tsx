
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, Briefcase, BookOpen, Settings, User, Loader2, Save } from "lucide-react";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeDropzone, ResumeParsedData } from "@/components/resume/ResumeDropzone";
import { useProfile, UserProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const { toast } = useToast();
	const { profile, saveProfile, loading: profileLoading } = useProfile();

	const [form, setForm] = React.useState<UserProfile>({
		name: user?.displayName || "",
		email: user?.email || "",
		phone: "",
		skills: [],
		education: [],
		experience: [],
	});

	React.useEffect(() => {
		if (!loading && !user) router.push("/");
	}, [user, loading, router]);

	React.useEffect(() => {
		if (profile) setForm(profile);
	}, [profile]);

	if (loading || profileLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background">
				<Loader2 className="w-12 h-12 animate-spin text-primary" />
			</div>
		);
	}

	const autofill = (data: ResumeParsedData) => {
		const next: UserProfile = {
			name: data.name || form.name,
			email: data.email || form.email,
			phone: data.phone || form.phone,
			skills: data.skills || form.skills,
			education: data.education || form.education,
			experience: data.experience || form.experience,
		};
		setForm(next);
		saveProfile(next);
		const summary = [
			data.name && `Name: ${data.name}`,
			data.email && `Email: ${data.email}`,
			data.phone && `Phone: ${data.phone}`,
			data.skills?.length && `Skills: ${data.skills.slice(0, 6).join(", ")} ${data.skills.length > 6 ? "…" : ""}`,
		].filter(Boolean).join(" | ");
		toast({ title: "Resume parsed", description: summary || "We extracted details from your resume." });
	};

	const onParseError = (message: string) => {
		toast({ variant: "destructive", title: "Parsing failed", description: message });
	};

	const onSave = () => {
		saveProfile(form);
		toast({ title: "Profile saved", description: "Your changes have been saved." });
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
			</Sidebar>
			<SidebarInset>
				<main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
					<div className="mb-8">
						<h1 className="text-3xl font-bold tracking-tight mb-1">Profile</h1>
						<p className="text-muted-foreground">Update your profile or autofill using your resume.</p>
					</div>

					<div className="grid gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Autofill from Resume</CardTitle>
								<CardDescription>Drop your resume. We'll extract the basics for you.</CardDescription>
							</CardHeader>
							<CardContent>
								<ResumeDropzone onParsed={autofill} onError={onParseError} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Profile Details</CardTitle>
								<CardDescription>Review and edit extracted details.</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="name">Full Name</Label>
										<Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone">Phone</Label>
										<Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="skills">Skills</Label>
									<Textarea id="skills" value={form.skills.join(", ")}
										onChange={(e) => setForm({ ...form, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
										placeholder="e.g. React, TypeScript, Node.js" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="education">Education</Label>
									<Textarea id="education" value={form.education.join("\n")}
										onChange={(e) => setForm({ ...form, education: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })}
										placeholder={"B.Tech Computer Science - XYZ University\nClass XII - ABC School"} />
								</div>
								<div className="space-y-2">
									<Label htmlFor="experience">Experience</Label>
									<Textarea id="experience" value={form.experience.join("\n")}
										onChange={(e) => setForm({ ...form, experience: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })}
										placeholder={"Frontend Developer - ACME Corp (2022-2024)\nIntern - Beta Labs (2021)"} />
								</div>
								<div className="pt-2">
									<Button onClick={onSave}>
										<Save className="mr-2 h-4 w-4" /> Save Profile
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
