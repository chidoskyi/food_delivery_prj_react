/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
      './index.html', // Add your index.html file here
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

