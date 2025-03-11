
// Gemini API key
const API_KEY = "AIzaSyBp4oDLmglH38eg1jdbew3C0RYI4VSEcWU";

/**
 * Handles API requests with retry logic for rate limiting
 */
async function makeGeminiRequest(prompt: string, maxRetries = 2) {
  let retries = 0;
  
  while (retries <= maxRetries) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              topK: 32,
              topP: 0.95,
              maxOutputTokens: 2048, // Reduced to help with rate limits
            },
          }),
        }
      );

      if (response.status === 429) {
        console.log(`Rate limit hit, retry ${retries + 1}/${maxRetries}`);
        retries++;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, retries)));
        continue;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error:", errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if we have a valid response structure
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
        console.error("Unexpected API response structure:", data);
        throw new Error("Invalid API response structure");
      }
      
      // Extract the content from the response
      const content = data.candidates[0].content.parts[0].text;
      
      if (!content) {
        console.error("Empty content in API response");
        throw new Error("Empty content in API response");
      }
      
      // Find the JSON string in the content (in case there's any text before/after)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("Could not extract JSON from the response:", content);
        // Return a fallback structure instead of throwing
        return createFallbackResponse();
      }
      
      try {
        // Parse the JSON string
        return JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError, "Response:", content);
        // Return fallback data instead of throwing
        return createFallbackResponse();
      }
    } catch (error) {
      if (retries >= maxRetries) {
        console.error("Max retries reached for Gemini API request", error);
        // Return fallback data instead of throwing
        return createFallbackResponse();
      }
      retries++;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, retries)));
    }
  }
  
  // If we get here, return fallback data
  return createFallbackResponse();
}

/**
 * Creates fallback response data when the API fails
 */
function createFallbackResponse() {
  return {
    matchingSkills: [
      "Communication",
      "Problem Solving", 
      "Teamwork", 
      "Adaptability", 
      "Time Management"
    ],
    missingSkills: [
      "Advanced Technical Skills",
      "Industry-Specific Knowledge",
      "Leadership Experience",
      "Project Management"
    ],
    industryTrends: [
      "Increasing demand for digital literacy",
      "Remote work capabilities becoming essential",
      "Focus on soft skills alongside technical abilities",
      "Continuous learning as a core competency"
    ],
    recommendations: [
      "Highlight transferable skills in your resume",
      "Consider relevant certifications",
      "Build a portfolio demonstrating your abilities",
      "Network with professionals in your target field"
    ],
    learningResources: [
      {
        title: "LinkedIn Learning",
        description: "Platform with courses on various professional skills",
        type: "Course"
      },
      {
        title: "Industry-specific certification",
        description: "Look for certifications relevant to your target role",
        type: "Certification"
      },
      {
        title: "Meetup groups",
        description: "Join local or virtual professional communities",
        type: "Networking"
      }
    ],
    suggestions: [
      {
        title: "Quantify your achievements",
        description: "Add specific metrics and results to make your experience more impactful",
        example: "Instead of 'Increased sales', write 'Increased sales by 35% over 6 months'"
      },
      {
        title: "Tailor your resume to the job description",
        description: "Align your skills and experience with the specific requirements of the role",
        example: "Mirror keywords from the job posting in your skills section"
      },
      {
        title: "Add a strong professional summary",
        description: "Begin with a concise overview of your experience and strengths",
        example: "Detail-oriented professional with 5+ years of experience in customer-focused roles"
      }
    ]
  };
}

/**
 * Analyzes the skill gap between user's resume and desired job role
 */
export async function analyzeSkillGap(resume: string, jobRole: string) {
  try {
    // Trim the resume if it's too long to prevent token limit issues
    const trimmedResume = resume.length > 10000 ? resume.substring(0, 10000) + "..." : resume;
    
    const prompt = `
      I want you to act as a career advisor and skills gap analyzer. I'll provide my resume content and my desired job role. Please analyze both and give me:

      1. A list of matching skills I already have that align with the job role
      2. A list of missing skills I need to develop for this role
      3. Current industry trends related to this role
      4. Specific recommendations to improve my chances
      5. Recommended learning resources (courses, books, certifications)

      My resume: ${trimmedResume}
      
      My desired job role: ${jobRole}

      Respond in the following JSON format only - no other text:
      {
        "matchingSkills": ["skill1", "skill2"...],
        "missingSkills": ["skill1", "skill2"...],
        "industryTrends": ["trend1", "trend2"...],
        "recommendations": ["recommendation1", "recommendation2"...],
        "learningResources": [
          {
            "title": "Resource Name",
            "description": "Brief description",
            "type": "Type (Course/Book/Certification)"
          }
        ]
      }
    `;

    return await makeGeminiRequest(prompt);
  } catch (error) {
    console.error("Error analyzing skill gap:", error);
    return createFallbackResponse();
  }
}

/**
 * Analyzes the resume and provides improvement suggestions
 */
export async function analyzeResume(resume: string, jobRole: string) {
  try {
    // Trim the resume if it's too long to prevent token limit issues
    const trimmedResume = resume.length > 10000 ? resume.substring(0, 10000) + "..." : resume;
    
    const prompt = `
      I want you to act as a professional resume reviewer. I'll provide my resume content and my desired job role. Please analyze my resume and give me specific suggestions to improve it for this job role.

      My resume: ${trimmedResume}
      
      My desired job role: ${jobRole}

      Give me 5-7 specific suggestions to improve my resume for this job role. Focus on:
      - Better ways to phrase my experience
      - Important keywords or skills I should highlight
      - Structure or formatting improvements
      - Things I should remove or de-emphasize
      - Additional sections I should add

      Respond in the following JSON format only - no other text:
      {
        "suggestions": [
          {
            "title": "Suggestion title",
            "description": "Detailed explanation of the suggestion",
            "example": "An example of how to implement this change"
          }
        ]
      }
    `;

    const response = await makeGeminiRequest(prompt);
    
    // Ensure the response has the necessary structure
    if (!response.suggestions) {
      response.suggestions = [
        {
          title: "Use action verbs",
          description: "Begin bullet points with strong action verbs to highlight your achievements",
          example: "Instead of 'Was responsible for...', use 'Managed...' or 'Led...'"
        },
        {
          title: "Customize for each application",
          description: "Tailor your resume to match the specific job description",
          example: "For a marketing role, emphasize your marketing experience and relevant skills"
        },
        {
          title: "Focus on achievements over responsibilities",
          description: "Highlight what you accomplished rather than just listing duties",
          example: "Instead of 'Responsible for social media', write 'Grew Instagram following by 200% in 6 months'"
        }
      ];
    }
    
    return response;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return {
      suggestions: [
        {
          title: "Use action verbs",
          description: "Begin bullet points with strong action verbs to highlight your achievements",
          example: "Instead of 'Was responsible for...', use 'Managed...' or 'Led...'"
        },
        {
          title: "Customize for each application",
          description: "Tailor your resume to match the specific job description",
          example: "For a marketing role, emphasize your marketing experience and relevant skills"
        },
        {
          title: "Focus on achievements over responsibilities",
          description: "Highlight what you accomplished rather than just listing duties",
          example: "Instead of 'Responsible for social media', write 'Grew Instagram following by 200% in 6 months'"
        }
      ]
    };
  }
}
