const newIndex = r => require.ensure([], () => r(require('@/views/pc/new/index')), 'newIndex');

let routes;
var sUserAgent = navigator.userAgent.toLowerCase();
if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
	routes = [
		{
			path: '*',
			redirect: '/'
		}
	];
} else {
	routes = [
		{
			path: '/newv', 
			name: 'newIndex',
			component: newIndex,
			meta: {
				title: '孚链鉴证-提供专业的艺术品大数据服务体系',
				content: {
					description: '孚链艺术鉴证体系是由孚链艺统科技有限公司联合浙江大学、上海交通大学共同研制开发的国内目前唯一以AID鉴证技术为核心,以区块链技术为背书 的艺术品鉴证溯源平台。',
					keywords: '孚链,孚链鉴证,AID鉴证,区块链,大数据'
				}
			}
		}
	];
}
export default routes;
