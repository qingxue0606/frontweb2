<template>
	<div class="page-container">
		<nav-bar></nav-bar>
		<div class="banners">
			<div class="home">
				<!-- banner区 -->
				<div class="banners">
					<swapper></swapper>
					<div class="search flex f-d-c">
						<span class="title">艺术品鉴证备案网</span>
						<div class="search-container">
							<div class="search_bar">
								<input placeholder="作品名/艺术家/作品编号/证书编号" v-model="searchStr" @keyup.enter="search"/>
								<img src="@/assets/images/newv/camera.png" class="camerIco" @click="showImageWindow"/>
								<div class="searchIco" @click="search">搜作品</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
		<el-button type="primary">主要按钮</el-button>
		<i class="el-icon-share"></i>
		<br><br><br><br><br><br><br><br>
		<br><br><br><br><br><br><br><br>
		2
		2
		2
		2
		2
		<br><br><br><br><br><br><br><br>
		2
		2
		2
		2
		2
		<br><br><br><br><br><br><br><br>
		<br><br><br><br><br><br><br><br>
		2
		2
		2
		2
		2
		<br><br><br><br><br><br><br><br>
		<br><br><br><br><br><br><br><br>
		2
		2
		2
		2
		2

	</div>
</template>
<script>
	import navBar from '@/views/mob/new/navBar';
	import swapper from '@/views/mob/new/swapper';

	export default {
		components: {navBar, swapper}
	}
</script>
<style lang="scss" scoped>

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
					font-size: 30px;
					font-family: MicrosoftYaHei;
					text-align: center;
					color: #ffffff;
				}
				&-container {
					.search_bar {
						width: 300px;
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
							right: 70px;
							cursor: pointer;
						}
						.searchIco {
							width: 70px;
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

				}
			}

		}

	}


</style>
