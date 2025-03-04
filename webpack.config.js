module.exports = {
  module: {
    rules: [
      {
        test: /\.woff$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
    ],
  },
};
