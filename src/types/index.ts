
// Shared types for the application
export interface InterviewExperience {
  id: number;
  company: string;
  position: string;
  interviewRounds?: string;
  technicalQuestions?: string;
  systemDesign?: string;
  behavioralQuestions?: string;
  overallExperience?: string;
  experience?: string; // Making it optional for backward compatibility
  date: string;
  comments?: number;
}
