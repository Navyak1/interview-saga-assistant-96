
import { Building2, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InterviewExperience } from "@/types";

interface InterviewExperienceCardProps {
  experience: InterviewExperience;
  onClick: (id: number) => void;
}

const InterviewExperienceCard = ({ experience, onClick }: InterviewExperienceCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer border border-border"
      onClick={() => onClick(experience.id)}
    >
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-1">{experience.company}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground font-medium">
              {experience.position}
            </CardDescription>
          </div>
          <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{experience.date}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {experience.experience || experience.overallExperience || "No experience details"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t bg-muted/30">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 mr-1" />
          <span>{experience.company}</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto flex items-center gap-1"
        >
          <span>View</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewExperienceCard;
