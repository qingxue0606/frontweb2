<template>
	<div class="page-container">
		<nav-bar></nav-bar>
		<template v-if="['newThrough', 'newAuth', 'newAppraise', 'newVerify'].indexOf($route.name) > -1">
			<core-funcs></core-funcs>
		</template>
		<router-view v-else-if="$route.path !== '/newv'"></router-view>
		<!-- 首页的所有模块 -->
		<template v-else>
			<div class="home">
				<!-- banner区 -->
				<div class="banners">
					<swapper></swapper>
					<div class="search flex f-d-c">
						<span class="title">艺术品鉴证备案网</span>
						<div class="search-container">
							<div class="search_bar">
								<input placeholder="作品名/艺术家/作品编号/证书编号" v-model="searchStr" @keyup.enter="search"/>
								<img src="@/assets/images/newv/camera.png" class="camerIco" @click="showImageWindow" />
								<div class="searchIco" @click="search">搜作品</div>
							</div>
							<div class="imageWindow" v-show="imgFlag">
								<el-upload
									:action="uploadUrl"
									name="attach"
									class="avatar-uploader"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload"
								>
									<el-image :src="imageUrl + uploadImg" fit="contain" v-if="uploadImg" class="avatar"></el-image>
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</div>
						</div>
					</div>
					<div class="funcs flex f-jc-c">
						<div v-for="(item, index) in funcs" :key="index" class="func flex f-ai-c" @click="funcClick(item.url)">
							<img :src="item.img" alt="">
							<div class="func-text">
								<p class="text-s">{{item.name}}</p>
								<p class="text-s">{{item.desc}}</p>
							</div>
						</div>
					</div>
				</div>
				<!-- 核心业务 -->
				<div class="wb flex f-d-c f-ai-c">
					<part-title title="核心业务" desc="CORE BUSINESS"></part-title>
					<div style="border: 1px solid #F0F0F1; border-bottom: 0; width: 100%;" class="flex f-ai-c">
						<div class="core-business" style="justify-content: flex-end;">
							<div class="trains bus-1"></div>
							<div class="bus-item">
								<div class="top flex f-ai-c">
									<img :src="coreBussiness[0].icon" alt="">
									<span>{{coreBussiness[0].name}}</span>
								</div>
								<span class="center">{{coreBussiness[0].desc}}</span>
								<div class="bottom">
									<span v-for="(ite, ind) in coreBussiness[0].buss" :key="ind">{{ite.name}}</span>
								</div>
							</div>
						</div>
						<div class="core-business" style="justify-content: flex-start;">
							<div class="trains bus-2"></div>
							<div class="bus-item">
								<div class="top flex f-ai-c">
									<img :src="coreBussiness[1].icon" alt="">
									<span>{{coreBussiness[1].name}}</span>
								</div>
								<span class="center">{{coreBussiness[1].desc}}</span>
								<div class="bottom">
									<span v-for="(ite, ind) in coreBussiness[1].buss" :key="ind">{{ite.name}}</span>
								</div>
							</div>
						</div>
					</div>
					<div style="border: 1px solid #F0F0F1;width: 100%;" class="flex f-ai-c">
						<div class="core-business" style="justify-content: flex-end;">
							<div class="trains bus-3"></div>
							<div class="bus-item">
								<div class="top flex f-ai-c">
									<img :src="coreBussiness[2].icon" alt="">
									<span>{{coreBussiness[2].name}}</span>
								</div>
								<span class="center">{{coreBussiness[2].desc}}</span>
								<div class="bottom">
									<span v-for="(ite, ind) in coreBussiness[2].buss" :key="ind">{{ite.name}}</span>
								</div>
							</div>
						</div>
						<div class="core-business" style="justify-content: flex-start;">
							<div class="trains bus-4"></div>
							<div class="bus-item">
								<div class="top flex f-ai-c">
									<img :src="coreBussiness[3].icon" alt="">
									<span>{{coreBussiness[3].name}}</span>
								</div>
								<span class="center">{{coreBussiness[3].desc}}</span>
								<div class="bottom">
									<span v-for="(ite, ind) in coreBussiness[3].buss" :key="ind">{{ite.name}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 什么是孚链鉴证 -->
				<div class="gb flex f-d-c f-ai-c">
					<part-title title="什么是孚链鉴证?" desc="WHAT IS FU LIAN JIAN ZHENG"></part-title>
					<div class="fljz flex">
						<div class="fljz-left flex f-d-c">
							<p>
								孚链鉴证是孚链艺统科技有限公司旗下子品牌，孚链鉴证体系是由孚链艺统科技有限公司联合浙江大学、上海交通大学共同研制开发的，国内目前唯一以人工智能加AID鉴证技术为核心，以区块链技术为保障的艺术品鉴证溯源体系。孚链鉴证体系重构了艺术品市场的新业态，解决了艺术品行业诸如真假鉴定、艺术品唯一性识别、鉴证备案数据库查询等痛点问题。
							</p>
							<div class="flex f-jc-sb">
								<img src="@/assets/images/newv/logo_fljz.png" alt="">
								<img src="@/assets/images/newv/logo_zjdx.png" alt="">
								<img src="@/assets/images/newv/logo_shjtdx.png" alt="">
							</div>
						</div>
						<img class="fljz-right" src="@/assets/images/newv/video_holder.jpeg" alt="">
						<!-- <video
							class="fljz-right"
							controls
							controlsList="nodownload"
							poster="@/assets/images/newv/video_holder.jpeg"
							src="https://artccic.oss-cn-qingdao.aliyuncs.com/common/%E5%85%AC%E5%8F%B8%E4%BB%8B%E7%BB%8D_batch_1.mp4"
						></video> -->
					</div>
				</div>
				<!-- AID鉴证技术 -->
				<div class="wb flex f-d-c f-ai-c">
					<part-title title="AID鉴证技术" desc="AID AUTHENTICATION TECHNOLOGY"></part-title>
					<div class="aid flex f-jc-sa">
						<div class="aid-item">
							<div class="flex f-ai-c">
								<img src="@/assets/images/newv/icon_jt.png">
								<span>研发理念</span>
							</div>
							<p>
								以艺术品微观特征的唯一性为根本依据；以图像处理、AI识别、机器视觉为技术基础；以标准化的鉴证体系为手段，对艺术品进行多点位的纤维特征检测，实现艺术品AID特征信息的认证及作品的唯一性验证。
							</p>
						</div>
						<div class="aid-item">
							<div class="flex f-ai-c">
								<img src="@/assets/images/newv/icon_jt.png">
								<span>建设标准</span>
							</div>
							<p>
								参与制订《T/CSIQ1000-2015艺术品鉴证质量溯源规程总则》等国家鉴证溯源标准，贯彻“以信息技术为基础，以传统眼学鉴定为辅助，以鉴证平台为载体，以标准检测数据为依据”，倾心打造一个与国际通行规则相衔接的艺术品鉴证质量溯源体系。
							</p>
						</div>
						<div class="aid-item">
							<div class="flex f-ai-c">
								<img src="@/assets/images/newv/icon_jt.png">
								<span>软硬件研发</span>
							</div>
							<p>
								孚链鉴证是国内唯一一家在艺术品鉴证领域拥有自主知识产权的研发制造商。其软硬件体系已经进行了六次迭代升级，获得20余项发明专利技术和软件著作权，其硬件设备可作为CNAS实验室评审的准入设备。
							</p>
						</div>
					</div>
				</div>
				<div class="bgp"></div>
				<!-- 区块链技术 -->
				<div class="gb flex f-d-c f-ai-c">
					<part-title title="区块链技术特点" desc="TECHNICAL FEATURES OF BLOCKCHAIN"></part-title>
					<div class="qkl flex f-jc-c f-ai-c">
						<div class="left">
							<div class="item" v-for="(item, index) in qklsLeft" :key="index">
								<div class="title flex f-ai-c">
									<img :src="item.img" alt="">
									<span>{{item.title}}</span>
								</div>
								<ul>
									<li v-for="(ite, ind) in item.desc" :key="`${index}-${ind}`">{{ite}}</li>
								</ul>
							</div>
						</div>
						<div class="center"></div>
						<div class="right">
							<div class="item" v-for="(item, index) in qklsRight" :key="index">
								<div class="title flex f-ai-c">
									<img :src="item.img" alt="">
									<span>{{item.title}}</span>
								</div>
								<ul>
									<li v-for="(ite, ind) in item.desc" :key="`${index}-${ind}`">{{ite}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- 合作伙伴 -->
				<div class="wb flex f-d-c f-ai-c">
					<part-title title="合作伙伴" desc="COOPERATIVE PARTNER"></part-title>
					<div class="flex f-jc-sb fs hb">
						<img src="@/assets/images/newv/icon_logo_szz.png" alt="">
						<img src="@/assets/images/newv/icon_payh.png" alt="">
						<img src="@/assets/images/newv/icon_logo_wxbwy.png" alt="">
						<img src="@/assets/images/newv/icon_logo_msg.png" alt="">
					</div>
					<div class="flex f-jc-sb fs hb">
						<img src="@/assets/images/newv/icon_logo_fdd.png" alt="">
						<img src="@/assets/images/newv/icon_logo_msjxh.png" alt="">
						<img src="@/assets/images/newv/icon_logo_gbzj.png" alt="">
						<img src="@/assets/images/newv/icon_logo_qlkj.png" alt="">
					</div>
					<div class="flex f-jc-sb fs hb">
						<img src="@/assets/images/newv/icon_logo_3R.png" alt="">
						<img src="@/assets/images/newv/icon_logo_hh.png" alt="">
						<img src="@/assets/images/newv/icon_logo_ysdaxh.png" alt="">
						<img src="@/assets/images/newv/icon_logo_lkrhy.png" alt="">
					</div>
				</div>
			</div>
		</template>
		<v-fixedtips></v-fixedtips>
		<v-footer></v-footer>
	</div>
</template>
<script>
import navBar from '@/views/pc/new/navBar';
import vFooter from '@/views/pc/new/components/footer';
import swapper from '@/views/pc/new/components/swapper';
import partTitle from '@/views/pc/new/components/partTitle';
import vFixedtips from '@/views/pc/new/components/fixedTips';
export default {
	components: { navBar, swapper, partTitle, vFooter, vFixedtips },
	data () {
		return {
			searchStr: '',
			uploadImg: '', // 以图搜索
			imgFlag: false,
			funcs: [
				{ name: '工业品筛查', img: require('@/assets/images/newv/shaicha.png'), url: '/newv/through-detail', desc: '1秒区分工业品与非工业品' },
				{ name: 'AID认证', img: require('@/assets/images/newv/renzheng.png'), url: '/newv/auth-detail', desc: '获取艺术品独有的"指纹"' },
				{ name: '眼学鉴定', img: require('@/assets/images/newv/jianding.png'), url: '/newv/appraise-detail', desc: '来自原作者和权威机构的鉴定' },
				{ name: 'AID验证', img: require('@/assets/images/newv/yanzheng.png'), url: '/newv/verify-detail', desc: '对比"指纹"确认"此物为此物"' }
			],
			coreBussiness: [
				{
					name: '鉴证服务',
					desc: '依托AID、人工智能和区块链技术，让艺术品鉴证更快捷、更安全、更精准',
					icon: require('@/assets/images/newv/icon_jianzheng.png'),
					buss: [
						{ name: '工业品筛查', url: '' },
						{ name: 'AID认证', url: '' },
						{ name: '眼学鉴定', url: '' },
						{ name: 'AID验证', url: '' }
					]
				},
				{
					name: '鉴证技术研发',
					desc: '集数据中心搭建、算法研究、平台设计、设备制造为一体，构建AID鉴证全生态体系',
					icon: require('@/assets/images/newv/icon_wenku.png'),
					buss: [
						{ name: '固定设备', url: '' },
						{ name: '移动设备', url: '' },
						{ name: '云端比对', url: '' },
						{ name: '综合管理系统', url: '' }
					]
				},
				{
					name: '区块链服务',
					desc: '一键追溯艺术品鉴证、交易的全量信息，支持云端部署区块链网络服务',
					icon: require('@/assets/images/newv/icon_suyuan.png'),
					buss: [
						{ name: '区块链存证查询', url: '' },
						{ name: '区块链部署', url: '' }
					]
				},
				{
					name: '艺术数据服务',
					desc: '建立艺术品鉴证数据中心及全球查询系统，基于大数据输出各类指数和趋势',
					icon: require('@/assets/images/newv/icon_shuju.png'),
					buss: [
						{ name: '高清数据输出', url: '' },
						{ name: '数据查询服务', url: '' },
						{ name: '市场交易指数', url: '' },
						{ name: '艺术品市场报告', url: '' }
					]
				}
			],
			qklsLeft: [
				{
					img: require('@/assets/images/newv/icon_gxn.png'),
					title: '高性能',
					desc: ['鲁棒共识算法RBFT,TPS可达到1w,系统延时300ms', '原生高性能智能合约引擎沙箱', '硬件加速GPU/FPGA']
				},
				{
					img: require('@/assets/images/newv/icon_gaq.png'),
					title: '高安全',
					desc: ['多级加密机制（SHA-3, SM3,ECDSA, SM2,ECDH, 3DES, SM4,AHRE,zk-snarks）', ' 隐私保护（分区共识、细粒度隐私交易、零知识证明、同态加密）']
				},
				{
					img: require('@/assets/images/newv/icon_ksh.png'),
					title: '可视化',
					desc: ['合约数据可视化（合约变量自动解析、合约变量内容可视化、支持结构型数据格式导出、支持文档型数据格式导出、自动捕获合约变量修改、低同步延迟、故障自动恢复）', '联盟自治（ACO）', 'BaaS平台']
				}
			],
			qklsRight: [
				{
					img: require('@/assets/images/newv/icon_gky.png'),
					title: '高可用',
					desc: ['动态数据失效恢复机制', '动态增删节点(动态成员准入) ', '热备切换']
				},
				{
					img: require('@/assets/images/newv/icon_kkz.png'),
					title: '可扩展',
					desc: ['数据存储横向扩展、数据库类型替换', '支持对数据定期归档', '微服务架构', '支持多种虚拟机：JS、WVM', '支付通道', '易运维']
				},
				{
					img: require('@/assets/images/newv/icon_ksy.png'),
					title: '可溯源',
					desc: ['作品信息、鉴证过程、交易情况全方位记录', '鉴证数据随时查询，终生追溯']
				}
			]
		};
	},
	created () {
		this.uploadUrl = this.$util.config.apiUrl + '/public/fileserver/uploadFile';
		this.imageUrl = this.$util.config.apiUrl + '/public/fileserver/image?key=';
	},
	methods: {
		funcClick (url) {
			this.$router.push({
				path: url
			});
		},
		showImageWindow () {
			this.imgFlag = !this.imgFlag;
		},
		search () {



			// 搜图
			if (this.imgFlag && this.uploadImg) {
				this.$router.push({
					path: '/newv/search',
					query: {
						uploadImg: this.uploadImg
					}
				});
				this.uploadImg = '';
				this.imgFlag = false;
			} else {
				this.$router.push({
					path: '/newv/search',
					query: {
						searchStr: this.searchStr
					}
				});
			}
		},
		handleAvatarSuccess (res, file) {
			if (res.return_code === '0') {
				this.uploadImg = res.data.key;
			} else {
				this.$message.error(res.message);
			}
		},
		beforeAvatarUpload (file) {
			const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
			const isLt2M = file.size / 1024 / 1024 < 5;

			if (!isJPG) {
				this.$message.error('上传图片只能是 JPG 格式 或者PNG格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传图片大小不能超过 5MB!');
			}
			return isJPG && isLt2M;
		}
	}
};
</script>
<style lang="scss" scoped>
	.page-container {
		background-color: #F8F9FB;
		.home {
			background-color: #FFFFFF;
			.banners {
				position: relative;
				.search {
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					z-index: 9;
					.title {
						font-size: 48px;
						font-family: MicrosoftYaHei;
						text-align: center;
						color: #ffffff;
					}
					&-container {
						.search_bar {
							width: 656px;
							height: 44px;
							margin: 0 auto;
							border: 2px solid #FFFFFF;
							background-color: white;
							display: flex;
							border-radius: 8px;
							margin-top: 43px;
							position: relative;
							&:hover {
								caret-color: #357cff;
								border: 2px solid #357cff;
								.searchIco {
									background: #326ad3;
								}
							}
							input {
								flex: 1;
								border-radius: 8px;
								font-size: 14px;
								font-family: MicrosoftYaHei;
								text-align: left;
								color: #999999;
								padding-left: 20px;
								border: none;
								background: #ffffff;
								outline: none;
							}
							.camerIco {
								display: block;
								width: 24px;
								position: absolute;
								top: 50%;
								transform: translateY(-50%);
								right: 131px;
								cursor: pointer;
							}
							.searchIco {
								width: 119px;
								height: 44px;
								color: #fff;
								cursor: pointer;
								font-size: 17px;
								line-height: 44px;
								text-align: center;
								background: #357cff;
								border-radius: 0px 8px 8px 0px;
								position: absolute;
								right: -2px;
								top: -2px;
							}
						}
						.imageWindow {
							padding: 20px;
							position: absolute;
							top: 140px;
							width: 656px;
							height: 215px;
							background: #ffffff;
							border: 2px solid rgba(255, 255, 255, 0.5);
							border-radius: 8px;
							right: 0;
							margin-left: -397px;
							z-index: 9;
							.avatar-uploader {
								border: 1px dashed #d9d9d9;
								border-radius: 6px;
								cursor: pointer;
								position: relative;
								overflow: hidden;
								.el-upload:hover {
									border-color: #409EFF;
								}
								.avatar {
									width: 610px;
									height: 178px;
									display: block;
								}
							}
							.avatar-uploader-icon {
								font-size: 28px;
								color: #8c939d;
								width: 610px;
								height: 178px;
								line-height: 178px;
								text-align: center;
							}
						}
					}
				}
				.funcs {
					position: absolute;
					margin-right: 20px;
					bottom: 0;
					width: 100%;
					background: rgba(0,38,100,0.70);
					.func {
						height: 86px;
						width: 300px;
						padding: 20px;
						font-family: MicrosoftYaHei;
						cursor: pointer;
						border: 1px solid #002664;
						border-right: 1px solid #003A8C;
						img {
							width: 48px;
							margin-right: 14px;
							border-radius: 50%;
						}
						.func-text {
							color: #FFFFFF;
							font-weight: 400;
							p:nth-child(1) {
								font-size: 18px;
								margin-bottom: 4px;
							}
							p:nth-child(2) {
								font-size: 14px;
							}
						}
						&:hover {
							background-color: #0C3579;
						}
						&:nth-child(4) {
							border-right: none;
						}
					}
				}
			}
			.core-business {
				display: flex;
				height: 193px;
				width: 50%;
				position: relative;
				overflow: hidden;
				&:nth-child(1),&:nth-child(3) {
					border-right: 1px solid #F0F0F1;
				}
				&:nth-child(2n) {
					.bus-item {
						margin-left: 40px;
					}
				}
				&:hover {
					.trains {
						opacity: 1;
						transform: scale(1);
					}
				}
				.trains {
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 1;
					transform: scale(1.06);
					background: hsla(0,0%,100%,0);
					opacity: 0;
					transform-origin: 50% 50%;
					transition: transform .5s cubic-bezier(.215,.61,.355,1), opacity .5s cubic-bezier(.215,.61,.355,1);
					background-size: cover !important;

					&.bus-1 {
						background: url('../../../assets/images/newv/pic_jzfw.png') no-repeat;
					}
					&.bus-2 {
						background: url('../../../assets/images/newv/pic_jsyf.png') no-repeat;
					}
					&.bus-3 {
						background: url('../../../assets/images/newv/pic_qklfw.png') no-repeat;
					}
					&.bus-4 {
						background: url('../../../assets/images/newv/pic_yssjfw.png') no-repeat;
					}
				}
				.bus-item {
					width: 600px;
					font-family: MicrosoftYaHei;
					height: 100%;
					position: relative;
					z-index: 2;
					.top {
						margin-top: 41px;
						margin-bottom: 20px;
						img {
							width: 26px;
							margin-right: 8px;
						}
						span {
							font-size: 18px;
							color: #333333;
						}
					}
					.center {
						font-size: 14px;
						color: #666666;
					}
					.bottom {
						margin-top: 30px;
						font-size: 14px;
						color: #666666;
						span {
							cursor: pointer;
							margin-right: 30px;
						}
					}
				}
			}
			.gb {
				background-color: #F8F9FB;
				padding-bottom: 60px;
			}
			.fljz {
				height: 300px;
				width: 1200px;
				&-left {
					box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.10);
					flex: 1;
					padding: 70px 37px 71px 40px;
					background-color: #FFFFFF;
					div {
						img {
							width: 146px;
							height: 40px;
						}
					}
					p {
						margin-bottom: 30px;
						font-size: 14px;
						font-family: MicrosoftYaHei;
						text-align: left;
						color: #666666;
						line-height: 22px;
						letter-spacing: 1px;
					}
				}
				&-right {
					width: 540px;
					background-color: black;
					box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.10);
				}
			}
			.aid {
				width: 1200px;
				&-item {
					width: 387px;
					height: 237px;
					background: #ffffff;
					box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.10);
					margin-right: 20px;
					padding: 32px 40px 30px;
					box-sizing: border-box;
					&:nth-child(3) {
						margin-right: 0;
					}
					div {
						margin-bottom: 21px;
						img {
							width: 24px;
							margin-right: 10px;
							margin-left: -6px;
						}
					}
					p {
						font-size: 14px;
						font-family: MicrosoftYaHei;
						text-align: left;
						color: #666666;
						line-height: 22px;
						letter-spacing: 1px;
					}
				}
			}
			.bgp {
				background: url('../../../assets/images/newv/pic_wangge.png') no-repeat;
				background-size: cover;
				height: 117px;
				margin-top: 16px;
			}
			.qkl {
				width: 1200px;
				.item {
					width: 400px;
					min-height: 164px;
					background: #ffffff;
					box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.10);
					padding: 30px 40px;
					margin-bottom: 20px;
					.title {
						margin-bottom: 16px;
						margin-left: -22px;
						img {
							width: 28px;
							margin-right: 10px;
						}
					}
					ul {
						li {
							list-style-type: disc;
							font-size: 14px;
							font-family: MicrosoftYaHei;
							text-align: left;
							color: #666666;
							line-height: 22px;
						}
					}
				}
				.left {

				}
				.center {
					width: 400px;
					height: 373px;
					background: url('../../../assets/images/newv/pic_jstd.png');
					background-size: contain;
				}
				.right {

				}
			}
			.hb {
				padding-bottom: 30px;
				width: 1200px;
				&:nth-of-type(4){
					padding-bottom: 60px;
				}
				&:nth-of-type(2){
					img {
						border: 1px solid #F0F0F1;
					}
				}
				img {
					width: 285px;
					height: 70px;
				}
			}
		}
	}
</style>
