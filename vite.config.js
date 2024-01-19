import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path"; // 현재 파일의 디렉토리 경로를 구합니다.
import { fileURLToPath } from "url";
import { defineConfig, transformWithEsbuild } from "vite";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/web/",
  plugins: [
    //jsx -> js 변환 세팅
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!RegExp(/src\/.*\.js$/).exec(id)) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic"
        });
      }
    },
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    })
  ],

  optimizeDeps: {
    //jsx -> js 변환 세팅
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  resolve: {
    //절대 경로 세팅
    alias: {
      "@": resolve(currentDir, "src") // '@'를 src 폴더의 절대 경로로 설정
    }
  },
  preview: {
    port: 8080,
    strictPort: true
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
    proxy: {
      // 모든 요청을 https://pinemarket.cielui.com/web 으로 프록시합니다.
      "/": {
        target: "https://pinemarket.cielui.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
