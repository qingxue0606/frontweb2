<template>
	<div class="part-title flex f-ai-c f-jc-c">
		<div class="center flex f-ai-c f-jc-c">
			<span class="left line"></span>
			<div class="flex f-d-c f-ai-c">
				<p>{{title}}</p>
				<i>{{desc}}</i>
			</div>
			<span class="right line"></span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'partTitle',
	props: {
		title: String,
		desc: String
	}
};
</script>
<style lang="scss" scoped>
	.part-title {
		height: 180px;
		width: 100%;
		background-color: rgba($color: #FFFFFF, $alpha: 0);
		.center {
			position: relative;
			width: 748px;
			height: 60px;
			color: #333333;
			.line {
				width: 150px;
				height: 0;
				border-top: 1px solid #D3D9E1;
				position: absolute;
			}
			.left {
				left: 0;
			}
			.right {
				right: 0;
			}
			p {
				font-size: 26px;
				font-family: MicrosoftYaHei;
				text-align: center;
				margin-bottom: 10px;
			}
			i {
				font-size: 13px;
				font-family: ArialMT;
				text-align: center;
				font-style: normal;
				letter-spacing: 4px;
			}
		}
	}
</style>
