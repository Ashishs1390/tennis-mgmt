const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        server: './src/server/index.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                exclude: /node_modules/
            }
        ]
    }
};
// module.exports = {
//     entry: './src/server/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'api.bundle.js',
//     },
//     target: 'node'
// };