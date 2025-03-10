
import { Building2, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InterviewExperience {
  id: number;
  company: string;
  position: string;
  experience: string;
  date: string;
  comments?: number;
}

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
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {experience.experience}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t bg-muted/30">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 mr-1" />
          <span>{experience.company}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{experience.date}</span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto flex items-center gap-1"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterviewExperienceCard;
