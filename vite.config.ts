import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function removeVendorPreload() {
  return {
    name: 'remove-vendor-preload',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string) {
        return html.replace(/<link rel="modulepreload"[^>]*href="\/assets\/vendor[^"]*\.js"[^>]*>\s*/g, '');
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    removeVendorPreload(),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return null;
            }
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
      },
    },
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
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
})
