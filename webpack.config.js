const path = require('path');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/', // Public path for dynamic imports
  },
  resolve: ['.js', '.jsx', 'json'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Use your Babel configuration
      },
    ],
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json', // Output file for code-splitting info
    }),
  ],
};
