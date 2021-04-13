/*
 * @Author: your name
 * @Date: 2020-07-04 12:10:41
 * @LastEditTime: 2020-08-06 17:39:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /frontweb/src/main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import util from '../public/static/util';
import VueResourse from 'vue-resource';
import './assets/common.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import util from '../public/static/http.js';
// import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import waterfall from 'vue-waterfall2';
import * as Base64 from 'js-base64';
Vue.use(util);
Vue.use(VueResourse);
Vue.use(Base64);
// // 为了解决setItemEvent不立即生效，使用事件派发强制更高
// util.dispatchEventStroage()
Vue.config.productionTip = false;
window._vue = new Vue();
Vue.use(ElementUI);
Vue.use(waterfall);
if (!localStorage.getItem('latitude')) {
	const bdmpUrl = '://api.map.baidu.com/api?v=2.0&ak=tpdCUXr9iaGFQRUwxiONV9FyOc8MEsFD&s=1';
	const p = new Promise((resolve, reject) => {
		// 如果已加载直接返回
		if (typeof window.BMap !== 'undefined') {
			resolve(window.BMap);
			return true;
		}
		// 百度地图异步加载回调处理
		window.onBMapCallback = function () {
			resolve(window.BMap);
		};
		// 插入script脚本
		const scriptNode = document.createElement('script');
		scriptNode.setAttribute('type', 'text/javascript');
		if (window.location.protocol === 'https:') {
			scriptNode.setAttribute('src', 'https' + bdmpUrl);
		} else {
			scriptNode.setAttribute('src', 'http' + bdmpUrl);
		}
		document.head.appendChild(scriptNode);
	}).then(() => {
		var geoc = new window.BMap.Geocoder();
		var geolocation = new window.BMap.Geolocation();
		geolocation.getCurrentPosition(function (r) {
			if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
				var mk = new window.BMap.Marker(r.point);
				localStorage.setItem('latitude', r.point.lat);
				localStorage.setItem('longitude', r.point.lng);
			} else {
				console.log('无法定位到您的当前位置，导航失败，请手动输入您的当前位置！' + this.getStatus());
			}
		}, {
			enableHighAccuracy: true
		});
	}).catch(e => {
		console.error('加载百度地图失败');
	});
}
var sUserAgent = navigator.userAgent.toLowerCase();

const whiteList = ['search', 'detail', 'login', 'content', 'blockchain', 'chainDetail', 'newIndex'];
// 百度统计
const baseURL = process.env.NODE_ENV; // 自动识别环境
if (baseURL === 'production') {
	var _hmt = _hmt || [];
	window._hmt = _hmt; // 将_hmt挂载到window下
	(function () {
		var hm = document.createElement('script');
		hm.src = 'https://hm.baidu.com/hm.js?73231075ba5e3a1bcca6ac2217cb071d';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(hm, s);
	})();
}

router.beforeEach((to, from, next) => {
	if (baseURL === 'production' && _hmt) {
		if (to.path) {
			_hmt.push(['_trackPageview', '/#' + to.fullPath]);
		}
		// next();
	}

	if (to.query.a) {
		var canshu = window.location.href.split('&')[1];
		var canshu2 = Base64.decode(canshu).split('&');
		var wxtoken = canshu2[0].split('=')[1];
		var name = canshu2[1].split('=')[1];
		var img = canshu2[2].split('=')[1];
		localStorage.setItem('token', wxtoken);
		localStorage.setItem('customerName', name);
		localStorage.setItem('headImg', img);
	}
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	if (to.meta.content) {
		const head = document.getElementsByTagName('head');
		const meta = document.createElement('meta');
		document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords);
		document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description);
		meta.content = to.meta.content;
		head[0].appendChild(meta);
	} else {
		document.querySelector('meta[name="keywords"]').setAttribute('content', '');
		document.querySelector('meta[name="description"]').setAttribute('content', '孚链艺术鉴证体系是由孚链艺统科技有限公司联合浙江大学、上海交通大学共同研制开发的国内目前唯一以AID鉴证技术为核心，以区块链技术为背书 的艺术品鉴证溯源平台。该平台的主体是由以人工智能加模式化识别技术为保障 的艺术品鉴证体系和基于区块链技术的“分区共识”艺术品数据库两部分组成。');
	}
	if (to.path === '/newv') { // 如果是首面的话，直接next()
		next();
	} else {
		const newvWhiteList = [
			'newThroughDetail', 'newAuthDetail', 'newAppraiseDetail',
			'newVerifyDetail', 'personalSearch', 'personalDetail', 'newContent', 'newIndex',
			'personalHelp', 'personalBlockchain', 'personalChainDetail', 'vip', 'contact', 'aboutAs', 'market', 'show', 'card', 'credit', 'administer'
		];
		if (newvWhiteList.includes(to.name)) {
			next();
		} else if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
			next({
				path: '/newv/mLogin'
			});
		}
	}
});
router.afterEach((to, from, next) => { // 路由跳转从页面顶部开始
	window.scrollTo(0, 0);
});
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
