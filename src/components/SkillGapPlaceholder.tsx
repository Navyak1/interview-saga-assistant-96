
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const SkillGapPlaceholder = () => {
  return (
    <Card className="h-full flex flex-col justify-center items-center p-10 text-center">
      <TrendingUp className="h-16 w-16 text-muted-foreground mb-6" />
      <h2 className="text-xl font-medium mb-2">
        Ready to analyze your career fit
      </h2>
      <p className="text-muted-foreground max-w-md">
        Enter your resume details and desired role on the left to get personalized insights on skill gaps and improvement opportunities.
      </p>
    </Card>
  );
};

export default SkillGapPlaceholder;
