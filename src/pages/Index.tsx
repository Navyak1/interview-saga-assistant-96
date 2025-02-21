
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Temporary mock data
const mockInterviews = [
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
  const { toast } = useToast();

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

  const handleAiAnalyze = () => {
    toast({
      title: "AI Analysis",
      description: "AI analysis feature coming soon!",
      duration: 3000,
    });
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
              onAiAnalyze={handleAiAnalyze}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
