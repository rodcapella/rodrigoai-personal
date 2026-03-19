import { defineConfig } from "vite"
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  optimizeDeps: {
    include: ["lucide-react"]
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'; // Agrupa todas as bibliotecas num só ficheiro para evitar erros de contexto nulo
          }
        }
      }
    }
  }
})