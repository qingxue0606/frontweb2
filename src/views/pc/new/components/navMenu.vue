<template>
	<ul class="nav-container flex f-ai-c">
		<li
			class="nav-container-item flex f-ai-c"
			:class="{'active': activeName === item.name}"
			v-for="(item, index) in menus"
			:key="index"
			@click="clickHandle(item)"
			@mouseenter="mouseenterHandle(item)"
			@mouseleave="mouseleaveHandle(item)"
		>
			<span>{{item.name}}</span>
			<i class="arrow" :class="{'active': activeName === item.name}" v-if="item.subMenus && item.subMenus.length"></i>
			<ul v-if="item.subMenus" class="sub-nav" :class="{'active': activeName === item.name, 'darkTheam': showDarkTheam}">
				<div class="" v-show="!showDarkTheam"></div>
				<li
					v-for="(ite, ind) in item.subMenus"
					:key="index + '-' + ind"
					@click="clickHandle(ite)"
					@mouseenter="mouseenterSubHandle(ite)"
					@mouseleave="mouseleaveSubHandle(ite)"
					:class="{'active': activeSubName === ite.name}"
				>{{ite.name}}</li>
			</ul>
		</li>
	</ul>
</template>
<script>
export default {
	name: 'navMenu',
	props: {
		menus: {
			type: Array,
			default: function () {
				return [];
			}
		},
		showDarkTheam: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			activeName: '',
			activeSubName: ''
		};
	},
	methods: {
		clickHandle (item) {
			if (item.path) {
				this.$router.push({
					path: item.path
				});
			}
		},
		mouseenterHandle (item) {
			this.activeName = item.name;
		},
		mouseleaveHandle () {
			this.activeName = '';
		},
		mouseenterSubHandle (item) {
			this.activeSubName = item.name;
		},
		mouseleaveSubHandle () {
			this.activeSubName = '';
		}
	}
};
</script>
<style lang="scss" scoped>
	.nav-container {
		&-item {
			height: 64px;
			line-height: 64px;
			margin-right: 28px;
			position: relative;
			cursor: pointer;
			color: #C0C8D4;
			// &.active {
			// 	color: #FFFFFF !important;
			// }
			.arrow {
				background: url('../../../../assets/images/newv/icon_xljt.png');
				width: 16px;
				height: 16px;
				display: inline-block;
				background-size: contain;
				margin-left: 3px;
				transition: all .1s linear;
				&.active {
					transform: rotate(180deg);
				}
			}
			.filter {
				position: absolute;
				pointer-events: none;
				width: 100%;
				height: 100%;
				filter: blur(5px);
				background: rgba(11, 33, 90,0.95);
				z-index: -1;
			}
			.darkTheam {
				background-color: #002767 !important;
			}
			.sub-nav {
				position: absolute;
				top: 64px;
				width: 173px;
				border-radius: 0px 0px 2px 2px;
				background-color: #002767 !important;
				height: 0;
				overflow: hidden;
				&.active {
					height: auto;
					overflow: auto;
				}
				li {
					font-size: 14px;
					height: 40px;
					font-family: MicrosoftYaHei;
					margin: 0 0 0 14px;
					z-index: 2;
					cursor: pointer;
					line-height: 40px;
					text-align: left;
					color: #C0C8D4;
					// &.active {
					// 	color: #FFFFFF !important;
					// }
				}
			}
		}
	}
</style>
