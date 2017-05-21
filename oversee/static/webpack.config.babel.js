import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

export default {
  entry: {
    setup: path.join(SRC_DIR, 'js/setup/index.js'),
    remote: path.join(SRC_DIR, 'js/remote/index.js'),
    screen: path.join(SRC_DIR, 'js/screen/index.js'),
    style: path.join(SRC_DIR, 'sass/style.scss')
  },
  output: {
    path: DIST_DIR,
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }, {
      test: /\.scss$/,
      exclude: /(node_modules)/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('css/app.bundle.css'),
  ]
}
