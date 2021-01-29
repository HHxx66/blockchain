module.exports = {
	publicPath: "/", // 基本路径
  	outputDir: "dist", // 输出文件目录
	devServer: {
		open: true, // auto open brower 项目启动后自动打开浏览器...
		disableHostCheck: false,
		host: "localhost",
		port: 9999, // 修改端口号
		https: false,
		hotOnly: false,
		proxy: {
			"/api": {
				target: "http://localhost:8888",
				changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
				pathRewrite: {
					"^/api": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
				}
			}
		}
	},
	lintOnSave: false,
	chainWebpack: config => {
		// 修复HMR
		config.resolve.symlinks(true);
	},
};
