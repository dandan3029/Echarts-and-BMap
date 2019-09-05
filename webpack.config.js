var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        proxy: {
            '/api': {
                target: 'https://www.echartsjs.com/examples',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,     // target是域名的话，需要这个参数，
                secure: false,          // 设置支持https协议的代理
            },
        }
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: 'Todo List with Redux & Webpack'
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|browser_components)/,  //这里面的不解析
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                },
            }
        ]
    },
    performance: {
        maxEntrypointSize: 400000000000000,
        maxAssetSize: 10000000000000
    }
}