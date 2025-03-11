
/**
 * Extracts text content from various file types (PDF, DOCX, DOC, TXT)
 * Currently, this is a simplified implementation that handles text files
 * For a complete solution, you would need to use libraries like pdf.js, mammoth.js
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  // For simplicity in this demo, we'll just read text files directly
  // In a production app, you'd use specific libraries for PDF/DOCX parsing
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        // Check if the file is a text file or similar
        if (file.type === 'text/plain' || 
            file.name.endsWith('.txt') ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/msword' ||
            file.type === 'application/pdf') {
          
          // For this demo, we'll use a simple text extraction
          // In a real implementation, you'd use different methods based on file type
          const text = event.target?.result as string;
          
          // Clean up any non-readable characters before passing to the API
          const cleanedText = text.replace(/[^\x20-\x7E\r\n]/g, ' ').trim();
          resolve(cleanedText);
        } else {
          reject(new Error("Unsupported file type"));
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        reject(new Error("Failed to parse file content"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    // Read as text for simplicity
    reader.readAsText(file);
  });
};
