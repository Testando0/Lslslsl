import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-600': '#6D28D9', // Cor principal roxa
        'purple-700': '#5B21B6',
        'purple-400': '#A78BFA',
        'gray-950': '#0A0A0C', // Preto mais escuro
        'gray-900': '#101014',
        'gray-800': '#1A1A1E',
        'gray-700': '#26262C',
      },
    },
  },
  plugins: [],
};
export default config;
