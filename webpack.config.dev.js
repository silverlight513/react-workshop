const path = require('path'); // NodeJS module

module.exports = {
  mode: 'development',
  entry: {
    app: ['./client']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: __dirname,
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  }
};
