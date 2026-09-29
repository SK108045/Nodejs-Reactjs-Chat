import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // nextjs-websocket (used by react-chat-engine-advanced) has require()
    // calls inside an ES module. Without this the built app is a blank page
    // with "require is not defined".
    commonjsOptions: { transformMixedEsModules: true },
  },
})
