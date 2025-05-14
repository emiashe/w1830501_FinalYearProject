//w1830501
// API configuration for executing JavaScript code using Piston API

import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// Function to send code to the Piston API for execution
export const executeCode = async (sourceCode) => {
  try {
      const response = await API.post("/execute", {
          language: "javascript",
          version: "18.15.0",
          files: [
              {
                  content: sourceCode,
              },
          ],
      });

      return response.data;
  } catch (error) {
      console.error("Error executing code:", error);
      throw error.response?.data || { isError: "An unexpected error occurred." };
  }
};
