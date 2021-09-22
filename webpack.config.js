const path=require('path')
module.exports = {
    entry: './public/src/shop.js',
    output:{
        path:path.resolve(__dirname,'public'),
        filename: "script.js"
    },
    module: {
        rules:[
            {
                test:/\.js$/,
                use:[
                    {loader:'babel-loader'},
                ]
            },
            {
                test: /\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                ]
            }
        ]
    }
}