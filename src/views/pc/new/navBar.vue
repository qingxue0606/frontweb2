<template>
	<div class="nav-bar" :class="{'darkTheam': showDarkTheam}">
		<div class="h64" v-show="!showDarkTheam"></div>
		<div class="nav-bar-content flex ">
			<div class="left h64 flex f-ai-c">
				<div class="left-c flex f-ai-c">
					<img src="../../../assets/images/newv/logo.png" alt="">
					<span>孚链鉴证</span>
				</div>
			</div>
			<div class="center h64">
				<v-nav-menu :menus="menus" :showDarkTheam="showDarkTheam"></v-nav-menu>
			</div>
			<div class="right h64 flex f-ai-c cp">
				<div class="login-container flex" v-if="!showPerson" @click="showLogin=true">
					<span class="fs16">登录</span>
					<span class="fs16">注册</span>
				</div>
				<el-dropdown v-if="showPerson" style="height: 100%;">
					<div class="user-info flex f-ai-c">
						<img :src="imageUrl + headImg" class="person" v-if="headImg && headImg !== 'null'"/>
						<img src="@/assets/images/avatar.png" class="person" v-else/>
						<span>{{username}}</span>
						<i class="el-icon-arrow-down"></i>
					</div>
					<el-dropdown-menu slot="dropdown" ref="dropdownMenu">
						<el-dropdown-item>
							<span @click="toMsg">消息({{msglist}})</span>
						</el-dropdown-item>
						<el-dropdown-item >
							<span  @click="toPerson">个人中心</span>
						</el-dropdown-item>
						<el-dropdown-item style="border:0px;">
							<span  @click="loginout">退出</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-dialog
			title=""
			:visible.sync="showLogin"
			:show-close="false"
			width="400px"
			append-to-body
			@close="loginClose"
			class="loginModel"
			destroy-on-close
        >
			<v-login @getShow="getShow"></v-login>
		</el-dialog>
		<el-dialog
			title=""
			:visible.sync="showBindPhone"
			:show-close="false"
			:close-on-click-modal="false"
			width="400px"
			append-to-body
			class="loginModel"
			destroy-on-close
		>
            <v-bind @getShow="getShow" :unionid="unionid"></v-bind>
        </el-dialog>
	</div>
</template>
<script>
import vNavMenu from './components/navMenu';
import vLogin from './login/login';
import vBind from './login/bind';
import person from '@/api/person';
import api from '@/api/login';

