
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShareExperienceDialogProps {
  children: React.ReactNode;
}

const ShareExperienceDialog = ({ children }: ShareExperienceDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Interview Experience</DialogTitle>
          <DialogDescription>
            Help others prepare by sharing your interview experience. The more detailed your information, the more helpful it will be.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Job Title</Label>
                <Input id="position" placeholder="Enter job title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Interview Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Location/Platform</Label>
                <Select>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-person</SelectItem>
                    <SelectItem value="video">Video Conference</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Interview Process</h3>
            <div className="space-y-2">
              <Label htmlFor="rounds">Number of Rounds</Label>
              <Input id="rounds" type="number" min="1" placeholder="Enter number of rounds" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Overall Duration</Label>
              <Input id="duration" placeholder="e.g., 2 hours" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Interview Details</h3>
            <div className="space-y-2">
              <Label htmlFor="technical">Technical Questions</Label>
              <Textarea
                id="technical"
                placeholder="List the technical questions you were asked..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="behavioral">Behavioral Questions</Label>
              <Textarea
                id="behavioral"
                placeholder="List the behavioral questions you were asked..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Overall Experience</Label>
              <Textarea
                id="experience"
                placeholder="Share your overall interview experience..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Experience</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShareExperienceDialog;
