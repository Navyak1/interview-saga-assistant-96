
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, Calendar, MessageSquare, HelpCircle, Users, Clock } from "lucide-react";
import AiAnalysisSidebar from "@/components/AiAnalysisSidebar";
import { getInterviewExperienceById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { data: interview, isLoading, error } = useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterviewExperienceById(Number(id)),
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading interview details...</div>;
  }

  if (error || !interview) {
    return <div className="container mx-auto px-4 py-8">Interview not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Interviews
          </Button>
          
          <Button
            variant="outline"
            className="hover:bg-primary hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            AI Help
          </Button>
        </div>

        <Card className="w-full animate-fade-up dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-2">
              <h1 className="font-semibold text-3xl">{interview.company}</h1>
              <Badge variant="secondary" className="text-sm">
                {interview.position}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex justify-between text-sm text-muted-foreground border-b pb-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{interview.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{interview.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{interview.comments || 0} comments</span>
              </div>
            </div>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Location/Platform</p>
                  <p className="text-muted-foreground">Video Conference</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Overall Duration</p>
                  <p className="text-muted-foreground">2 hours</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Interview Process</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>3 Rounds</span>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((round) => (
                    <Card key={round} className="dark:bg-gray-700">
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Round {round}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Type</p>
                            <p>Technical Interview</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Duration</p>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>45 minutes</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Interview Experience</h2>
              <p className="text-muted-foreground leading-relaxed">
                {interview.experience}
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Questions Asked</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Technical Questions</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Implement a custom React hook for data fetching</li>
                    <li>Design a real-time chat application architecture</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Behavioral Questions</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Describe a challenging project you worked on</li>
                    <li>How do you handle conflicts in a team?</li>
                  </ul>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <AiAnalysisSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          interviewData={interview}
        />
      </div>
    </div>
  );
};

export default InterviewDetails;
