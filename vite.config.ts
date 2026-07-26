import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc';
import path from "path";
import { fileURLToPath } from 'url';

// Se o __dirname der erro em ESM, usamos isto:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const moduleId = id.replace(/\\/g, "/");
          if (!moduleId.includes("/node_modules/")) return;

          if (
            /\/node_modules\/(?:react|react-dom|react-router|react-router-dom|scheduler|@remix-run)\//.test(
              moduleId,
            )
          ) {
            return "react-core";
          }

          if (
            moduleId.includes("/node_modules/framer-motion/") ||
            moduleId.includes("/node_modules/motion-dom/") ||
            moduleId.includes("/node_modules/motion-utils/")
          ) {
            return "motion";
          }

          if (moduleId.includes("/node_modules/react-helmet-async/")) {
            return "seo";
          }
        },
      },
    },
  }
});
