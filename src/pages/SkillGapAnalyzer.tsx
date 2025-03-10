
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, FileText, TrendingUp, Search } from "lucide-react";
import SkillGapResults from "@/components/SkillGapResults";
import { analyzeSkillGap } from "@/lib/gemini-api";

const SkillGapAnalyzer = () => {
  const { toast } = useToast();
  const [resume, setResume] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume.trim()) {
      toast({
        title: "Missing resume",
        description: "Please enter your resume content",
        variant: "destructive",
      });
      return;
    }

    if (!jobRole.trim()) {
      toast({
        title: "Missing job role",
        description: "Please enter your desired job role",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const data = await analyzeSkillGap(resume, jobRole);
      setResults(data);
      toast({
        title: "Analysis complete",
        description: "Your skill gap analysis is ready to view",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-2">Skill Gap Analyzer</h1>
      <p className="text-muted-foreground mb-8">
        Analyze how your skills match up against your dream job requirements
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Input your information
              </CardTitle>
              <CardDescription>
                Provide your resume details and desired job role for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Content</Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste your resume text here..."
                    className="min-h-[200px]"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include your skills, experience, and education
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobRole">Desired Job Role</Label>
                  <Input
                    id="jobRole"
                    placeholder="e.g., Senior React Developer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Be specific about the role you're targeting
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Skills
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Submit your information</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste your resume content and specify your desired job role
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">AI analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your skills against current job market requirements
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Get insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive personalized recommendations to improve your chances
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {results ? (
            <SkillGapResults results={results} />
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-10 text-center">
              <TrendingUp className="h-16 w-16 text-muted-foreground mb-6" />
              <h2 className="text-xl font-medium mb-2">
                Ready to analyze your career fit
              </h2>
              <p className="text-muted-foreground max-w-md">
                Enter your resume details and desired role on the left to get personalized insights on skill gaps and improvement opportunities.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
