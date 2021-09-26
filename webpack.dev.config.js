const {merge}=require('webpack-merge')
const base=require('./webpack.config')

module.exports=merge(base,{
    output: {
        publicPath:'/js'
    },
    mode: 'development',
    devServer:{
        static:'./public',
        port:3000,
        host:'localhost',
        hot:true,
    }
})