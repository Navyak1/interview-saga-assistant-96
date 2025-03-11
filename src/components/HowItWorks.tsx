
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const HowItWorks = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          How it works
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h3 className="font-medium">Submit your information</h3>
              <p className="text-sm text-muted-foreground">
                Paste your resume content and specify your desired job role
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium">AI analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your skills against current job market requirements
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium">Get insights</h3>
              <p className="text-sm text-muted-foreground">
                Receive personalized recommendations to improve your chances
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;
