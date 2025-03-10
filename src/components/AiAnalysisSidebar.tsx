
import { useState, useEffect } from "react";
import { X, BookOpen, Lightbulb, GraduationCap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { analyzeInterviewExperience } from "@/lib/ai-analysis";

interface InterviewData {
  company: string;
  position: string;
  experience: string;
}

interface AiAnalysisSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  interviewData: InterviewData;
}

interface AnalysisResult {
  keyTopics: string[];
  importantQuestions: string[];
  requiredSkills: string[];
  preparationTips: string[];
  similarCompanies: string[];
}

const AiAnalysisSidebar = ({ isOpen, onClose, interviewData }: AiAnalysisSidebarProps) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && interviewData) {
      setIsLoading(true);
      setError(null);
      
      analyzeInterviewExperience(interviewData)
        .then(result => {
          setAnalysis(result);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error analyzing interview:", err);
          setError("Failed to analyze the interview. Please try again later.");
          setIsLoading(false);
        });
    }
  }, [isOpen, interviewData]);

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } overflow-auto`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : error ? (
          <div className="text-destructive p-4 rounded-md bg-destructive/10">
            <p>{error}</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6 flex-1 overflow-y-auto">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4" />
                <h3 className="font-medium">Key Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.keyTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4" />
                <h3 className="font-medium">Important Questions</h3>
              </div>
              <ul className="space-y-2 list-disc list-inside text-sm">
                {analysis.importantQuestions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4" />
                <h3 className="font-medium">Required Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4" />
                <h3 className="font-medium">Preparation Tips</h3>
              </div>
              <ul className="space-y-2 list-disc list-inside text-sm">
                {analysis.preparationTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-4 w-4" />
                <h3 className="font-medium">Similar Companies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.similarCompanies.map((company, index) => (
                  <Badge key={index} variant="secondary">
                    {company}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select an interview to analyze</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAnalysisSidebar;
