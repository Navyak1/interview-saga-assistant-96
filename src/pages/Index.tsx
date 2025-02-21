
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import InterviewCard from "@/components/InterviewCard";
import AiAnalysisSidebar from "@/components/AiAnalysisSidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Moon, Sun } from "lucide-react";
import ShareExperienceDialog from "@/components/ShareExperienceDialog";
import { useTheme } from "next-themes";

// Expanded mock data with more diverse experiences
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
  {
    id: 3,
    company: "Global Software Inc",
    position: "Cloud Solutions Architect",
    date: "2024-03-13",
    experience:
      "Intensive system design rounds focusing on scalability and high availability. Had to design a distributed caching system and discuss various AWS services. Deep dive into previous projects involving cloud architecture.",
    comments: 7,
  },
  {
    id: 4,
    company: "DataTech Solutions",
    position: "Machine Learning Engineer",
    date: "2024-03-12",
    experience:
      "Technical assessment included implementing a recommendation system. Discussion about various ML algorithms and their practical applications. Final round focused on deploying ML models in production.",
    comments: 4,
  },
  {
    id: 5,
    company: "Startup Ventures",
    position: "Mobile Developer",
    date: "2024-03-11",
    experience:
      "Cross-platform development discussion with React Native vs Flutter debate. Live coding session building a simple social media feed. Architecture discussion about state management in mobile apps.",
    comments: 6,
  },
  {
    id: 6,
    company: "Security Systems Co",
    position: "Security Engineer",
    date: "2024-03-10",
    experience:
      "Deep dive into cybersecurity concepts. Practical exercise involving identifying vulnerabilities in a sample application. Discussion about implementing OAuth2 and handling sensitive data.",
    comments: 8,
  }
];

const Index = () => {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<typeof mockInterviews[0] | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Wait for mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold mb-4">Interview Helper</h1>
          <p className="text-muted-foreground mb-8">
            Learn from real interview experiences and prepare better
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <SearchBar onSearch={handleSearch} />
            <ShareExperienceDialog>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <PlusCircle className="mr-2 h-4 w-4" />
                Share Experience
              </Button>
            </ShareExperienceDialog>
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
