<template>
	<div class="banner">
		<img
			v-for="(item, index) in banners"
			:key="index"
			:src="item"
			:class="{'active': activeIndex === index}"
		>
	</div>
</template>
<script>
export default {
	name: 'swapper',
	data () {
		return {
			banners: [
				require('@/assets/images/newv/1501.png'),
				require('@/assets/images/newv/1502.png')
			],
			activeIndex: 0,
			timeIntervaler: null
		};
	},
	mounted () {
		this.changeActive();
	},
	destroyed () {
		clearInterval(this.timeIntervaler);
	},
	methods: {
		changeActive () {
			if (this.timeIntervaler) {
				clearInterval(this.timeIntervaler);
			}
			const indexs = this.banners.length - 1;
			let index = 0;
			this.timeIntervaler = setInterval(() => {
				if (++index > indexs) {
					index = 0;
				}
				this.activeIndex = index;
			}, 5000);
		}
	}
};
</script>
<style lang="scss" scoped>
	.banner {
		position: relative;
		height: 300px;
		overflow: hidden;
		img {
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: all 3s linear;
			object-fit: cover;
			&.active {
				transform: scale(1.1);
				opacity: 1;
			}
		}
	}
</style>
