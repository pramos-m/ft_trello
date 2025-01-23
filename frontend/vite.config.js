import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const { API_URI = "", PORT = 3000 } = process.env

export default defineConfig({
  plugins: [react()],
	resolve: {
		alias: {
			src: "/src",
			components: "/src/components",
			hooks: "/src/hooks",
			pages: "/src/pages",
			context: "/src/context",
			data: "/src/data",
			services: "/src/services",
			utils: "/src/utils",
		},
	},
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: API_URI,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    watch: {
      usePolling: true
    },
    strictPort: true,
    port: parseInt(PORT, 10)
  }
})
