import type { GeneratePersonalizedTrainingPathwaysOutput } from "@/ai/flows/generate-personalized-training-pathways";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Briefcase, Lightbulb, TrendingUp, CheckCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface PathwayDisplayProps {
  data: GeneratePersonalizedTrainingPathwaysOutput;
}

const iconMapping = {
  courses: <BookOpen className="h-5 w-5 text-primary" />,
  microCredentials: <Award className="h-5 w-5 text-yellow-500" />,
  certifications: <Award className="h-5 w-5 text-green-500" />,
  onTheJobTraining: <Briefcase className="h-5 w-5 text-indigo-500" />,
};

export function PathwayDisplay({ data }: PathwayDisplayProps) {
  const hasPathways = data.trainingPathways && data.trainingPathways.length > 0;
  const hasSkillGaps = data.skillGaps && data.skillGaps.length > 0;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight font-headline">Your Personalized Plan</h2>
      
      {hasSkillGaps && (
        <Card className="bg-card/50 border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle>Identified Skill Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Here are the key areas to focus on to achieve your career aspirations.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.skillGaps.map((gap, index) => (
                <Badge key={index} variant="secondary" className="text-base px-3 py-1">{gap}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasPathways ? data.trainingPathways.map((pathway, pIndex) => (
        <Card key={pIndex} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Pathway {pIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['courses']} className="w-full">
              {Object.entries(pathway).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <AccordionItem value={key} key={key}>
                      <AccordionTrigger className="text-lg font-medium">
                        <div className="flex items-center gap-3">
                          {iconMapping[key as keyof typeof iconMapping]}
                          {title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pl-2">
                          {value.map((item, iIndex) => (
                            <li key={iIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                              <div>
                                <span className="font-medium">{item}</span>
                                {Math.random() > 0.7 && <Badge variant="outline" className="ml-2 border-green-500 text-green-600">In Demand</Badge>}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
                return null;
              })}
            </Accordion>
          </CardContent>
        </Card>
      )) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No specific pathways were generated. Try adjusting your profile for new recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


PathwayDisplay.Skeleton = function PathwayDisplaySkeleton() {
  return (
     <div className="space-y-8">
      <Skeleton className="h-8 w-1/2" />
       <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
           <Skeleton className="h-6 w-6 rounded-full" />
           <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
           <Skeleton className="h-4 w-3/4 mb-4" />
           <div className="flex flex-wrap gap-2">
             <Skeleton className="h-8 w-24" />
             <Skeleton className="h-8 w-32" />
             <Skeleton className="h-8 w-28" />
           </div>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
             <Skeleton className="h-7 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
     </div>
  );
}