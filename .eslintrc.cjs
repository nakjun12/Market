module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:cypress/recommended",
    "plugin:vitest/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // .js 파일에서 JSX 허용
    "react/prop-types": "off", // prop-types 사용 비활성화
    "react/display-name": "off", // display-name 강제 비활성화
    "react/react-in-jsx-scope": "off", // JSX 스코프 내 React 강제 비활성화
    "react-hooks/exhaustive-deps": "off", // "missing dependency" 경고 비활성화
    "no-unused-vars": "warn", // 사용되지 않는 변수에 대해 경고 수준으로 낮춤
    "react/no-unknown-property": ["error", { ignore: ["css"] }] // Emotion의 'css' prop에 대한 오류 무시
  }
};
