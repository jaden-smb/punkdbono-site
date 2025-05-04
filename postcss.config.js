export default {
  plugins: {
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true,
          reduceIdents: false, // Keep identifiers intact
        },
      ],
    },
  },
};
