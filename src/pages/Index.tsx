
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createInterviewExperience, getInterviewExperiences } from "@/lib/api";
import InterviewSearchBar from "@/components/InterviewSearchBar";
import InterviewExperiencesList from "@/components/InterviewExperiencesList";
import ShareExperienceDialog from "@/components/ShareExperienceDialog";
import { formSchema } from "@/components/ShareExperienceForm";
import * as z from "zod";

const Index = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Force a refresh when the component mounts
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["interviewExperiences"] });
  }, [queryClient]);

  const { data: interviewExperiences, isLoading } = useQuery({
    queryKey: ["interviewExperiences", searchQuery],
    queryFn: () => getInterviewExperiences(searchQuery),
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return createInterviewExperience({
        company: values.company,
        position: values.position,
        experience: values.experience
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Interview experience shared successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["interviewExperiences"] });
      setIsShareModalOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to share interview experience. Try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleExperienceClick = (id: number) => {
    navigate(`/interview/${id}`);
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Share & Discover Interview Experiences</h1>
          <p className="text-sm">
            Contribute to the community by sharing your interview experiences and
            learn from others.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Recent Interview Experiences</h2>
            <p className="text-muted-foreground">
              Learn from others' interview journeys
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <InterviewSearchBar onSearch={handleSearch} />
            <Button
              variant="outline"
              onClick={() => window.location.href = '/skill-gap-analyzer'}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Skill Gap Analyzer
            </Button>
            <ShareExperienceDialog 
              isOpen={isShareModalOpen}
              onOpenChange={setIsShareModalOpen}
              onSubmit={handleFormSubmit}
              isPending={mutation.isPending}
            />
          </div>
        </div>

        <InterviewExperiencesList 
          experiences={interviewExperiences}
          isLoading={isLoading}
          onExperienceClick={handleExperienceClick}
        />
      </div>
    </div>
  );
};

export default Index;
