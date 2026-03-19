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
          if (id.includes('node_modules')) {
            // Agrupamos tudo o que é core num só vendor para evitar 
            // os erros de contexto (future/useContext) que estavas a ter
            return 'vendor';
          }
        }
      }
    }
  }
});