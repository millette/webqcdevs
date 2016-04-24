'use strict'

module.exports = {
  entry: [
    './entry.js',
    'file?name=index.html!jade-html!./index.jade'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 1234
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  jadeLoader: {
    locals: {
      data: require('./data.json')
    }
  },
  postcss: (webpack) => [
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    require('postcss-responsive-type')(),
    require('lost'),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ]
}
