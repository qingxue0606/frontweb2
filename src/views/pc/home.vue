<template>
    <div>
        <div class="allContent homeContent">
            <img src="@/assets/images/logo.png" style="height:60px;width:218px;float:left;margin-top:30px" />
            <div class="login" @click="showLogin=true" v-show="!showPerson">登录/注册</div>
            <el-dropdown style="margin-top:22px;" v-show="showPerson" @visible-change="visibleChange">
                <span class="el-dropdown-link" style="display: flex; align-items: center;">
                    <img :src="imageUrl + headImg" class="person" v-if="headImg && headImg !== 'null'" />
                    <img src="@/assets/images/avatar.png" class="person" v-else />
                    {{username}}
                    <img src="@/assets/images/home/down.png" style="width:14px;margin-left:9px;" />
                </span>
                <el-dropdown-menu slot="dropdown" ref="dropdownMenu">
                    <el-dropdown-item><span @click="toMsg">消息({{msglist}})</span></el-dropdown-item>
                    <el-dropdown-item><span @click="toPerson">个人中心</span></el-dropdown-item>
                    <el-dropdown-item style="border:0px;"><span @click="loginout">退出</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="home_title">艺术品鉴证备案网</div>
            <div class="search_bar">
                <input placeholder="作品名、艺术家、作品编号、证书编号" v-model="searchStr" />
                <img src="@/assets/images/home/camer.png" class="camerIco" @click="showImageWindow" />
                <div class="searchIco" @click="search">搜作品</div>
            </div>
            <div class="imageWindow" v-show="imgFlag">
                <el-upload :action="uploadUrl" name="attach" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <el-image :src="imageUrl+uploadImg" :fit="fit" v-if="uploadImg" class="avatar"></el-image>
                    <!-- <img v-if="uploadImg" :src="imageUrl+uploadImg" class="avatar"> -->
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="menu_zone">
                <div class="subItme">
                    <div class="iconClass" @mouseenter="showIn(1)" @mouseleave="showOut(1)" @click="goRouter('through')"><img :src="iconClass1" /></div>
                    <p>工业品筛查</p>
                    <div class="subCon">
                        <img src="@/assets/images/home/icon1-2.png" />
                        <div>采用精密仪器对作品工业制造痕迹进行全面筛查，并根据筛查结果出具作品的工业品筛查报告。</div>
                        <i class="el-icon-right"></i>
                    </div>
                </div>
                <div class="subItme">
                    <div class="iconClass" @mouseenter="showIn(2)" @mouseleave="showOut(2)" @click="goRouter('auth')"> <img :src="iconClass2" /></div>
                    <p>AID认证</p>
                    <div class="subCon">
                        <img src="@/assets/images/home/icon2-2.png" />
                        <div>采用与上海交大合作研发的AID信息采集设备对作品 微观图像进行采集，加密存证于云端数据库。 </div>
                        <i class="el-icon-right" style="color:#148d8e"></i>
                    </div>
                </div>
                <div class="subItme">
                    <div class="iconClass" @mouseenter="showIn(3)" @mouseleave="showOut(3)" @click="goRouter('appraise')"><img :src="iconClass3" /></div>
                    <p>眼学鉴定</p>
                    <div class="subCon">
                        <img src="@/assets/images/home/icon3-2.png">
                        <div>艺术家本人依据采集的全方位作品信息，对作品进行权威鉴定，确真后，在鉴定认证证书上签名。 </div>
                        <i class="el-icon-right" style="color:#bca685"></i>
                    </div>
                </div>
                <div class="subItme">
                    <div class="iconClass" @mouseenter="showIn(4)" @mouseleave="showOut(4)" @click="goRouter('verify')"> <img :src="iconClass4" /></div>
                    <p>验证复验</p>
                    <div class="subCon">
                        <img src="@/assets/images/home/icon4-2.png">
                        <div>鉴证中心针对已完成AID认证的作品进行复验，并根据验证结果出具作品的验证报告。</div>
                        <i class="el-icon-right" style="color:#ce8a8a"></i>
                    </div>
                </div>
                <div class="subItme">
                    <div class="iconClass" @mouseenter="showIn(5)" @mouseleave="showOut(5)" @click="goRouter('blockchain')"><img :src="iconClass5" /></div>
                    <p>区块链溯源</p>
                </div>
            </div>

        </div>
        <!-- 添加二维码和电话 -->
        <div class="right-code">
            <ul>
                <li class="phone-wrapper">
                    <span class="phone-icon">
                        <img src="@/assets/images/phone_01.png" alt="电话">
                    </span>
                    <span class="phone-box">
                        <img src="@/assets/images/phone_02.png" alt="电话">
                        客服电话：010-64359699
                    </span>
                </li>
                <li class="code-wrapper">
                    <span class="code-icon"><i></i></span>
                    <span class="code-fulian">
                        <img src="@/assets/images/code_fulian.png" alt="二维码">
                        <em>客服微信</em>
                    </span>
                </li>
            </ul>
        </div>
        <div class="footer_all">
            <div class="allContent">
                <p @click="setContent('关于中心')">关于中心</p>
                <p @click="setContent('关于艺术品AID')">关于艺术品AID</p>
                <p @click="setContent('关于艺术品区块链')">关于艺术品区块链</p>
                <p @click="setContent('合作加盟')">合作加盟</p>
                <a href="https://beian.miit.gov.cn/" target="_blank" style="float:right;color: #666666;text-decoration: none;">©Copyright 孚链艺术品鉴定认证有限公司 版权所有 2020 鲁ICP备20027832号-1</a>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/login';
