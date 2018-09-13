const path = require('path');

module.exports = {
  entry: './src/logic.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
