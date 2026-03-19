// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  build: {
    rollupOptions: {
      output: {
        // Isto garante que o React e o Router fiquem sempre juntos no mesmo ficheiro
        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
});