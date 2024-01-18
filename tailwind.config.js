/** @type {import('tailwindcss').Config} */
//tailwindcss 설정

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      pretendard: ["Pretendard", "sans-serif"]
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro"]
  }
};
