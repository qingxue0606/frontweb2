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
		minInfo: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/mine/home/info',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		addressList: function () {
			const ajaxOptions = {
				type: 'GET',
				url: '/customer/address/list',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		add_or_updateAdderss: function (method, data) {
			const ajaxOptions = {
				type: method,
				url: '/customer/address',
				contentType: 'application/json',
				data: JSON.stringify(data)
			};
			return com.ajax(ajaxOptions);
		},
		// 删除地址
		deleteAdd: function (data) {
			const ajaxOptions = {
				type: 'DELETE',
				url: '/customer/address/' + data,
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},

		defalutAdd: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/customer/address/' + data + '/default',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 送检人列表
		deliveryList: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/customer/delivery/info/list',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		add_or_updateDelivey: function (method, data) {
			const ajaxOptions = {
				type: method,
				url: '/customer/delivery/info',
				contentType: 'application/json',
				data: JSON.stringify(data)
			};
			return com.ajax(ajaxOptions);
		},
		getDelivey: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/customer/delivery/info/' + data,
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 删除送检人列表
		deleteDelivey: function (data) {
			const ajaxOptions = {
				type: 'DELETE',
				url: '/customer/delivery/info/' + data,
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 设为默认送检人
		defalutDelivey: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/customer/delivery/info/' + data + '/default',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 修改手机验证码
		phoneChangeCode: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/mine/home/phoneChangeCode',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 修改手机提交
		phoneChange: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/mine/home/phoneChange',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 我的足迹
		getFootPrint: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/track/query',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 删除足迹
		deleteFoot: function (data) {
			const ajaxOptions = {
				type: 'PUT',
				url: '/track/',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 清空足迹
		removeFoot: function () {
			const ajaxOptions = {
				type: 'POST',
				url: '/track/removeAll',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 修改个人信息
		updateMineInfo: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/mine/home/updateMineInfo',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 获取实名认证信息
		authInfo: function () {
			const ajaxOptions = {
				type: 'GET',
				url: '/cert/authInfo',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 实名认证提交
		certifySubmit: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/cert/certify',
				contentType: 'application/json',
				data: JSON.stringify(data)
			};
			return com.ajax(ajaxOptions);
		},
		// 艺术家认证提交
		insertRequire: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/brand/insertRequire',
				contentType: 'application/json',
				data: JSON.stringify(data)
			};
			return com.ajax(ajaxOptions);
		},
		// 我的投诉
		compList: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/complaints/query',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		compSubmit: function (data) {
			const ajaxOptions = {
				type: 'POST',
				url: '/complaints/',
				contentType: 'application/json',
				data: JSON.stringify(data)

			};
			return com.ajax(ajaxOptions);
		},

		// 结果申诉
		appealSubmit: function (data) {
			const ajaxOptions = {
				type: 'PUT',
				url: '/serv/orderAppeal/',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 我的消息
		getMsgList: function (data) {
			const ajaxOptions = {
				type: 'GET',
				url: '/mine/message',
				contentType: 'application/x-www-form-urlencoded',
				data: data
			};
			return com.ajax(ajaxOptions);
		},
		// 微信重新绑定
		wechatAuth: function () {
			const ajaxOptions = {
				type: 'GET',
				url: '/mine/home/wechatAuth',
				contentType: 'application/x-www-form-urlencoded'
			};
			return com.ajax(ajaxOptions);
		},
		// 微信授权登录回调
		authcallback: function (data) {
			const ajaxOptions = {
				type: 'GET',
				contentType: 'application/json',
				data: data,
				url: '/mine/home/callback'
			};
			return com.ajax(ajaxOptions);
		},
		// 增加认证艺术家信息展示
		authMessage: function (data) {
			const ajaxOptions = {
				type: 'POST',
				contentType: 'application/json',
				url: '/cert/getCertifyInfo?customerUuid=' + data
			};
			return com.ajax(ajaxOptions);
		}

	};
}
