import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: { 
    '/':'https://woof-and-roof.onrender.com'
  },
  plugins: [react(), mkcert()],
  css: {
    preprocessorOptions: {
      scss: {
        // additional scss loader options
      }
    }
  },
  resolve: {
    alias: {
      src: "/src",
    },
  }
})
