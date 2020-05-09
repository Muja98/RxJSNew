const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: "inline-source-map",
  resolve:{
      extensions:['.ts','.js','.json']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  
  },
  module:{
      rules:[
          {
           test: /\.js$/,
           exclude: /(node_modules|bower_component)/,
           use:{
             loader: 'babel-loader',
             options:{
               presets:['@babel/presets-env']
             }
           }
          },
          {
            test: /\.ts?$/,
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