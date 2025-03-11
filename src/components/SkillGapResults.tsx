
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Lightbulb, ArrowUpRight, FileEdit } from "lucide-react";

interface SkillGapResultsProps {
  results: {
    matchingSkills: string[];
    missingSkills: string[];
    industryTrends: string[];
    recommendations: string[];
    learningResources: {
      title: string;
      description: string;
      type: string;
    }[];
    resumeSuggestions?: {
      title: string;
      description: string;
      example: string;
    }[];
  };
}

const SkillGapResults = ({ results }: SkillGapResultsProps) => {
  const [activeTab, setActiveTab] = useState("skills");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle automatic sliding for resume suggestions
  useEffect(() => {
    if (!results.resumeSuggestions || activeTab !== "resume") return;
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSlide((prev) => 
          prev === results.resumeSuggestions!.length - 1 ? 0 : prev + 1
        );
        setIsAnimating(false);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [results.resumeSuggestions, activeTab]);

  // Reset slide when changing to resume tab
  useEffect(() => {
    if (activeTab === "resume") {
      setActiveSlide(0);
      setIsAnimating(false);
    }
  }, [activeTab]);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid grid-cols-4 mb-4 mx-6">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="resume">Resume Tips</TabsTrigger>
          </TabsList>
          
          <div className="px-6 pb-6">
            <TabsContent value="skills" className="m-0 space-y-4">
              <div>
                <h3 className="text-base font-medium flex items-center mb-3">
                  <Check className="text-green-500 mr-2 h-5 w-5" /> 
                  Matching Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.matchingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium flex items-center mb-3">
                  <AlertCircle className="text-amber-500 mr-2 h-5 w-5" /> 
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="m-0">
              <h3 className="text-base font-medium mb-3">Current Industry Trends</h3>
              <ul className="space-y-2">
                {results.industryTrends.map((trend, index) => (
                  <li key={index} className="flex gap-2">
                    <ArrowUpRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="recommendations" className="m-0 space-y-6">
              <div>
                <h3 className="text-base font-medium mb-3">Action Steps</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-medium mb-3">Learning Resources</h3>
                <div className="space-y-3">
                  {results.learningResources.map((resource, index) => (
                    <Card key={index} className="p-3 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{resource.title}</h4>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resume" className="m-0">
              {results.resumeSuggestions && results.resumeSuggestions.length > 0 ? (
                <div className="relative overflow-hidden">
                  {/* Dots navigation */}
                  <div className="flex justify-center mb-4 gap-1.5">
                    {results.resumeSuggestions.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === activeSlide ? "bg-primary" : "bg-muted"
                        }`}
                        onClick={() => {
                          setActiveSlide(index);
                          setIsAnimating(false);
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Sliding content */}
                  <div 
                    className={`transition-all duration-500 ${
                      isAnimating ? "opacity-0 transform translate-x-10" : "opacity-100 transform translate-x-0"
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <FileEdit className="text-primary mr-2 h-5 w-5" />
                      <h3 className="text-base font-medium">
                        {results.resumeSuggestions[activeSlide].title}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <p>{results.resumeSuggestions[activeSlide].description}</p>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p className="font-medium mb-1">Example:</p>
                        <p className="italic">{results.resumeSuggestions[activeSlide].example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No resume suggestions available</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SkillGapResults;
