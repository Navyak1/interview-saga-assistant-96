
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, Calendar, MessageSquare } from "lucide-react";

// We'll move this to a proper data layer later
import { mockInterviews } from "@/pages/Index";

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = mockInterviews.find((i) => i.id === Number(id));

  if (!interview) {
    return <div>Interview not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Interviews
        </Button>

        <Card className="w-full animate-fade-up">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-2">
              <h1 className="font-semibold text-3xl">{interview.company}</h1>
              <Badge variant="secondary" className="text-sm">
                {interview.position}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between text-sm text-muted-foreground border-b pb-4">
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
                <span>{interview.comments} comments</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Interview Experience</h2>
              <p className="text-muted-foreground leading-relaxed">
                {interview.experience}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewDetails;
