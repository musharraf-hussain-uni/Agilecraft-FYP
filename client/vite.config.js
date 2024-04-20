import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  env: {
    VITE_API_URL: "http://localhost:3001/api",
  },
  plugins: [react()],
});
