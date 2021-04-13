<template>
    <div class="loginWindows">
        <div class="loginTitle">登录|注册 <span class="textNode">无需注册，直接登录</span></div>
        <div class="loginForm">
            <input class="input inputUser" v-model="mobile" placeholder="手机号"/>
            <div class="flex f-ai-c f-jc-sb code">
				<input class="input inputCode" v-model="captcha" placeholder="短信验证码"/>
                <div class="sendCode" @click="getCode" v-if="flags" :class="mobile.length > 0 ? 'acti' : ''">发送验证码</div>
                <div class="sendCode" v-if="!flags">{{Time}}s再次发送</div>
            </div>
            <div class="flex f-ai-c f-jc-sb code">
				<input class="input inputCode" v-model="labNo" placeholder="邀请码"/>
                <div class="labCode">邀请码(非必填)</div>
            </div>
        </div>
        <div class="loginButton" @click="codeLogin" :class="mobile.length > 0 && captcha.length > 0 ? 'acti' : ''">登录</div>
        <div class="agreenText cp">
            <!-- <el-checkbox v-model="checked" style="margin-right:5px"></el-checkbox>下次自动登录 -->
            <span>请仔细阅读<a @click="setContent">《注册协议》</a></span>
        </div>
        <div class="lineGirdBox">
			<span>微信登录</span>
		</div>
        <div class="wechactLogBox">
            <div class="wxLoginBtn" @click="wxlogin">
                <img src="@/assets/images/wx.png" style="width:23px;height:23px;">
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/login';

export default {
	name: 'login',
	data () {
		return {
			captcha: '',
			mobile: '',
			labNo: '',
			checked: '',
			flags: true,
			Time: 60,
			timeTev: '',
			categoryNo: ''
		};
	},
	mounted () {
		this.getqueryType();
	},
	destroyed () {
		this.resetFields();
		console.log(1234567890);
	},
	methods: {
		resetFields () {
			this.captcha = '';
			this.mobile = '';
			this.labNo = '';
			this.checked = '';
			this.flags = true;
			this.Time = 60;
			this.timeTev = '';
			this.categoryNo = '';
		},
		// 获取编号
		async getqueryType () {
			var data = {
				name: '注册协议'
			};
			const resData = await api().getqueryType(data);
			if (resData.return_code === '0') {
				this.categoryNo = resData.data[0].uuid;
			} else {

			}
		},
		setContent (id) {
			const routeData = this.$router.resolve({
				path: '/newv/newContent',
				query: {
					id: this.categoryNo,
					type: '1'
				}
			});
			window.open(routeData.href, '_blank');
		},
		// 微信登录
		async wxlogin () {
			const currentPath = window.location.pathname + window.location.search;
			const resData = await api().wxlogin({
				subUrl: currentPath
			});

			if (resData.return_code === '0') {
				console.log(resData.data);
				window.open(resData.data, '_blank');
			} else {
				this.$message.error(resData.message);
			}
		},
		async codeLogin () {
			if (!/^1[0-9]{10}$/.test(this.mobile)) {
				this.$message.error('手机号格式错误');
				return;
			}
			if (this.captcha.length < 6) {
				this.$message.error('请输入验证码');
				return;
			}
			var data = {
				mobile: this.mobile,
				captcha: this.captcha
			};
			if (this.labNo) {
				data.labNo = this.labNo; // 是否填写邀请码
			}
			const resData = await api().codeLogin(data);
			if (resData.return_code === '0') {
				clearInterval(this.timeTev);
				localStorage.setItem('token', resData.data.token);
				localStorage.setItem('userInfo', JSON.stringify(resData.data.customer));
				localStorage.setItem('customerName', resData.data.customer.customerName);
				localStorage.setItem('customerUuid', resData.data.customer.uuid);
				localStorage.setItem('headImg', resData.data.customer.headImg);
				this.$store.commit('setUserInfo', resData.data.customer);
				this.$emit('getShow', true);
			} else {
				this.$message.error(resData.message);
			}
		},
		// 获取验证码
		async getCode () {
			if (!/^1[0-9]{10}$/.test(this.mobile)) {
				this.$message.error('手机号格式错误');
				return;
			}
			this.flags = false;
			var data = {
				mobile: this.mobile
			};
			// this.flags = true
			const resData = await api().getCode(data);
			const that = this;
			// 输入正确情况
			if (resData.return_code === '0') {
				that.timeTev = setInterval(
					function () {
						that.Time = that.Time - 1;
						if (that.Time <= 0) {
							clearInterval(that.timeTev);
							that.Time = 60;
							that.flags = true;
						}
					}, 1000);
			} else {
				this.$message.error(resData.message);
				that.flags = true;
				that.Time = 60;
			}
		}
	}

};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .sendCode {
        width: 113px;
		height: 42px;
		line-height: 42px;
		opacity: 1;
		background: #357cff;
		border-radius: 4px;
		font-size: 14px;
		font-family: MicrosoftYaHei;
		text-align: left;
		color: #ffffff;
		text-align: center;
    }

    .labCode {
        // width: 137px;
        text-align: center;
        height: 40px;
        float: right;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        color: #333333;
    }

    .loginTitle {
        padding-bottom: 20px;
        // border-bottom: 1px solid #edeeef;
        /* width: 74px; */
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 16px;
        width: 100%;
    }
	.input {
		padding-left: 10px;
        background: #f3f4f5;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
        height: 42px;
		outline: none;
		&:hover {
			border: 1px solid #357cff;
		}
	}
    .inputUser {
        width: 340px;
    }
	.code {
        margin-top: 25px;
	}
    .inputCode {
        width: 217px;
    }

    .loginButton {
        width: 340px;
        height: 42px;
        background: #999999;
        line-height: 40px;
        border-radius: 3px;
        margin-top: 25px;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
    }

    .textNode {
        font-size: 14px;
        font-weight: 400;
        float: right;
        color: #999999;
        line-height: 14px;
        letter-spacing: 0px;
    }

    .agreenText {
        margin-top: 20px;
        color: #357CFF;
        width: 100%;
    }
    .agreenText a {
        margin-left: 5px;
    }
</style>
<style>
    .loginModel .el-dialog {
        border-radius: 10px;
    }
    .loginModel .el-dialog__header {
        display: none
    }
    .loginModel .el-dialog__body {
        padding: 30px;
    }
    .lineGirdBox {
        height: 20px;
        margin-top: 40px;
        float: left;
        width: 100%;
        position: relative;
        line-height: 20px;
        margin-bottom: 30px;
    }
    .lineGirdBox::after {
        content: "";
        height: 1px;
        background: #edeeef;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
    }
    .lineGirdBox span {
        padding: 0 36px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 14px;
        color: #666666;
        z-index: 1;
    }
    .wechactLogBox {
        text-align: center;
        font-size: 0;
    }
    .wechactLogBox .wxLoginBtn {
        cursor: pointer;
        display: inline-block;
        width: 40px;
        text-align: center;
        height: 40px;
        border-radius: 50%;
        background: #3CB371;
        transition: all .3s;
        padding-top: 8px;
    }
    .wechactLogBox .wxLoginBtn:hover {
        background: #339960;
    }
    .loginWindows .acti {
        background: #357cff;
        color: #ffffff;
    }
</style>
