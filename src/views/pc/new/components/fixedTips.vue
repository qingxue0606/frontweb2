<template>
	<div class="fixed-tips">
		<div class="item flex f-jc-c f-ai-c">
			<div class="kfdh">客服电话：010-64359699</div>
			<i></i>
		</div>
		<div class="item flex f-jc-c f-ai-c">
			<i></i>
			<div class="kfwx flex f-d-c f-ai-c">
				<img src="@/assets/images/newv/code_fulian.png">
				<span>客服微信</span>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.fixed-tips {
		position: fixed;
		right: 10px;
		top: 300px;
		.item {
			width: 36px;
			height: 36px;
			background-color: #FFFFFF;
			box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.20);
			margin-bottom: 10px;
			border-radius: 2px;
			position: relative;
			overflow: hidden;
			cursor: pointer;
			i {
				display: inline-block;
				width: 20px;
				height: 20px;
				&:nth-child(1) {
					background: url('../../../../assets/images/newv/icon_nor_ewm.png') no-repeat;
					background-size: contain;
				}
				&:nth-child(2) {
					background: url('../../../../assets/images/newv/icon_nor_kf.png') no-repeat;
					background-size: contain;
				}
			}
			.kfdh {
				width: 189px;
				height: 36px;
				line-height: 36px;
				background: #ffffff;
				border: 1px solid #e0e4e9;
				border-radius: 2px;
				box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.20);
				position: absolute;
				right: 46px;
				overflow: hidden;
				font-size: 14px;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: center;
				color: #333333;
			}
			&:hover {
				background-color: #357CFF;
				overflow: unset;
				i {
					&:nth-child(1) {
						background: url('../../../../assets/images/newv/icon_sel_ewm.png') no-repeat;
						background-size: contain;
					}
					&:nth-child(2) {
						background: url('../../../../assets/images/newv/icon_sel_kf.png') no-repeat;
						background-size: contain;
					}
				}
			}
			.kfwx {
				width: 140px;
				height: 169px;
				background: #ffffff;
				border: 1px solid #e0e4e9;
				border-radius: 2px;
				box-shadow: 0px 0px 10px 0px rgba(98,101,107,0.20);
				position: absolute;
				top: 0;
				right: 46px;
				overflow: hidden;
				padding: 15px;
				img {
					margin-bottom: 10px;
					width: 110px;
				}
				span {
					font-size: 14px;
					font-family: MicrosoftYaHei;
					text-align: left;
					color: #333333;
				}
			}
		}
	}
</style>
