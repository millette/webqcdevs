module.exports = {
  entry: [
    './entry.js',
    'file?name=index2.html!jade-html!./index2.jade',
    'file?name=index3.html!jade-html!./index3.jade'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
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
  postcss: [
    require('postcss-responsive-type')(),
    require('lost'),
    require('autoprefixer')
  ]
}
