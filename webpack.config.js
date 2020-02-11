const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: `${ __dirname }/dist`,
    },
    entry: {
        home: `${__dirname}/src/js/home.js`,
    },
    output: {
        filename: 'js/[name]/bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader', },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'], },
        ],
    },
    plugins: [ new VueLoaderPlugin(), ],
};