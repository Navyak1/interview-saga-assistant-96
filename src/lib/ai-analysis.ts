
export async function analyzeInterview(interviewData: any) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Analyze this interview experience and provide actionable insights for interview preparation:
          
          Company: ${interviewData.company}
          Position: ${interviewData.position}
          Experience: ${interviewData.experience}
          
          Please provide:
          1. Key Technical Topics to Study
          2. Common Questions to Prepare
          3. Required Skills
          4. Preparation Tips
          5. Similar Companies' Interview Patterns`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    })
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
