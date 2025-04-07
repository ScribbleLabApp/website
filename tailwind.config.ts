module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [
      require('@tailwindcss/aspect-ratio'),
    ],
    theme: {
      extend: {
        aspectRatio: {
          '16/9': '16 / 9',
          '4/3': '4 / 3',
          '1/1': '1 / 1',
        },
      },
    },
  };