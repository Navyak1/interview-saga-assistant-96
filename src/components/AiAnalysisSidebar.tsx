
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { analyzeInterview } from "@/lib/ai-analysis";

interface AiAnalysisSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  interviewData: {
    company: string;
    position: string;
    experience: string;
  };
}

const AiAnalysisSidebar = ({ isOpen, onClose, interviewData }: AiAnalysisSidebarProps) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnalysis = async () => {
      if (isOpen && !analysis) {
        setLoading(true);
        try {
          const result = await analyzeInterview(interviewData);
          setAnalysis(result);
        } catch (error) {
          console.error("Error analyzing interview:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getAnalysis();
  }, [isOpen, interviewData, analysis]);

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-card shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">AI Analysis</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {analysis.split('\n\n').map((section, index) => (
                <div key={index} className="space-y-2">
                  <p className="whitespace-pre-line text-sm text-foreground">
                    {section}
                  </p>
                  {index < analysis.split('\n\n').length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No analysis available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiAnalysisSidebar;
