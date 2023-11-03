/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans JP', 'sans-serif'],
      // en: [...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        theme: {
          light: '#ffffff',
          medium: '#6d6d6d',
          DEFAULT: '#242424',
          dark: '#111111',
        },
        // メインカラー
        primary: {
          // light: '',
          // medium: '',
          DEFAULT: 'green',
          // dark: '',
        },
        // サブカラー
        secondary: {
          light: '',
          medium: '',
          DEFAULT: 'yellow',
          dark: '',
        },
        // アクセントカラー
        // accent: {
        //   light: '',
        //   medium: '',
        //   DEFAULT: '',
        //   dark: '',
        // },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
