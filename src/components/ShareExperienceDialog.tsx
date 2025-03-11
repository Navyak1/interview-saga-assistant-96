
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ShareExperienceForm, { formSchema } from "./ShareExperienceForm";
import * as z from "zod";

interface ShareExperienceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending: boolean;
}

const ShareExperienceDialog = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit,
  isPending
}: ShareExperienceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span className="inline-block transition-transform hover:-translate-y-1 duration-300">
            Share Your Experience
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Share Your Interview Experience</DialogTitle>
          <DialogDescription>
            Help others prepare by sharing details about your interview process.
          </DialogDescription>
        </DialogHeader>
        <ShareExperienceForm onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
};

export default ShareExperienceDialog;
