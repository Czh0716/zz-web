const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    transpileDependencies: ['vuetify'],

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/styles/variables.less')]
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.ts', '.d.ts', '.vue', '.json'],
            alias: {
                '@': resolve('src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            ]
        }
    }
}
