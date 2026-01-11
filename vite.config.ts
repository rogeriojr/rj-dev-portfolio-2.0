import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') && !id.includes('/react-dom/') && !id.includes('/react-router/') && !id.includes('/react-icons/') && !id.includes('/react-joyride/') && !id.includes('/react-markdown/')) {
              return 'vendor-react-core';
            }
            if (id.includes('/react-dom/')) {
              return 'vendor-react-core';
            }
            if (
              id.includes('/react-router/') ||
              id.includes('/react-icons/') ||
              id.includes('/react-joyride/') ||
              id.includes('/react-markdown/') ||
              id.includes('/@chakra-ui/') || 
              id.includes('/@emotion/') ||
              id.includes('/framer-motion/')
            ) {
              return 'vendor-react';
            }
            if (id.includes('/mermaid/')) {
              return 'vendor-heavy';
            }
            if (id.includes('/firebase/')) {
              return 'vendor-firebase';
            }
            return 'vendor-other';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react/jsx-runtime',
      'react-router-dom',
      'react-icons',
      'react-joyride',
      'react-markdown',
      '@chakra-ui/react',
      '@chakra-ui/icons',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
})
