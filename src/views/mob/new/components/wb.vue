<template>

	<!-- 核心业务 -->
	<div class="wb  f-d-c f-ai-c">
		<div class="title" >核心业务</div>

		<el-carousel  height="500px" indicator-position="outside" class="carousel">
			<el-carousel-item v-for="item in coreBussiness" :key="item">
				<div class="pic"><img  src="" alt="" /></div>

				<div class="cbname"><img :src="coreBussiness[0].icon" alt="" />{{ item.name }}</div>
				<p class="desc">{{item.desc}}</p>
				<p class="buss"><span v-for="(ite, ind) in item.buss" :key="ind">{{
                ite.name
              }}</span>    </p>
			</el-carousel-item>
		</el-carousel>


	</div>

</template>
<script>

	export default {
		name: 'funcs',

		data() {
			return {

				coreBussiness: [
					{
						name: "鉴证服务",
						desc:
							"依托AID、人工智能和区块链技术，让艺术品鉴证更快捷、更安全、更精准",
						icon: require("@/assets/images/newv/icon_jianzheng.png"),
						buss: [
							{ name: "工业品筛查", url: "" },
							{ name: "AID认证", url: "" },
							{ name: "眼学鉴定", url: "" },
							{ name: "AID验证", url: "" },
						],
					},
					{
						name: "鉴证技术研发",
						desc:
							"集数据中心搭建、算法研究、平台设计、设备制造为一体，构建AID鉴证全生态体系",
						icon: require("@/assets/images/newv/icon_wenku.png"),
						buss: [
							{ name: "固定设备", url: "" },
							{ name: "移动设备", url: "" },
							{ name: "云端比对", url: "" },
							{ name: "综合管理系统", url: "" },
						],
					},
					{
						name: "区块链服务",
						desc:
							"一键追溯艺术品鉴证、交易的全量信息，支持云端部署区块链网络服务",
						icon: require("@/assets/images/newv/icon_suyuan.png"),
						buss: [
							{ name: "区块链存证查询", url: "" },
							{ name: "区块链部署", url: "" },
						],
					},
					{
						name: "艺术数据服务",
						desc:
							"建立艺术品鉴证数据中心及全球查询系统，基于大数据输出各类指数和趋势",
						icon: require("@/assets/images/newv/icon_shuju.png"),
						buss: [
							{ name: "高清数据输出", url: "" },
							{ name: "数据查询服务", url: "" },
							{ name: "市场交易指数", url: "" },
							{ name: "艺术品市场报告", url: "" },
						],
					},
				],
				qklsLeft: [
					{
						img: require("@/assets/images/newv/icon_gxn.png"),
						title: "高性能",
						desc: [
							"鲁棒共识算法RBFT,TPS可达到1w,系统延时300ms",
							"原生高性能智能合约引擎沙箱",
							"硬件加速GPU/FPGA",
						],
					},
					{
						img: require("@/assets/images/newv/icon_gaq.png"),
						title: "高安全",
						desc: [
							"多级加密机制（SHA-3, SM3,ECDSA, SM2,ECDH, 3DES, SM4,AHRE,zk-snarks）",
							" 隐私保护（分区共识、细粒度隐私交易、零知识证明、同态加密）",
						],
					},
					{
						img: require("@/assets/images/newv/icon_ksh.png"),
						title: "可视化",
						desc: [
							"合约数据可视化（合约变量自动解析、合约变量内容可视化、支持结构型数据格式导出、支持文档型数据格式导出、自动捕获合约变量修改、低同步延迟、故障自动恢复）",
							"联盟自治（ACO）",
							"BaaS平台",
						],
					},
				],
			}


		}
	}
</script>
<style lang="scss" scoped>

	.el-carousel__item h3 {
		margin: 0;
		color: #f1f5fa;
		font-size: 18px;
		line-height: 300px;
		opacity: 0.75;

	}

	.el-carousel__item:nth-child(2n) {
		background-color: #fdfdfd;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #f5f5f5;
	}
	.wb{
		.title{
			margin-top: 40px;
			margin-bottom: 20px;
			margin-left: 20px;
			font-size: 25px;
			text-align: left;
		}
		.carousel{
			margin:20px;
			width: 100%;

		}
		.pic{
			width: 100%;
			height: 50%;
			border:1px dashed #F00;

		}
		.cbname{
			margin: 20px;
			position: relative;
			height: 30px;
			line-height: 40px;
			font-size: 25px;
			font-weight: bold;
			text-indent: 2em;

			img{
				position: absolute;
				top: 2px;
				left: 5px;
				height: 35px;

			}
		}
		.desc{
			margin: 20px;
			font-size: 20px;
		}
		.buss{
			margin: 20px;
			font-size: 18px;
			color: rgb(91, 98, 100);

			span:not(:nth-child(1)){
				display: inline-block;
				text-indent: 1em;
			}

		}
	}
</style>
