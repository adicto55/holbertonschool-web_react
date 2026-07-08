const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/dashboard_main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  performance: {
    hints: false, // Suppresses the warning regarding asset size limits
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // type: 'javascript/auto' is required to prevent Webpack 5 from duplicating 
        // the image asset since we are specifically using file-loader.
        type: 'javascript/auto', 
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false, // Ensures image optimization is enabled
            },
          },
        ],
      },
    ],
  },
};