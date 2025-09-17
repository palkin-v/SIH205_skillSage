
"use client";

import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


const nsqfPrograms = [
    { level: 1, title: "Pre-Vocational/Preparatory Programme", description: "Basic literacy and numeracy skills." },
    { level: 2, title: "Certificate Programme", description: "Basic vocational skills in a specific trade." },
    { level: 3, title: "Advanced Certificate Programme", description: "More advanced skills for a specific job role." },
    { level: 4, title: "Diploma Programme", description: "Broad knowledge base in a vocational area." },
    { level: 5, title: "Advanced Diploma Programme", description: "Specialized knowledge and skills." },
    { level: 6, title: "Bachelor's Vocational Degree", description: "Degree-level vocational education." },
    { level: 7, title: "Postgraduate Diploma", description: "Advanced specialization after a degree." },
    { level: 8, title: "Master's Vocational Degree", description: "Mastery in a vocational field." },
    { level: 9, title: "Doctoral Level", description: "Research and innovation in vocational education." },
];


export default function ProgramsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">NSQF Programs</h1>
      <p className="text-muted-foreground mb-6">Explore the National Skill Qualification Framework levels.</p>

       <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nsqfPrograms.map((program) => (
                <TableRow key={program.level}>
                  <TableCell>
                    <Badge variant="secondary" className="text-base">Level {program.level}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{program.title}</TableCell>
                  <TableCell className="text-muted-foreground">{program.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
