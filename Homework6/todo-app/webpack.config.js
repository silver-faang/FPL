const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: argv.mode || 'development',
        entry: './src/index.ts',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        performance: {
            maxAssetSize: 512000,
            maxEntrypointSize: 512000,
        },
    };
};
