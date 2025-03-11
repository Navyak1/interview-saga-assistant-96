
// This file contains API functions for interacting with interview experiences

interface InterviewExperience {
  id: number;
  company: string;
  position: string;
  experience: string;
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
      experience: "The interview process was quite thorough. It started with a phone screening followed by a technical assessment where I had to solve algorithmic problems. Then, there were five rounds of interviews covering system design, coding, behavioral questions, and team fit. Each interviewer was professional and the questions were challenging but fair.",
      date: "2023-05-15"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Full Stack Engineer",
      experience: "Microsoft's interview was structured into a full day of sessions. I had two coding interviews, one system design discussion, and two behavioral interviews. The coding challenges focused on data structures and algorithms, while the system design portion had me architecting a scalable web service. The behavioral questions explored my past experiences and how I handled difficult situations.",
      date: "2023-06-22"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Software Development Engineer II",
      experience: "Amazon's interview process was centered around their leadership principles. There were four technical interviews and one bar raiser interview. The technical questions involved both coding and system design. I had to design a warehouse management system and solve problems related to optimization algorithms. The bar raiser interview was particularly challenging, diving deep into my past experiences and technical knowledge.",
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
      interview.experience.toLowerCase().includes(query)
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
  experience: string;
}): Promise<InterviewExperience> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create new interview object with mock data
  const newInterview: InterviewExperience = {
    id: mockInterviews.length > 0 ? Math.max(...mockInterviews.map(i => i.id)) + 1 : 1,
    company: data.company,
    position: data.position,
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