import person from '@/api/person';
import $ from 'jquery';
var icon1 = require('@/assets/images/home/icon1.png');
var icon11 = require('@/assets/images/home/icon1-1.png');
var icon12 = require('@/assets/images/home/icon1-2.png');
var icon2 = require('@/assets/images/home/icon2.png');
var icon21 = require('@/assets/images/home/icon2-1.png');
var icon22 = require('@/assets/images/home/icon2-2.png');
var icon3 = require('@/assets/images/home/icon3.png');
var icon31 = require('@/assets/images/home/icon3-1.png');
var icon32 = require('@/assets/images/home/icon3-2.png');
var icon4 = require('@/assets/images/home/icon4.png');
var icon41 = require('@/assets/images/home/icon4-1.png');
var icon42 = require('@/assets/images/home/icon4-2.png');
var icon5 = require('@/assets/images/home/icon5.png');
var icon51 = require('@/assets/images/home/icon5-1.png');
export default {
	name: 'home',
	data () {
		return {
			uploadUrl: '', // 加水印上传图片
			uploadImg: '', // 以图搜索
			showMobile: false,
			searchStr: '',
			username: '',
			showPerson: false,
			iconClass1: icon1,
			iconClass2: icon2,
			iconClass3: icon3,
			iconClass4: icon4,
			iconClass5: icon5,
			showLogin: false,
			unionid: '',
			imageUrl: '',
			headImg: '',
			imgFlag: false,
			msglist: 0,
			fit: 'contain'
		};
	},
	created () {
		const that = this;
		this.$util.dispatchEventStroage();
		window.addEventListener('setItemEvent', function (e) {
			if (e.key === 'login') {
				that.showLogin = true;
			}
		});
	},
	mounted () {
		this.uploadUrl = this.$util.config.apiUrl + '/public/fileserver/uploadFile';
		this.imageUrl = this.$util.config.apiUrl + '/public/fileserver/image?key=';
		var code = this.$route.query.code;
		if (code) {
			this.getUserToken();
		}
		localStorage.setItem('verfyData', []);
		this.showPerson = !!localStorage.getItem('token');
		if (this.showPerson) {
			this.headImg = localStorage.getItem('headImg');
			this.username = localStorage.getItem('customerName');
			this.getmsgList();
		}
	},
	watch: {
		showPerson (val) {
			if (val) {
				this.headImg = localStorage.getItem('headImg');
				this.username = localStorage.getItem('customerName');
				this.getmsgList();
			}
		},
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
		}

	},
	methods: {
		visibleChange () {
			setTimeout(() => {
				if (this.$refs.dropdownMenu) {
					this.$refs.dropdownMenu.$el.style.top = '40px';
				}
			}, 50);
		},
		async setContent (name) {
			const resData = await api().getqueryType({ name });
			if (resData.return_code === '0') {
				const routeData = this.$router.resolve({
					path: '/content',
					query: {
						id: resData.data[0].uuid
					}
				});
				window.open(routeData.href, '_blank');
			} else {
				this.$message.error(resData.message);
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
		},
		showImageWindow () {
			this.imgFlag = !this.imgFlag;
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
					this.showMobile = true;
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
		search () {
			// 为搜图
			if (this.imgFlag && this.uploadImg) {
				this.$router.push({
					name: 'search',
					query: {
						uploadImg: this.uploadImg
					}
				});
			} else {
				this.$router.push({
					name: 'search',
					query: {
						searchStr: this.searchStr
					}
				});
			}
		},
		toMsg () {
			this.$router.push('/personal/message');
		},
		toPerson () {
			this.$router.push('/personal');
		},
		getShow () {
			this.showMobile = false;
			this.showPerson = true;
			this.showLogin = false;
		},
		async loginout () {
			this.showPerson = false;
			await api().loginOut();
			localStorage.clear();
			this.$router.push('/');
		},
		goRouter (e) {
			this.$router.push('/' + e);
		},
		// 显示
		showIn (e) {
			switch (e) {
			case 1:
				this.iconClass1 = icon11;
				$('.subCon').eq(0).css('display', 'flex');
				break;
			case 2:
				this.iconClass2 = icon21;
				$('.subCon').eq(1).css('display', 'flex');
				break;
			case 3:
				this.iconClass3 = icon31;
				$('.subCon').eq(2).css('display', 'flex');
				break;
			case 4:
				this.iconClass4 = icon41;
				$('.subCon').eq(3).css('display', 'flex');
				break;
			case 5:
				this.iconClass5 = icon51;
				break;
			}
		},
		// 显出
		showOut (e) {
			switch (e) {
			case 1:
				this.iconClass1 = icon1;
				$('.subCon').eq(0).hide();
				break;
			case 2:
				this.iconClass2 = icon2;
				$('.subCon').eq(1).hide();
				break;
			case 3:
				this.iconClass3 = icon3;
				$('.subCon').eq(2).hide();
				break;
			case 4:
				this.iconClass4 = icon4;
				$('.subCon').eq(3).hide();
				break;
			case 5:
				this.iconClass5 = icon5;
				break;
			}
		}
	}

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    /* 右侧固定区域 */
    .right-code {
        position: fixed;
        right: 50px;
        bottom: 120px;

        li {
            position: relative;
            margin-top: 20px;
            height: 37px;

            &:hover {
                cursor: pointer;
            }
        }

        .phone-wrapper {
            &:hover {
                .phone-icon {
                    display: none;
                }

                .phone-box {
                    opacity: 1;
                    right: 0;
                    transition: all 900ms;
                }
            }
        }

    }

    .phone-box {
        z-index: 1000;
        opacity: 0;
        position: absolute;
        right: -225px;
        top: 0;
        width: 225px;
        height: 37px;
        border: 2px solid #357cff;
        background-color: #ffffff;
        border-radius: 19px;
        padding-left: 12px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #357cff;
        line-height: 37px;
        img {
            vertical-align: top;
            margin-top: 8px;
        }
    }

    .code-icon {
        float: right;
        display: block;
        width: 37px;
        height: 37px;
        opacity: 0.9;
        border: 2px solid #999999;
        border-radius: 50%;
        padding: 6px;

        i {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(../../assets/images/code_01.png) no-repeat 0 0;
		}
    }

    .code-icon:hover {
        border: 2px solid #357cff;
        i {
            background: url(../../assets/images/code_02.png) no-repeat 0 0;
        }
    }

    .phone-icon {
        float: right;
        display: block;
        width: 37px;
        height: 37px;
        opacity: 0.9;
        border: 2px solid #999999;
        border-radius: 50%;
        padding: 6px;
    }
	.code-wrapper:hover {
		.code-fulian {
			opacity: 1;
		}
	}
    .code-fulian {
		pointer-events: none;
        opacity: 0;
		transition: opacity 1s linear;
        position: absolute;
        right: 50px;
        top: -53px;
        width: 140px;
        height: 165px;
        padding: 8px 10px 0;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 0px 12px 0px rgba(25, 25, 25, 0.12);
		img {
			width: 120px;
		}
        em {
            display: block;
            margin-top: 10px;
            text-align: center;
            font-style: normal;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #666a6c;
        }
    }

    .homeContent .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .homeContent .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .homeContent .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 754px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .homeContent .avatar {
        width: 754px;
        height: 178px;
        display: block;
    }

    .imageWindow {
        padding: 20px;
        position: absolute;
        top: 446px;
        width: 794px;
        height: 215px;
        background: #ffffff;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 8px;
        box-shadow: 0px 0px 12px 0px rgba(25, 25, 25, 0.12);
        margin: 0 auto;
        left: 50%;
        margin-left: -397px;
        z-index: 9999;
    }

    .login {
        cursor: pointer;
        width: 82px;
        height: 25px;
        background: #357cff;
        border-radius: 6px;
        line-height: 25px;
        font-size: 13px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        margin-top: 22px;
        float: right;
    }

    .home_title {
        margin: 0 auto;
        height: 90px;
        padding-top: 245px;
        font-size: 68px;
        font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #333333;
        line-height: 90px;
    }

    .search_bar {
        width: 794px;
        height: 60px;
        margin: 0 auto;
        border: 2px solid #eeeeee;
        display: flex;
        border-radius: 8px;
        box-shadow: 0px 0px 12px 0px rgba(25, 25, 25, 0.12);
        margin-top: 130px;
        position: relative;
    }

    .search_bar:hover {
        caret-color: #357cff;
        border: 2px solid #357cff;
    }

    .camerIco {
        display: block;
        width: 27px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 131px;
    }

    .search_bar:hover .searchIco {
        background: #326ad3;
    }

    .search_bar input {
        flex: 1;
        border-radius: 8px;
        font-size: 13px;
        text-align: left;
        padding-left: 20px;
        border: none;
        background: #ffffff;
        outline: none;
    }

    .searchIco {
        width: 119px;
        height: 58px;
        color: #fff;
        cursor: pointer;
        line-height: 58px;
        margin-top: -1px;
        margin-right: -1px;
        text-align: center;
        background: #357cff;
        border-radius: 0px 8px 8px 0px;
    }

    .menu_zone {
        margin-top: 131px;

        display: flex;
        justify-content: space-between;
    }

    .subItme {
        position: relative;
        text-align: center;
        font-size: 20px;
        height: 300px;
        font-weight: 700;
        color: #666a6c;
    }

    .menu_zone img {
        width: 60px;
        height: 60px;
    }

    .footer_all {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        position: fixed;
        bottom: 0px;
        color: #666666;
        left: 0;
        right: 0;
        background: #fafafa;
    }

    .footer_all p {
        float: left;
		margin-right: 30px;
		cursor: pointer;
    }

    .iconClass {
        margin-bottom: 19px;
        width: 88px;
        margin-left: 3px;
        height: 88px;
    }

    .iconClass img {
        margin-top: 14px;
    }

    .iconClass:hover {
        width: 88px;
        border-radius: 50%;
        height: 88px;
        cursor: pointer;
        background: #357cff;
    }

    .subCon {
        width: 476px;
        padding: 0 34px 0 20px;
        height: 88px;
        background: #ffffff;
        border-radius: 0px 46px 46px 46px;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
        position: absolute;
        top: 147px;
        left: 0px;
        display: flex;
        align-items: center;
        display: none;
    }

    .subCon div {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        text-align: left;
        color: #666a6c;
        line-height: 26px;
        margin-left: 9px;
    }

    .subCon i {
        color: #0287cc;
        font-size: 24px;
        margin-left: 20px;
        font-weight: bold;
    }

    .person {
        width: 30px;
        border: 1px solid #357cff;
        height: 30px;
        border-radius: 50%;
        padding: 3px;
        margin-right: 7px;
    }
</style>
<style>
    .el-dropdown {
        float: right;
        cursor: pointer;
        outline: 0;
    }
</style>
