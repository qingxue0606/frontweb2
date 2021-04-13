/*
 * @Author: your name
 * @Date: 2020-07-04 23:56:28
 * @LastEditTime: 2020-07-06 09:46:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fuchain_attestation_record/frontweb/vue.config.js
 */

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	lintOnSave: false,
	productionSourceMap: false,
	configureWebpack: config => {
		// console.log(process);
		if (process.env.NODE_ENV === 'production') {
			config.optimization = {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						parallel: true,
						terserOptions: {
							ecma: undefined,
							warnings: false,
							compress: {
								drop_console: true,
								drop_debugger: true,
								pure_funcs: ['console.log'] // 移除console
							}
						}
					})
				]
			};
			// 为生产环境修改配置...
		} else {
			// 为开发环境修改配置...
			config.devtool = 'source-map';
		}
	}

};
