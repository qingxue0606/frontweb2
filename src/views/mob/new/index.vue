<template>
	<div class="page-container">
		<nav-bar></nav-bar>
		<banners></banners>
		<funcs></funcs>
		<wb></wb>


		<el-button type="primary">主要按钮</el-button>
		<i class="el-icon-share"></i>
		<br/><br/><br/><br/><br/><br/><br/><br/>
		<br/><br/><br/><br/><br/><br/><br/><br/>
		2 2 2 2 2
		<br/><br/><br/><br/><br/><br/><br/><br/>
		2 2 2 2 2
		<br/><br/><br/><br/><br/><br/><br/><br/>
		<br/><br/><br/><br/><br/><br/><br/><br/>
		2 2 2 2 2
		<br/><br/><br/><br/><br/><br/><br/><br/>
		<br/><br/><br/><br/><br/><br/><br/><br/>
		2 2 2 2 2
	</div>
</template>
<script>
	import navBar from "@/views/mob/new/components/navBar";
	import banners from "@/views/mob/new/components/banners";
	import funcs from "@/views/mob/new/components/funcs";
	import wb from "@/views/mob/new/components/wb";

	export default {
		components: {navBar, banners, funcs, wb},
		data() {
			return {
				uploadImg: "", // 以图搜索
				imgFlag: false,


				qklsRight: [
					{
						img: require("@/assets/images/newv/icon_gky.png"),
						title: "高可用",
						desc: [
							"动态数据失效恢复机制",
							"动态增删节点(动态成员准入) ",
							"热备切换",
						],
					},
					{
						img: require("@/assets/images/newv/icon_kkz.png"),
						title: "可扩展",
						desc: [
							"数据存储横向扩展、数据库类型替换",
							"支持对数据定期归档",
							"微服务架构",
							"支持多种虚拟机：JS、WVM",
							"支付通道",
							"易运维",
						],
					},
					{
						img: require("@/assets/images/newv/icon_ksy.png"),
						title: "可溯源",
						desc: [
							"作品信息、鉴证过程、交易情况全方位记录",
							"鉴证数据随时查询，终生追溯",
						],
					},
				],
			};
		},
	};
</script>
<style lang="scss" scoped>

</style>
