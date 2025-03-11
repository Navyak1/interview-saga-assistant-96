import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, FileText, TrendingUp, Search, ArrowLeft, Upload, AlertTriangle } from "lucide-react";
import SkillGapResults from "@/components/SkillGapResults";
import { analyzeSkillGap, analyzeResume } from "@/lib/gemini-api";
import { useNavigate } from "react-router-dom";
import { extractTextFromFile } from "@/lib/file-utils";

const SkillGapAnalyzer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [resume, setResume] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/msword', // doc
      'text/plain'
    ];

    if (!allowedTypes.includes(selectedFile.type) && 
        !selectedFile.name.endsWith('.txt') && 
        !selectedFile.name.endsWith('.doc') && 
        !selectedFile.name.endsWith('.docx') && 
        !selectedFile.name.endsWith('.pdf')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setIsFileProcessing(true);
    setApiError(null);
    
    try {
      const text = await extractTextFromFile(selectedFile);
      console.log("Extracted text length:", text.length);
      console.log("Text sample:", text.substring(0, 200));
      
      if (!text || text.trim().length < 50) {
        throw new Error("Could not extract enough text from the file");
      }
      
      setResume(text);
      toast({
        title: "Resume loaded",
        description: "Your resume has been successfully uploaded and parsed",
      });
    } catch (error) {
      toast({
        title: "File processing error",
        description: "Failed to extract text from your resume file. Try copying and pasting it instead.",
        variant: "destructive",
      });
      console.error("File processing error:", error);
    } finally {
      setIsFileProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume.trim()) {
      toast({
        title: "Missing resume",
        description: "Please enter your resume content or upload a file",
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
    setApiError(null);
    
    try {
      toast({
        title: "Analysis started",
        description: "This may take a minute or two. Please be patient.",
      });
      
      const data = await analyzeSkillGap(resume, jobRole);
      console.log("Skill gap analysis complete:", data);

      // Get resume improvement suggestions
      const resumeSuggestions = await analyzeResume(resume, jobRole);
      console.log("Resume analysis complete:", resumeSuggestions);
      
      // Combine the analysis results
      const combinedResults = {
        ...data,
        resumeSuggestions: resumeSuggestions.suggestions
      };
      
      setResults(combinedResults);
      toast({
        title: "Analysis complete",
        description: "Your skill gap analysis is ready to view",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      setApiError("The analysis service is currently unavailable due to high demand. Please try again in a few minutes.");
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your skills. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 p-1.5" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Skill Gap Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze how your skills match up against your dream job requirements
          </p>
        </div>
      </div>

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
                  <Label htmlFor="resumeUpload">Upload Resume (PDF, DOC, DOCX, TXT)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="resumeUpload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      disabled={isFileProcessing}
                      className="flex-1"
                    />
                    {isFileProcessing && (
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Or paste your resume text below
                  </p>
                </div>

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

                {apiError && (
                  <div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800 p-3 rounded-md flex items-start gap-2 text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <p className="text-sm">{apiError}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isAnalyzing || isFileProcessing}>
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
