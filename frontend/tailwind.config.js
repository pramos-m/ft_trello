//const plugin = require("tailwindcss/plugin");
//const animations = require("@midudev/tailwind-animations");
// import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
				inter: ["Inter", "sans-serif"],
				leira: ["Leira Lite", "sans-serif"],
				dangerless: ["Dangerless Liaisons", "sans-serif"],
				pompiere: ["Pompiere", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        DEFAULT: "#3C4043",
        neutral: {
          DEFAULT: "#FFFFFF",
          grey: {
            50: "#F8F9FA",
            100: "#F1F3F5",
            200: "#E9ECEF",
            300: "#DEE2E6",
            400: "#CED4DA",
            DEFAULT: "#ADB5BD",
            600: "#868E96",
            700: "#495057",
            800: "#343A40",
            900: "#212529",
          },
          black: "#000000",
        },
				btn: {
					blue: {
						DEFAULT: "#1A50D2",
					},
					grey: {
						DEFAULT: "#757575",
						selected: "#D9D9D9",
						optionSelected: "#F2F4F7",
						iron: "#DADCE0",
					},
				},
				cards: {
					iceberg: "rgba(220, 240, 255, 0.7)",
					aqua: "rgba(229, 251, 239, 0.7)",
					yellow: {
						dawn: "rgba(254, 250, 227, 0.7)",
					},
					pink: {
						dawn: "rgba(252, 233, 230, 0.7)",
						carousel: "rgba(244, 228, 229, 0.7)",
					},
					purple: {
						lavender: "rgba(231, 226, 252, 0.1)",
					},
					blue: {
						lavender: "#DFE9FE",
					},
				},
        blurBackground: {
          light: "rgba(0, 0, 0, 0.2)",
          dark: "rgba(241, 244, 254, 1)",
        },
        priority: {
          low: "rgba(20, 174, 92, 1)",
          medium: "rgba(191, 106, 2, 1)",
          high: "rgba(192, 15, 12, 1)",
        },
        logos: {
					blue: {
						dark: "#011E9A",
						navy: "#05183F",
						DEFAULT: "#1A50D2",
						light: "#A6C2F7",
					},
					grey: {
						DEFAULT: "#D9D9D9",
						text: "#3C4043",
						light: "#B1B0B0",
						lightest: "#F1F1F1",
					},
					white: {
						bluish: "#F1F4FF",
						DEFAULT: "#FFFFFF",
					},
        },
      },
      backgroundImage: {
        logo: "url('/logo.svg')",
      },
    },
  }
};
