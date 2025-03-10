
// API key for Gemini AI
const API_KEY = "AIzaSyBp4oDLmglH38eg1jdbew3C0RYI4VSEcWU";

interface InterviewData {
  company: string;
  position: string;
  experience: string;
}

interface AnalysisResult {
  keyTopics: string[];
  importantQuestions: string[];
  requiredSkills: string[];
  preparationTips: string[];
  similarCompanies: string[];
}

/**
 * Analyzes an interview experience using the Gemini API
 */
export async function analyzeInterviewExperience(interviewData: InterviewData): Promise<AnalysisResult> {
  try {
    const prompt = `
      I want you to act as a career advisor analyzing this interview experience. 
      
      Company: ${interviewData.company}
      Position: ${interviewData.position}
      Interview Experience: ${interviewData.experience}
      
      Please analyze this interview experience and provide guidance for other candidates preparing for similar interviews.
      
      Respond in the following JSON format only - no other text:
      {
        "keyTopics": ["topic1", "topic2", ...],
        "importantQuestions": ["question1", "question2", ...],
        "requiredSkills": ["skill1", "skill2", ...],
        "preparationTips": ["tip1", "tip2", ...],
        "similarCompanies": ["company1", "company2", ...]
      }
      
      Limit each array to a maximum of 5 items.
    `;

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
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the content from the response
    const content = data.candidates[0].content.parts[0].text;
    
    // Find the JSON string in the content (in case there's any text before/after)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from the response");
    }
    
    // Parse the JSON string
    const parsedResult = JSON.parse(jsonMatch[0]);
    
    return {
      keyTopics: parsedResult.keyTopics || [],
      importantQuestions: parsedResult.importantQuestions || [],
      requiredSkills: parsedResult.requiredSkills || [],
      preparationTips: parsedResult.preparationTips || [],
      similarCompanies: parsedResult.similarCompanies || [],
    };
  } catch (error) {
    console.error("Error analyzing interview experience:", error);
    throw error;
  }
}
