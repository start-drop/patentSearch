module.exports = {
    devSever: {
        proxy: {
            "/api": {
                target: "https://aip.baidubce.com",  //需要跨域的目标url
                changeOrigin: true,  //将基于名称的虚拟托管网站的选项，如果不配置，请求会报404
                pathRewrite: {
                    "^/api": ""   //若请求的路径在目标url下但不在/api下，则将其转换成空
                }
            }
        }
    }
}