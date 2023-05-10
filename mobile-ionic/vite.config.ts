import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy()
    ],
    resolve:
        {
            alias: {
                "@shared": path.resolve(__dirname, "..", "shared")
            }
        },
    // test: {
    //     globals: true,
    //     environment: 'jsdom',
    //     setupFiles: './src/setupTests.ts',
    // }
})
