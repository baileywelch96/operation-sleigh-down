import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the built site work from any folder,
// including a GitHub Pages project URL like /operation-sleigh-down/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
