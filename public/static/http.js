/*
 * @Author: weikang
 * @Date: 2020-07-02 10:55:57
 * @LastEditTime: 2020-07-31 13:14:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front/src/assets/util.js
 */
import Vue from 'vue';
export default {
	config: {
		domain: 'http://114.215.40.239:7084'
		// domain: 'http://192.168.2.110:7099'
	},
	getRequest (url, params, cb) {
		return new Promise((resolve, reject) => {
			Vue.http.get(
				this.config.domain + url,
				params, {
					emulateJSON: true
				}
			)
				.then(cb)
				.catch((err) => {
					reject(err);
				});
		});
	},
	postRequest (url, params, cb) {
		return new Promise((resolve, reject) => {
			Vue.http.post(
				this.config.domain + url,
				params, {
					emulateJSON: true
				}
			)
				.then(cb)
				.catch((err) => {
					reject(err);
				});
		});
	}
};
