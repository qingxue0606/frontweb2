<!--
 * @Author: your name
 * @Date: 2020-07-20 22:08:12
 * @LastEditTime: 2020-07-21 11:28:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /frontweb/src/App.vue
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import api from '@/api/login';

export default {
	data () {
		return {
			showMobile: false,
			unionid: '',
			searchParams: {}
		};
	},
	mounted () {
		const _searchParams = new URLSearchParams(location.search);
		this.searchParams = {
			code: _searchParams.get('code'),
			state: _searchParams.get('state')
		};
		if (this.searchParams.code) {
			this.getUserToken();
		}
	},
	methods: {
		getShow () {
			this.showMobile = false;
		},
		// 用户用户token
		async getUserToken () {
			const resData = await api().getUserToken({ code: this.searchParams.code, state: this.searchParams.state });
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
					this.$store.commit('setUserInfo', true);
				}
			}
		}
	}
};
</script>
<style lang="scss">
    /* element-ui 下拉框在ios上 点击两次才能选中 */
    .el-scrollbar {
        >.el-scrollbar__bar {
            opacity: 1 !important;
        }
    }
</style>
<style>
    #app,
    .mainpage {
        overflow-x: hidden;
        /* height:100%; */
    }
</style>
