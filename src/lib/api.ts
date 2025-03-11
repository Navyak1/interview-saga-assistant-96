
// This file contains API functions for interacting with interview experiences

interface InterviewExperience {
  id: number;
  company: string;
  position: string;
  interviewRounds?: string;
  technicalQuestions?: string;
  systemDesign?: string;
  behavioralQuestions?: string;
  overallExperience?: string;
  experience?: string;
  date: string;
  comments?: number;
}

// Mock data for development purposes
// Store mockInterviews in localStorage to persist data between page navigations
const getStoredInterviews = (): InterviewExperience[] => {
  const storedData = localStorage.getItem('mockInterviews');
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Initial mock data if nothing in localStorage
  const initialData = [
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Developer",
      interviewRounds: "5 rounds: phone screening, technical assessment, system design, behavioral, team fit",
      technicalQuestions: "The technical questions focused on JavaScript closures, React hooks, and CSS Grid. I was asked to solve problems related to state management and component optimization.",
      systemDesign: "I was asked to design a real-time notification system that could scale to millions of users.",
      behavioralQuestions: "They asked about times I had to deal with conflicts in a team, how I approach learning new technologies, and my biggest professional achievement.",
      overallExperience: "The interview process was quite thorough. Each interviewer was professional and the questions were challenging but fair.",
      date: "2023-05-15"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Full Stack Engineer",
      interviewRounds: "4 rounds: initial screening, coding challenge, technical interview, behavioral interview",
      technicalQuestions: "Questions focused on data structures, particularly trees and graphs. I had to implement an algorithm to find the shortest path in a weighted graph.",
      systemDesign: "I was tasked with designing a distributed file storage system with considerations for redundancy and fault tolerance.",
      behavioralQuestions: "They were interested in how I handle pressure, my approach to meeting deadlines, and examples of taking initiative.",
      overallExperience: "Microsoft's interview was structured into a full day of sessions. The interviewers were friendly and the process was well-organized.",
      date: "2023-06-22"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Software Development Engineer II",
      interviewRounds: "6 rounds: online assessment, phone screen, 4 onsite interviews including a bar raiser",
      technicalQuestions: "Heavy focus on algorithms and data structures. Had to solve problems on dynamic programming, trees, and hash tables.",
      systemDesign: "Designed a warehouse inventory management system with real-time tracking capabilities.",
      behavioralQuestions: "Many questions based on Amazon's leadership principles, especially customer obsession, ownership, and dive deep.",
      overallExperience: "Amazon's interview process was centered around their leadership principles. The technical questions were challenging but reasonable.",
      date: "2023-07-10"
    }
  ];
  
  // Store the initial data
  localStorage.setItem('mockInterviews', JSON.stringify(initialData));
  return initialData;
};

// Use a mutable reference that persists between renders
let mockInterviews = getStoredInterviews();

// Get all interview experiences, optionally filtered by search query
export const getInterviewExperiences = async (searchQuery?: string): Promise<InterviewExperience[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!searchQuery) {
    return [...mockInterviews]; // Return a copy to avoid unintended mutations
  }
  
  const query = searchQuery.toLowerCase();
  return mockInterviews.filter(
    interview => 
      interview.company.toLowerCase().includes(query) || 
      interview.position.toLowerCase().includes(query) ||
      (interview.experience && interview.experience.toLowerCase().includes(query)) ||
      (interview.overallExperience && interview.overallExperience.toLowerCase().includes(query)) ||
      (interview.interviewRounds && interview.interviewRounds.toLowerCase().includes(query)) ||
      (interview.technicalQuestions && interview.technicalQuestions.toLowerCase().includes(query))
  );
};

// Get a specific interview experience by ID
export const getInterviewExperienceById = async (id: number): Promise<InterviewExperience | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockInterviews.find(interview => interview.id === id);
};

// Create a new interview experience
export const createInterviewExperience = async (data: {
  company: string;
  position: string;
  interviewRounds?: string;
  technicalQuestions?: string;
  systemDesign?: string;
  behavioralQuestions?: string;
  overallExperience?: string;
  experience?: string;
}): Promise<InterviewExperience> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create new interview object with mock data
  const newInterview: InterviewExperience = {
    id: mockInterviews.length > 0 ? Math.max(...mockInterviews.map(i => i.id)) + 1 : 1,
    company: data.company,
    position: data.position,
    interviewRounds: data.interviewRounds,
    technicalQuestions: data.technicalQuestions,
    systemDesign: data.systemDesign,
    behavioralQuestions: data.behavioralQuestions,
    overallExperience: data.overallExperience,
    experience: data.experience,
    date: new Date().toISOString().split('T')[0]
  };
  
  // In a real app, we would save this to a database
  // For now, we'll just add it to our mock data
  mockInterviews.push(newInterview);
  
  // Update localStorage to persist the data
  localStorage.setItem('mockInterviews', JSON.stringify(mockInterviews));
  
  return newInterview;
};
