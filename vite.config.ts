import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // GitHub Pages需要设置base路径
    // 如果环境变量设置了VITE_BASE_URL，使用它；否则根据mode判断
    const base = env.VITE_BASE_URL || (mode === 'development' ? '/' : '/tree/');
    
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0', // 允许外部访问
        strictPort: true, // 如果端口被占用则失败，不尝试其他端口
        open: false, // 不自动打开浏览器
        cors: true, // 启用CORS
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
