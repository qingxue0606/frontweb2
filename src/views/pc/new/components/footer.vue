<template>
	<div class="footer flex f-d-c f-ai-c">
		<div class="top flex f-ai-fs f-jc-sb">
			<img src="@/assets/images/newv/icon_fljz_big.png" alt="">
			<div class="flex f-d-c">
				<p>关于我们</p>
				<span @click="aboutAs">公司介绍</span>
				<span>公众号</span>
				<!-- <span>微博</span> -->
			</div>
			<div class="flex f-d-c">
				<p>商务合作</p>
				<span>电话：18810889869（慕先生）</span>
				<span>邮箱：muzhiteng@fulianyitong.com</span>
			</div>
			<div class="flex f-d-c">
				<p>联系方式</p>
				<span>地址：北京市朝阳区万红路5号蓝涛中心13B-1</span>
				<span>电话：010-64359699</span>
				<span>邮箱：service@fulianyitong.com</span>
			</div>
		</div>
		<div class="bottom flex f-jc-c">
			&#169copyright 孚链艺术品鉴定认证有限公司 版权所有 2020 鲁ICP备 20027832号-1
		</div>
	</div>
</template>
<script>
export default {
	name: 'newvFooter',
	methods: {
		aboutAs () {
			this.$router.push('/newv/aboutAs');
		}
	}
};
</script>
<style scoped lang="scss">
	.footer {
		height: 220px;
		background: #35404F;
		padding: 40px 83px 30px 83px;
		.top {
			border-bottom: 1px solid #32374F;
			width: 1200px;
			img {
				width: 240px;
				height: 67px;
			}
			div {
				p {
					font-size: 14px;
					font-family: MicrosoftYaHei;
					text-align: left;
					color: #ffffff;
					line-height: 19px;
					letter-spacing: 1px;
					margin-bottom: 16px;
				}
				span {
					font-size: 12px;
					margin-bottom: 10px;
					font-family: MicrosoftYaHei;
					text-align: left;
					color: #9398a3;
					line-height: 16px;
					letter-spacing: 1px;
				}
			}
		}
		.bottom {
			font-size: 12px;
			font-family: MicrosoftYaHei;
			text-align: left;
			color: #9398a3;
			line-height: 16px;
			letter-spacing: 1px;
			padding-top: 15px;
			width: 1200px;
		}
	}
</style>
