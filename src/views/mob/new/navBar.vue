<template>
	<div class="nav-bar">

		<div class="nav-bar-content flex ">
			<div class="left h64 flex f-ai-c">
				<div class="left-c flex f-ai-c">
					<i class="el-icon-user"></i>
				</div>
			</div>

			<div class="right h64 flex f-ai-c">
				<div class="login-container flex">
					<i class="el-icon-menu"></i>

				</div>
			</div>
		</div>
	</div>
</template>
<script>

</script>
<style lang="scss" scoped>
	.h64 {
		height: 64px;
	}

	.nav-bar {
		width: 100%;
		position: fixed;
		z-index: 10;
		.nav-bar-content {
			width: 100%;
			.left {
				width: 80%;
				&-c {
					margin-left: 20px;
					i {
						color: #ffffff;
						font-size: 24px;
					}
				}
			}
			.right {
				margin-left: 20px;
				.login-container {
					font-size: 24px;
					color: #ffffff;
				}
			}
		}
	}
</style>
