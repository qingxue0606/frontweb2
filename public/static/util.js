/* eslint-disable no-extend-native */
/*
 * @Author: Jiangxibo
 * @Date: 2017-07-20 17:09:49
 * @Last Modified by: Xu Haidong
 * @Last Modified time: 2017-08-04 16:26:27
 * @Last Modified by: Xu Haidong
 * @Last Modified time: 2017-07-31 17:18:17
 * @Last Modified by: Jiangxibo
 * @Last Modified time: 2017-11-13 16:39:04
 * @Notes:  定义一个vue全局的工具库 this.$util
 */
import $ from 'jquery';
export default function (Vue) {
	Vue.prototype.$util = {
		// 时间格式化
		config: {
			// apiUrl: 'http://127.0.0.1:7099'
			// apiUrl: 'http://114.215.40.239:7084'
			apiUrl: process.env.VUE_APP_BASE_URL
		},

		// 重写setItem事件，当使用setItem的时候，触发，window.dispatchEvent派发事件
		dispatchEventStroage () {
			const signSetItem = localStorage.setItem;
			localStorage.setItem = function (key, val) {
				const setEvent = new Event('setItemEvent');
				setEvent.key = key;
				setEvent.newValue = val;
				window.dispatchEvent(setEvent);
				signSetItem.apply(this, arguments);
			};
		},
		formatDate: function (date, format) {
			if (!date) return;
			if (!format || typeof (format) !== 'string') format = 'yyyy-MM-dd';
			let _date;
			if (typeof date === 'string' || typeof date === 'number') {
				_date = new Date(date);
			}
			var dict = {
				yyyy: _date.getFullYear(),
				M: _date.getMonth() + 1,
				d: _date.getDate(),
				H: _date.getHours(),
				m: _date.getMinutes(),
				s: _date.getSeconds(),
				MM: ('' + (_date.getMonth() + 101)).substr(1),
				dd: ('' + (_date.getDate() + 100)).substr(1),
				HH: ('' + (_date.getHours() + 100)).substr(1),
				mm: ('' + (_date.getMinutes() + 100)).substr(1),
				ss: ('' + (_date.getSeconds() + 100)).substr(1)
			};
			return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
				return dict[arguments[0]];
			});
		},
		/**
     * ajax请求
     * ex : com.ajax({url:'url',data:{},function(res){}}) || com.ajax(url)
     *      com.get('url',{},function(res){})
     *      com.post('url',{},function(res){})
     */
		ajax: function (opts, urlType) {
			if (typeof opts === 'string') {
				opts = {
					url: opts
				};
			}

			var ajaxDefaults = {
				dataType: 'json',
				headers: {
					token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
				},
				contentType: 'application/json',
				cache: true, // 设置为false将不会从浏览器缓存中加载请求信息。开发false,发布true
				error: function (e) {
					if (e.status == '401') {
						localStorage.clear();
						window.location.href = window.location.origin;
						localStorage.setItem('login', true);
					}
					// var msg = e.statusText
					//  console.error('请求出错,请联系管理员: \r\n' + opts.url + '\r\n', msg)
				}
			};
			opts.url = urlType ? this.setWebUrl(opts.url) : this.setWebApi(opts.url);
			opts = $.extend(ajaxDefaults, opts);

			try {
				var uri = this.parseUri(opts.url);
				if ((typeof opts.cros === 'undefined' || opts.cros === true) && location.host != uri.host) {
					opts.crossDomain = true;
					// opts.xhrFields = {
					//   withCredentials: true
					// };
				}
			} catch (e) {
				console.log(e);
			}
			if (!$.support.cors) { // ie9 no transport
				$.support.cors = true;
			}

			var xhr = $.ajax(opts);
			if (opts.isabort) {
				// 自动取消ajax请求
				setTimeout(function () {
					if (xhr) xhr.abort();
				}, opts.timeout || 30000);
			}

			return xhr;
		},
		get: function (url, data, callBack) {
			return this.ajax({
				url: url,
				data: data,
				type: 'get',
				success: callBack
			});
		},
		post: function (url, data, callBack) {
			return this.ajax({
				url: url,
				data: data,
				type: 'post',
				success: callBack
			});
		},

		/**
     * Gis 与 App的实现不一样, 请勿直接替换
     * 统一请求资源uri
     * 必须需要site的 storage
     * @url : 需要统一的url
     */
		setUri: function (url, type) {
			if (!type) {
				this.message('msg', '缺少type类型,请使用setWebApi/setWebUrl');
				return;
			}

			// 配置请求url
			// 1, 如果url 为绝对地址, 则直接访问
			// 2, 如果url 是json格式, 则直接访问
			// 3, 如果url 是txt格式, 则直接访问
			// 3, 其他情况,使用 config.apiUrl/config.webUrl + url形式访问
			// if (!(com.checkUrl(url) || new RegExp(".*\\.json").test(url) || new RegExp(".*\\.txt").test(url))) {
			if (!(this.checkUrl(url) || new RegExp('.*\\.json').test(url))) {
				if (type && type === this.config.apiUrl) { url = this.config.apiUrl + url; } else { url = this.config.apiUrl + url; }

				return url;
			} else {
				return url;
			}
		},
		/**
     * 统一url
     * @url : 需要统一的url
     * ex : com.setWebApi(url)
     */
		setWebApi: function (url) {
			return this.setUri(url, this.config.apiUrl);
		},

		/**
     * 统一url
     * @url : 需要统一的url
     * ex : com.setWebUrl(url)
     */
		setWebUrl: function (url) {
			return this.setUri(url, this.config.apiUrl);
		},
		/**
     * 验证url
     */
		checkUrl: function (url) {
			var RegUrl = new RegExp();
			RegUrl.compile('((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?');
			if (!RegUrl.test(url)) {
				return false;
			}
			return true;
		},
		parseUri (url) {
			var o = {
				strictMode: false,
				key: ['source', 'protocol', 'host', 'userInfo', 'user', 'password', 'authority', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
				q: {
					name: 'queryKey',
					parser: /(?:^|&)([^&=]*)=?([^&]*)/g
				},
				parser: {
					strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
					loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
				}
			};
			var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(url);
			var uri = {};
			var i = 14;

			while (i--) uri[o.key[i]] = m[i] || '';

			uri[o.q.name] = {};
			uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
				if ($1) uri[o.q.name][$1] = $2;
			});

			return uri;
		},
		clone (obj) {
			var o;
			// 如果  他是对象object的话  , 因为null,object,array  也是'object';
			if (typeof obj === 'object') {
				// 如果  他是空的话
				if (obj === null) {
					o = null;
				} else {
					// 如果  他是数组arr的话
					if (obj instanceof Array) {
						o = [];
						for (var i = 0, len = obj.length; i < len; i++) {
							o.push(window._vue.$util.clone(obj[i]));
						}
					} else { // 如果  他是对象object的话
						o = {};
						for (var j in obj) {
							o[j] = window._vue.$util.clone(obj[j]);
						}
					}
				}
			} else {
				o = obj;
			}
			return o;
		},
		debounce (func, delay) {
			let timeout;
			return function () {
				const context = this;
				const args = arguments;
				if (timeout) {
					clearTimeout(timeout);
				}
				timeout = setTimeout(() => {
					func.apply(context, args); // context.func(args)
				}, delay);
			};
		},
		throttle (fn, delay = 1000) {
			let timer = null;
			let firstTime = true;

			return function (...args) {
				if (firstTime) {
				// 第一次加载
					fn.apply(this, args);
					firstTime = false;
					return;
				}
				if (timer) {
				// 定时器正在执行中，跳过
					return;
				}
				timer = setTimeout(() => {
					clearTimeout(timer);
					timer = null;
					fn.apply(this, args);
				}, delay);
			};
		}
	};

	// 事件bus
	Vue.prototype.$eventBus = new Vue();
}
// 金融数字格式化
Number.prototype.toMoney = function () {
	let v = this.toFixed(2);
	v = parseFloat(v);
	v = v.toLocaleString();
	return v;
};
// 身份证信息脱敏
String.prototype.idCardHide = function () {
	return this.replace(/(\d{6})(\d{1,})(\d{4})/, '$1****$3');
};
// 身份证校验
String.prototype.idCardCheck = function () {
	const _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	const _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
	return _IDRe18.test(this) || _IDre15.test(this);
};

// 手机号校验
String.prototype.phoneNumberCheck = function () {
	return /^1[3456789]\d{9}$/.test(this);
};

/** 判断变量类型
	({}).toString.call([]) = "[object Array]"
	({}).toString.call(1) = "[object Number]"
	({}).toString.call('1') = "[object String]"
	({}).toString.call(true) = "[object Boolean]"
	({}).toString.call({name: 1}) = "[object Object]"
	({}).toString.call(new Map()) = "[object Map]"
	({}).toString.call(new Set()) = "[object Set]"
	({}).toString.call(null) = "[object Null]"
	({}).toString.call(undefined) = "[object Undefined]"
	({}).toString.call(parseInt('a')) = "[object Number]"
 */
Window.prototype.WSWCheckType = function (val) {
	const typeStr = ({}).toString.call(val).replace(/\[object\s(\w+)\]/, '$1').toLocaleLowerCase();
	return typeStr;
};
