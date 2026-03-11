import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.rpovoadata.tech",
      dynamicRoutes: [
        "/",
        "/professional",
        "/personal",
        "/why-me",
        "/side-projects",
        "/contact"
      ]
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});