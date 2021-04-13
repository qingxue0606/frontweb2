/*
 * @Author: liting
 * @Date: 2020-07-04 13:13:15
 * @LastEditTime: 2020-07-23 10:46:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /fuchain_attestation_record/frontweb/src/api/home.js
 */
export default function () {
	const com = window._vue.$util;
	return {
		// 获取验证码
		getCode: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/sms/getMobileCodeByLogin',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 微信验证码
		getCode1: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/sms/getCodeByLoginBindPhone',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		codeLogin: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/loginByMobile',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		wxLoginBindPhone: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/wxLoginBindPhone',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		loginOut: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/logout',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 微信授权接口1
		wxlogin: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/wexinlogin',
				contentType: 'application/x-www-form-urlencoded',
				data
			};
			return com.ajax(ajaxOptions);
		},
		// 获取会员信息toekn
		getUserToken: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/callback',
				contentType: 'application/json',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 获取编号
		getqueryType: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/content/queryType',
				contentType: 'application/json',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 获取内容
		queryContentDetail: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/content/queryContentDetail',
				contentType: 'application/json',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 获取内容
		queryAllCategory: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/content/queryAllCategory',
				contentType: 'application/json',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 根据编号 获取内容
		queryContentByNo: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/content/queryContent',
				contentType: 'application/json',
				data: data
			};
			return com.ajax(ajaxOptions);
		}
	};
}
