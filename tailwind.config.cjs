module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Courier New"', 'monospace'],
      },
      colors: {
        matrix: '#20C20E',
        terminal: '#0A0A0A',
      },
    },
  },
  plugins: [],
}
