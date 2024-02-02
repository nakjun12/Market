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
  plugins: [
    require("daisyui"),
    // 글로벌 스타일을 추가하는 플러그인
    function ({ addBase }) {
      addBase({
        html: {
          "&::-webkit-scrollbar": {
            display: "none"
          },
          "scrollbar-width": "none" // Firefox
        },
        body: {
          "&::-webkit-scrollbar": {
            display: "none"
          },
          "scrollbar-width": "none" // Firefox
        }
      });
    }
  ],
  daisyui: {
    themes: ["cupcake"]
  }
};
