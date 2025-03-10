
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { PlusCircle, GraduationCap, Building2, Calendar, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
    mutationFn: (values: z.infer<typeof formSchema>) => createInterviewExperience(values),
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-6 pb-4">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Skeleton className="h-20" />
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0 border-t">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : interviewExperiences && interviewExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewExperiences.map((experience) => (
              <Card 
                key={experience.id} 
                className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer border border-border"
                onClick={() => navigate(`/interview/${experience.id}`)}
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
            ))}
          </div>
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
