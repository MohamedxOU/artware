const config = {
  plugins: [
    "@tailwindcss/postcss",
    [
      "postcss-preset-env",
      {
        stage: 1, // Enables @property support (CSS Houdini)
        features: {
          "custom-properties": true,
        },
      },
    ],
  ],
};

export default config;
