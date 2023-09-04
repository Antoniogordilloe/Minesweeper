module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {

      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        30: 'repeat(30, minmax(0, 1fr))',
        50: 'repeat(50, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
}
