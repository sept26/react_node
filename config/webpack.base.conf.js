// path 模块提供用于处理文件路径和目录路径的实用工具
const path = require('path')
// 1.为html文件中引入的外部资源如script.link动态添加每次compile后的hash,防止引用缓存的外部文件问题
// 2.可以生成创建html入口文件比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HtmlWebpackPlugin = require('html-webpack-plugin')
// __dirname 当前路径的绝对路径
// 跳出来就是这个项目的根目录
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // context: 基础目录，绝对路径，用于从配置中解析入口起点
  // 跳出来 项目根目录
  context: path.resolve(__dirname, '..'),
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    // extensions：Array 自动解析不需要扩展名
    extensions: ['.js', '.jsx', '.json'],
    // alias：(别名)object主要用来让import和require调用更方便，设置初始路径
    alias: {
      '@': resolve('src')
    }
  },
  // loader
  // 通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等，一般用于module的use中
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader','less-loader']
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader' ,
        query:{
          presets:['es2015','stage-0','react']
        }
      },
      {
        test: /\.svg/,
        use: ['file-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader', //是指定使用的loader和loader的配置参数
        options: {
            limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
            name: 'images/[name]_[hash:7].[ext]',
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}