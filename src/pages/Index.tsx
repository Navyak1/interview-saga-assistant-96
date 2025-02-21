
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import InterviewCard from "@/components/InterviewCard";
import AiAnalysisSidebar from "@/components/AiAnalysisSidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Temporary mock data - exported to share with other components
export const mockInterviews = [
  {
    id: 1,
    company: "Tech Corp",
    position: "Senior Frontend Developer",
    date: "2024-03-15",
    experience:
      "The interview consisted of 3 rounds. First was a technical screening where we discussed React hooks and state management. Second round involved a coding challenge about implementing a custom hook for data fetching. Final round was system design where I had to design a real-time chat application.",
    comments: 5,
  },
  {
    id: 2,
    company: "Innovation Labs",
    position: "Full Stack Engineer",
    date: "2024-03-14",
    experience:
      "Started with behavioral questions about team collaboration. Then moved to technical discussion about microservices architecture. Coding round involved solving a problem about optimizing database queries.",
    comments: 3,
  },
];

const Index = () => {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<typeof mockInterviews[0] | null>(null);

  const handleSearch = (query: string) => {
    if (query === "") {
      setInterviews(mockInterviews);
      return;
    }
    const filtered = mockInterviews.filter((interview) =>
      interview.company.toLowerCase().includes(query.toLowerCase())
    );
    setInterviews(filtered);
  };

  const handleAiAnalyze = (interview: typeof mockInterviews[0]) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedInterview(interview);
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold mb-4">Interview Helper</h1>
          <p className="text-muted-foreground mb-8">
            Learn from real interview experiences and prepare better
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <SearchBar onSearch={handleSearch} />
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Share Experience
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              {...interview}
              onAiAnalyze={handleAiAnalyze(interview)}
            />
          ))}
        </div>

        {selectedInterview && (
          <AiAnalysisSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            interviewData={selectedInterview}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
