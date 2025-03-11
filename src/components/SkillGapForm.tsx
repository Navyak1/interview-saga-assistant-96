
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Search, Upload, AlertTriangle } from "lucide-react";
import { extractTextFromFile } from "@/lib/file-utils";

interface SkillGapFormProps {
  onSubmit: (resume: string, jobRole: string) => void;
  isAnalyzing: boolean;
  apiError: string | null;
}

const SkillGapForm = ({ onSubmit, isAnalyzing, apiError }: SkillGapFormProps) => {
  const { toast } = useToast();
  const [resume, setResume] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isFileProcessing, setIsFileProcessing] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
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

    onSubmit(resume, jobRole);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
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
    </>
  );
};

export default SkillGapForm;
