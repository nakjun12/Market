import { defineConfig } from "cypress";

//cypress 테스팅 세팅

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite"
    }
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents() {
      // implement node event listeners here
    },
    experimentalStudio: true
  }
});
