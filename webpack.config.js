const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // target: 'node',
    mode: "development",
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
        host: '0.0.0.0',
        port: 34567,
        hot: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        }
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "吃掉小药娘",
                meta: {
                    charset: 'UTF-8'
                }
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '/assets/pictures/[name].[ext]'
                }
            },
            {
                test: /\.(wav|mp3)$/i,
                loader: 'file-loader',
                options: {
                    name: '/assets/sounds/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.[contenthash:8].js",
        clean: true,
        assetModuleFilename: 'assets/[name][ext]'
    }
}
