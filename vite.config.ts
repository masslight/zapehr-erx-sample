import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }: { mode: any}) => {
  const envDir = './env';

  return defineConfig({
    envDir: envDir,
    publicDir: 'public',
    plugins: [react()],
    server: {
      port: 3000,
    },
  });
}
