const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UglifyJS = require('uglify-es');

const DefaultUglifyJsOptions = UglifyJS.default_options();
const compress = DefaultUglifyJsOptions.compress;
for (let compressOption in compress) {
    compress[compressOption] = false;
}
compress.unused = true;
module.exports = env => {
    return {
        entry: {
            app: './resources/js/App.js'
        },
        output: {
            path: path.resolve(__dirname, 'public/js/dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'prettier-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // '[name].[chunkhash].js' put this if you want to get hashed files to cache bust
                filename: 'styles.css' // 'style.[contenthash].css' put this if you want to get hashed files to cache bust
            }), // new HtmlWebpackPlugin({
            // 	inject: false,
            // 	hash: true,
            // 	template: './assets/index.html',
            // 	children: false,
            // 	filename: '../index.html'
            // }),
            new WebpackMd5Hash()
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|axios)[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress,
                        mangle: false,
                        output: {
                            beautify: env.NODE_ENV !== 'production' ? true : false
                        }
                    }
                })
            ],
            usedExports: true,
            sideEffects: true
        }
    };
};
