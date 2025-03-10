
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import InterviewExperienceCard from "./InterviewExperienceCard";

interface InterviewExperience {
  id: number;
  company: string;
  position: string;
  experience: string;
  date: string;
  comments?: number;
}

interface InterviewExperiencesListProps {
  experiences: InterviewExperience[] | undefined;
  isLoading: boolean;
  onExperienceClick: (id: number) => void;
}

const InterviewExperiencesList = ({ 
  experiences, 
  isLoading, 
  onExperienceClick 
}: InterviewExperiencesListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-20 mb-4" />
              <Skeleton className="h-20 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <Card className="dark:bg-gray-800">
        <CardContent className="py-6">
          <p>No interview experiences found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {experiences.map((experience) => (
        <InterviewExperienceCard 
          key={experience.id} 
          experience={experience} 
          onClick={onExperienceClick}
        />
      ))}
    </div>
  );
};

export default InterviewExperiencesList;
