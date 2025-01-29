// frontend/postcss.config.js
const tailwindPlugin = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const postcssNesting = require('postcss-nesting');

module.exports = {
  plugins: [
    postcssNesting,
    tailwindPlugin,
    autoprefixer,
  ],
};
