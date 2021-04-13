/*
 * @Author: your name
 * @Date: 2020-07-04 12:10:41
 * @LastEditTime: 2020-08-04 09:41:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /frontweb/src/router/index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import newRoutes from './newRoutes';

var home = r => require.ensure([], () => r(require('@/views/pc/home')), 'home');// pc首页

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
	return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		name: 'index',
		component: home,
		meta: {
			title: '孚链艺术品鉴证备案网'
		}
	},
	...newRoutes
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
