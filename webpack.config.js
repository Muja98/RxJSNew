const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  
  },
  module:{
      rules:[
          {
           test: /\.js$/,
           exclude:/node_modules/,
           use:'babel-loader'
          },
          {
            test: /\.tsx?$/,
            exclude:/node_modules/,
            use:'ts-loader'
          },
          {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: 'file-loader'
          }
      ]
  }
};