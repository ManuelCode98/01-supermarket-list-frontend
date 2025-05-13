import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/

export default defineConfig({ 
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173
    },

})

// export default defineConfig({ 
//   server: {
//     allowedHosts: [
//       '7a21-2803-e5e0-2608-2700-f045-8b30-6e67-a056.ngrok-free.app'
//     ],
//     port: 5173
//   },
//   plugins: [react()], 
// })

