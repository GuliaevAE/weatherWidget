
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const { DefinePlugin } = require("webpack")
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const path = require('path');
module.exports = {
    entry: {
        app: "./src/main.ts"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.(ts|js)x?$/,
                loader: "babel-loader"
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                mode: "global",
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                            implementation: require("sass")
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".vue", ".json", ".scss"],
        alias: {
            vue$: "@vue/runtime-dom"
        },
        modules: ["node_modules"]
    },
    plugins: [
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new HTMLInlineCSSWebpackPlugin(),
    ],
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        port: 3001
    }
}