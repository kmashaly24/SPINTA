
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        // Used packages
        'lucide-react@0.487.0': 'lucide-react',
        'class-variance-authority@0.7.1': 'class-variance-authority',

        // Used Radix UI components
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',

        // Figma assets
        'figma:asset/c0033141475f9734ac14cf46838e561d43e1cbb7.png': path.resolve(__dirname, './src/assets/c0033141475f9734ac14cf46838e561d43e1cbb7.png'),
        'figma:asset/a75db9bcda9eef7ef085e5ac795127525955e73f.png': path.resolve(__dirname, './src/assets/a75db9bcda9eef7ef085e5ac795127525955e73f.png'),
        'figma:asset/5be67071b9167d07dbd957c0d9d2d6284c7b7075.png': path.resolve(__dirname, './src/assets/5be67071b9167d07dbd957c0d9d2d6284c7b7075.png'),

        // Path alias
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });