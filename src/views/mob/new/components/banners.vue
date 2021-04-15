<template>

	<div class="banners">
		<div class="home">
			<!-- banner区 -->
			<div class="banners">
				<swapper></swapper>
				<div class="search flex f-d-c">
					<span class="title">艺术品鉴证备案网</span>
					<div class="search-container">
						<div class="search_bar">
							<input
								placeholder="作品名/艺术家/作品编号/证书编号"
								v-model="searchStr"
								@keyup.enter="search"
							/>
							<img
								src="@/assets/images/newv/camera.png"
								class="camerIco"
								@click="showImageWindow"
							/>
							<div class="searchIco" @click="search">搜作品</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import swapper from "@/views/mob/new/components/swapper";

	export default {
		name: 'banners',
		components: {swapper},
		data() {
			return {
				searchStr: "",
			}


		}
	}
</script>
<style lang="scss" scoped>
	.home {
		background-color: #ffffff;
		.banners {
			position: relative;
			.search {
				position: absolute;
				z-index: 9;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				.title {
					font-size: 30px;
					font-family: MicrosoftYaHei;
					text-align: center;
					color: #ffffff;
				}
				&-container {
					.search_bar {
						position: relative;
						display: flex;
						margin: 0 auto;
						width: 300px;
						height: 44px;
						border: 2px solid #ffffff;
						background-color: white;
						border-radius: 8px;
						margin-top: 43px;
						input {
							width: 100%;
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
							position: absolute;
							display: block;
							width: 24px;
							top: 50%;
							transform: translateY(-50%);
							right: 70px;
						}
						.searchIco {
							width: 70px;
							height: 44px;
							color: #fff;
							font-size: 15px;
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
