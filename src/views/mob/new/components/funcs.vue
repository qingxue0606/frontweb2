<template>

	<el-row :gutter="20" class="funcs">
		<el-col
			:span="6"
			style="text-align: center"
			v-for="(item, index) in funcs"
			:key="index"
			@click="funcClick(item.url)"
		>
			<img style="width: 50px; height: 50px" :src="item.img" fit="fill"/>
			<br/><br/>
			{{ item.name }}
		</el-col>
	</el-row>


</template>
<script>

	export default {
		name: 'funcs',

		data() {
			return {
				searchStr: "",
				funcs: [
					{
						name: "工业品筛查",
						img: require("@/assets/images/newv/shaicha.png"),
						url: "/newv/through-detail",
						desc: "1秒区分工业品与非工业品",
					},
					{
						name: "AID认证",
						img: require("@/assets/images/newv/renzheng.png"),
						url: "/newv/auth-detail",
						desc: '获取艺术品独有的"指纹"',
					},
					{
						name: "眼学鉴定",
						img: require("@/assets/images/newv/jianding.png"),
						url: "/newv/appraise-detail",
						desc: "来自原作者和权威机构的鉴定",
					},
					{
						name: "AID验证",
						img: require("@/assets/images/newv/yanzheng.png"),
						url: "/newv/verify-detail",
						desc: '对比"指纹"确认"此物为此物"',
					},
				],
			}


		}
	}
</script>
<style lang="scss" scoped>

	.funcs {
		margin: 30px;
		padding-left: 10px;
		padding-right: 10px;
	}
</style>
