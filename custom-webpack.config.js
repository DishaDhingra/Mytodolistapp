const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src', to: 'dist/my-to-do-list-app' }
      ],
    }),
  ],
};