export default {
	data () {
		return {
			menus: [
				{
					name: '首页',
					path: '/newv'
				},
				{
					name: '发现',
					path: '/newv/search'
				},
				{
					name: '产品',
					path: '',
					subMenus: [
						{ name: '工业品筛查', path: '/newv/through-detail', routerName: 'newThroughDetail' },
						{ name: 'AID认证', path: '/newv/auth-detail', routerName: 'newAuthDetail' },
						{ name: '眼学鉴定', path: '/newv/appraise-detail', routerName: 'newAppraiseDetail' },
						{ name: 'AID验证', path: '/newv/verify-detail', routerName: 'newVerifyDetail' }
					]
				},
				{
					name: '区块链浏览器',
					path: '/newv/blockchain'
				},
				{
					name: '解决方案',
					path: '',
					subMenus: [
						{ name: '艺术品市场', path: '/newv/market', routerName: 'market' },
						{ name: '艺术品金融信用解决方案', path: '/newv/credit', routerName: 'credit' },
						{ name: '艺术品版权存证', path: '/newv/card', routerName: 'card' },
						{ name: '艺术品出入管理', path: '/newv/administer', routerName: 'administer' },
						{ name: '艺术品展览', path: '/newv/show', routerName: 'show' }
					]
				},
				{
					name: '合作伙伴',
					path: '',
					subMenus: [
						{ name: '大客户下单', path: '/newv/vip' }
					]
				},
				// {
				// 	name: '开发者',
				// 	path: '/newv'
				// },
				{
					name: '支持与服务',
					path: '',
					subMenus: [
						{ name: '帮助中心', path: '/newv/help' }
					]
				}
			],
			showDarkTheam: false,
			headImg: '',
			username: '',
			msglist: 0,
			showPerson: false,
			showLogin: false,
			unionid: '',
			showBindPhone: false
		};
	},
	components: { vNavMenu, vLogin, vBind },
	created () {
		const that = this;
		window.addEventListener('setItemEvent', function (e) {
			if (e.key === 'backHome') {
				that.backFlag = e.newValue;
			}
			if (e.key === 'searchFlag') {
				that.showSearch = e.newValue;
			}
			if (e.key === 'customerName') {
				that.username = e.newValue;
			}
			if (e.key === 'headImg') {
				that.headImg = e.newValue;
			}
			if (e.key === 'login') {
				that.showLogin = true;
				that.showPerson = false;
			}
		});
		this.imageUrl = this.$util.config.apiUrl + '/public/fileserver/image?key=';
		var code = this.$route.query.code;
		if (code) {
			this.getUserToken();
		}
		this.showPerson = !!localStorage.getItem('token');
		if (this.showPerson) {
			this.headImg = localStorage.getItem('headImg');
			this.username = localStorage.getItem('customerName');
			this.getmsgList();
		}
	},
	mounted () {
		if (['newThroughDetail', 'newAuthDetail', 'newAppraiseDetail', 'newVerifyDetail', 'newIndex'].indexOf(this.$route.name) > -1) {
			document.onscroll = e => {
				if (!this.showDarkTheam && e.target.scrollingElement.scrollTop > 0) {
					this.showDarkTheam = true;
				}
				if (!e.target.scrollingElement.scrollTop) {
					this.showDarkTheam = false;
				}
			};
		} else {
			this.showDarkTheam = true;
		}
	},
	methods: {
		loginClose () {
			this.$store.commit('setToLogin', false);
		},
		// 用户用户token
		async getUserToken () {
			const resData = await api().getUserToken({
				code: this.$route.query.code,
				state: this.$route.query.state
			});
			if (resData.return_code === '0') {
				// 没有绑定手机号,绑定手机号码页面
				if (resData.data.unionid) {
					this.showBindPhone = true;
					this.unionid = resData.data.unionid;
				} else {
					localStorage.setItem('token', resData.data.token);
					localStorage.setItem('userInfo', JSON.stringify(resData.data.customer));
					localStorage.setItem('customerName', resData.data.customer.customerName);
					localStorage.setItem('headImg', resData.data.customer.headImg);
					this.headImg = localStorage.getItem('headImg');
					this.username = localStorage.getItem('customerName');
					this.showPerson = true;
				}
			}
		},
		async getmsgList () {
			var data = {
				nowPage: 1,
				pageShow: 100000
			};
			const resData = await person().getMsgList(data);
			if (resData.return_code === '0') {
				this.msglist = resData.data.list.totalNum;
				this.$forceUpdate();
			} else {
				this.$message.error(resData.message);
			}
		},
		getShow () {
			this.showPerson = true;
			this.showLogin = false;
		},
		resetDataConfirm (url) {
			this.$router.push(url);
		},
		toMsg () {
			this.resetDataConfirm('/newv/personal/message');
		},
		toPerson () {
			this.resetDataConfirm('/newv/personal');
		},
		async loginout () {
			this.showPerson = false;
			const resData = await api().loginOut();
			localStorage.clear();
			this.$router.push('/newv');
		}
	},
	watch: {
		// '$store.state.main.routeName' (val) {
		// 	if (['newThroughDetail', 'newAuthDetail', 'newAppraiseDetail', 'newVerifyDetail', 'newIndex'].indexOf(val) > -1) {
		// 		document.scrollingElement.scrollTo(0, 0);
		// 		this.showDarkTheam = false;
		// 		document.onscroll = e => {
		// 			if (!this.showDarkTheam && e.target.scrollingElement.scrollTop > 0) {
		// 				this.showDarkTheam = true;
		// 			}
		// 			if (!e.target.scrollingElement.scrollTop) {
		// 				this.showDarkTheam = false;
		// 			}
		// 		};
		// 	} else {
		// 		document.onscroll = null;
		// 		this.showDarkTheam = true;
		// 	}
		// },
		'$store.state.main.userInfo': {
			handler (val) {
				if (val) {
					this.headImg = localStorage.getItem('headImg');
					this.username = localStorage.getItem('customerName');
					this.showPerson = true;
					this.getmsgList();
				}
			},
			immediate: true
		},
		'$store.state.main.toLogin': {
			handler (val) {
				if (val) {
					this.showLogin = true;
				}
			},
			immediate: true
		}
	}
};
</script>
<style scoped lang="scss">
	.h64 {
		height: 64px;
	}
	.darkTheam {
		.nav-bar-content {
			background-color: #002767 !important;
		}
	}
	.nav-bar {
		width: 100%;
		position: fixed;
		z-index: 10;
		.filter {
			pointer-events: none;
			filter: blur(5px);
			// background: rgba(118, 135, 183, 0.1);
			background: rgba(51,107,198,0.10);
			width: 100%;
		}
		.nav-bar-content {
			background: #002767;
			position: absolute;
			width: 100%;
			top: 0;
			transition: all 1.5s linear;
			.left {
				width: 160px;
				margin-right: 50px;
				justify-content: center;
				&-c {
					width: 129px;
					img {
						width: 33px;
						height: 33px;
						border-radius: 50%;
					}
					span {
						font-size: 20px;
						font-family: MicrosoftYaHei;
						text-align: left;
						color: #ffffff;
						margin-left: 10px;
					}
				}
			}
			.center {
				flex: 1;
			}
			.right {
				// width: 123px;
				// background: #357cff;
				margin-right: 24px;
				justify-content: center;
				.login-container {
					font-size: 14px;
					font-family: MicrosoftYaHei;
					text-align: right;
					color: #ffffff;
					span {
						display: inline-block;
						padding: 0 8px;
						cursor: pointer;
						&:nth-child(1) {
							border-right: 1px solid white;
						}
					}
				}
				.user-info {
					height: 100%;
					.person {
						width: 30px;
						height: 30px;
						border: 1px solid #f0f0f1;
						border-radius: 50%;
						margin-right: 10px;
					}
					span {
						color: white;
						font-size: 14px;
						margin-right: 10px;
					}
					i {
						color: white;
					}
				}
			}
		}
	}
</style>
