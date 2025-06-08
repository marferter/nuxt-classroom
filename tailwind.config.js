module.exports = {
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.vue',
      './nuxt.config.{js,ts}'
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF", // Bleu principal
          secondary: "#9333EA", // Violet secondaire
          accent: "#F59E0B", // Couleur d'accentuation
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
          heading: ["Merriweather", "serif"],
        },
        spacing: {
          'xs': '4px',
          'sm': '8px',
          'md': '16px',
          'lg': '24px',
          'xl': '32px',
        },
      },
    },
  };