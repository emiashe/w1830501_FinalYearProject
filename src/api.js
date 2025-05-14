import axios from "axios";


const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// Function to execute JavaScript code using Piston API
export const executeCode = async (sourceCode) => {
  try {
      const response = await API.post("/execute", {
          language: "javascript", // Hardcoded language to JavaScript
          version: "18.15.0", // Specify a stable JS version
          files: [
              {
                  content: sourceCode, // User's input code
              },
          ],
      });

      return response.data;
  } catch (error) {
      console.error("Error executing code:", error);
      throw error.response?.data || { isError: "An unexpected error occurred." };
  }
};
