import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Book } from "lucide-react";

const completedCourses = [
  "Introduction to Web Development",
  "Advanced CSS and Sass",
  "JavaScript for Beginners",
];

export function ProgressTracker() {
  const totalCourses = 10;
  const progressValue = (completedCourses.length / totalCourses) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Keep up the great work!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-1 text-sm font-medium">
            <span>Overall Completion</span>
            <span className="text-muted-foreground">{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} aria-label={`${Math.round(progressValue)}% complete`} />
          <p className="text-xs text-muted-foreground mt-1">{completedCourses.length} of {totalCourses} modules completed.</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Completed Modules</h4>
          <ul className="space-y-3">
            {completedCourses.map((course, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="flex-grow">{course}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="font-semibold mb-3">Next Up</h4>
           <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <Book className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-sm">React Fundamentals</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
