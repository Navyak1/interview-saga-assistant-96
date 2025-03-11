
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyzeSkillGap, analyzeResume } from "@/lib/gemini-api";

import SkillGapResults from "@/components/SkillGapResults";
import SkillGapForm from "@/components/SkillGapForm";
import HowItWorks from "@/components/HowItWorks";
import SkillGapPlaceholder from "@/components/SkillGapPlaceholder";

const SkillGapAnalyzer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (resume: string, jobRole: string) => {
    setIsAnalyzing(true);
    setApiError(null);
    
    try {
      toast({
        title: "Analysis started",
        description: "This may take a minute or two. Please be patient.",
      });
      
      const trimmedResume = resume.length > 10000 ? resume.substring(0, 10000) + "..." : resume;
      
      const data = await analyzeSkillGap(trimmedResume, jobRole);
      console.log("Skill gap analysis complete:", data);

      // Get resume improvement suggestions
      const resumeSuggestions = await analyzeResume(trimmedResume, jobRole);
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
          <SkillGapForm 
            onSubmit={handleSubmit} 
            isAnalyzing={isAnalyzing} 
            apiError={apiError} 
          />
          <HowItWorks />
        </div>

        <div>
          {results ? (
            <SkillGapResults results={results} />
          ) : (
            <SkillGapPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
