<template>
    <div class="loginWindows">
        <div class="loginTitle">绑定手机号码</div>
        <div class="loginForm">
            <input class="inputUser code input" v-model="mobile" placeholder="手机号" />
            <div class="flex f-jc-sb f-ai-c code">
                <input class="inputCode input" v-model="captcha" placeholder="短信验证码" />
                <div class="sendCode" @click="getCode" v-if="flags" :class="mobile.length > 0 ? 'acti' : ''">发送验证码</div>
                <div class="sendCode" v-if="!flags">{{Time}}s再次发送</div>
            </div>
            <div class="flex f-jc-sb f-ai-c code">
				<input class="inputCode input" v-model="labNo" />
                <div class="labCode">邀请码(非必填)</div>
            </div>
        </div>
        <div class="loginButton" :class="mobile.length>0&& captcha.length>0?'acti':''" @click="codeLogin">绑定</div>

    </div>
</template>

<script>
import api from '@/api/login';
export default {
	props: {
		unionid: String
	},
	name: 'login',
	data () {
		return {
			captcha: '',
			mobile: '',
			labNo: '',
			flags: true,
			Time: 60,
			timeTev: ''
		};
	},
	mounted () {

	},
	methods: {
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
				captcha: this.captcha,
				unionid: this.unionid
			};
			if (this.labNo) {
				data.labNo = this.labNo; // 是否填写邀请码
			}
			const resData = await api().wxLoginBindPhone(data);
			if (resData.return_code === '0') {
				localStorage.setItem('token', resData.data.token);
				localStorage.setItem('userInfo', JSON.stringify(resData.data.customer));
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
			const resData = await api().getCode1(data);
			const that = this;
		}
	}

};
</script>
<style scoped lang="scss">
    /deep/ .el-dialog__header {
        display: none;
    }
	.input {
		padding-left: 10px;
        background: #f3f4f5;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
        height: 42px !important;
	}
	.code {
        margin-top: 25px;
	}
    .labCode {
        width: 137px;
        text-align: center;
        height: 40px;
        float: right;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        color: #357cff;
    }

    .sendCode,
    .sendCode1 {
        width: 113px;
        height: 42px;
        line-height: 42px;
        opacity: 1;
        background: #357cff;
        border-radius: 4px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        text-align: center;
        color: #ffffff;

    }

    .loginTitle {
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: #333333;
        padding-bottom: 20px;
        border-bottom: 1px solid #EEEEEE;
        line-height: 16px;
        width: 100%;
		margin-bottom: 5px;
    }

    .inputUser,
    .inputCode {
        width: 340px;
        height: 40px;
        padding-left: 10px;
        // margin-top: 30px;
        background: #f3f4f5;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
    }

    .inputCode {
        width: 190px;
    }

    .loginButton {
        width: 340px;
        height: 40px;
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
    }

    .agreenText span {
        float: right;
    }

    .agreenText a {
        margin-left: 5px;
    }
</style>
<style>
    .loginModel .el-dialog {
        border-radius: 4px;
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

    .loginWindows .acti {
        background: #357cff;
        color: #ffffff;
    }
</style>
