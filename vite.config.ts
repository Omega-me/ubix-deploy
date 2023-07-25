import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // server: {
    //   proxy: {
    //     '/api/v1': process.env.VITE_API_URL,
    //   },
    // },
    plugins: [react(), tsconfigPaths()],
  });
};
