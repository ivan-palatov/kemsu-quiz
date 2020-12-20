module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
  theme: {
    extend: {},
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
