
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, GraduationCap } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createInterviewExperience,
  getInterviewExperiences,
} from "@/lib/api";

const formSchema = z.object({
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  experience: z.string().min(10, {
    message: "Experience must be at least 10 characters.",
  }),
});

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex rounded-md shadow-sm">
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        className="rounded-r-none"
      />
      <Button
        variant="outline"
        className="rounded-l-none"
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </div>
  );
};

const Index = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      experience: "",
    },
  });

  const { data: interviewExperiences, isLoading } = useQuery({
    queryKey: ["interviewExperiences", searchQuery],
    queryFn: () => getInterviewExperiences(searchQuery),
  });

  const mutation = useMutation({
    mutationFn: createInterviewExperience,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Interview experience shared successfully!",
      });
      form.reset();
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
            <SearchBar onSearch={handleSearch} />
            <Button
              variant="outline"
              onClick={() => window.location.href = '/skill-gap-analyzer'}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Skill Gap Analyzer
            </Button>
            <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Share Your Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Share Your Interview Experience</DialogTitle>
                  <DialogDescription>
                    Help others by sharing your recent interview experience.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter position applied for" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your interview experience..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={mutation.isPending}>
                      {mutation.isPending ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <p>Loading interview experiences...</p>
        ) : interviewExperiences && interviewExperiences.length > 0 ? (
          <Table>
            <TableCaption>A list of recent interview experiences.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviewExperiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell className="font-medium">{experience.company}</TableCell>
                  <TableCell>{experience.position}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/interview/${experience.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Card className="dark:bg-gray-800">
            <CardContent className="py-6">
              <p>No interview experiences found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
