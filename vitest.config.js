import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

//vitest 를 위한 config
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom"
    }
  })
);
