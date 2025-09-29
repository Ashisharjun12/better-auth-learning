import { createAuthClient } from "better-auth/react";
import { config } from "../config/config.js";

export const authClient = createAuthClient({
  baseURL: config.API_BASE_URL,
  fetchOptions: {
    credentials: "include"
  }
});

// Add debugging
console.log("Auth client baseURL:", config.API_BASE_URL);

// Export specific methods for easier use
export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession,
  getSession 
} = authClient;
