
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MessageSquare } from "lucide-react";

interface InterviewCardProps {
  company: string;
  position: string;
  date: string;
  experience: string;
  comments: number;
  onAiAnalyze: () => void;
}

const InterviewCard = ({
  company,
  position,
  date,
  experience,
  comments,
  onAiAnalyze,
}: InterviewCardProps) => {
  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg animate-fade-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl">{company}</h3>
          <Badge variant="secondary" className="text-sm">
            {position}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hover:bg-primary hover:text-white transition-colors"
          onClick={onAiAnalyze}
        >
          AI Analysis
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{experience}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{comments} comments</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
