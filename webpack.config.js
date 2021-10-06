const path=require('path')
const VueLoaderPlugin=require('vue-loader/lib/plugin')
module.exports = {
    entry: './public/src/shop.js',
    output:{
        path:path.resolve(__dirname,'public'),
        filename: "script.js"
    },
    resolve: {
        alias: {
        vue: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules:[
           // {
           //     test:/\.js$/,
           //     use:[
           //         {loader:'babel-loader'},
           //     ]
           // },
            {
                test: /\.[s]?css$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options: {
                            modules: true,
                            //localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test:/\.vue$/,
                use:[
                    {loader:'vue-loader'},
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}