<template>
	<view class="page">
		<view class="top">
			<image class="logo" src="../../static/Ashcan.png" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="main-row" @tap="get_started('get_started')">
				<image class="main-item" src="../../static/tools.png" mode="widthFix"></image>
			</view>
			
			<view class="row">
				<image class="item" @tap="to_avatar" src="../../static/avatar.png" mode="widthFix"></image>
			</view>
			
			<view class="row">
				<image class="item" @tap="to_soliloquy" src="../../static/soliloquy.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="footer">
			<image class="footer-image" @tap="to_festival" src="../../static/Christmas.png"></image>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			get_started(from) {
				this.$helper.to("../../imageer_pages/get_started/get_started?from=" + from)
			},
			to_avatar() {
				this.$helper.toast('none', 'coming soon...', 2000, false, 'bottom');
			},
			to_soliloquy() {
				this.$helper.to('../../soliloquy_pages/soliloquy/soliloquy');
			},
			to_festival() {
				this.$helper.toast('none', 'coming soon...', 2000, false, 'bottom');
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
	.footer {
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		background-color: #000000;
	}
	.footer-image {
		width: 600rpx;
		height: 150rpx;
	}
	.content {
		width: 750upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 150rpx;
	}
	.top {
		width: 750upx;
		height: 500upx;
		display: flex;
	}
	.logo {
		width: 100%;
	}
	.main-row {
		width: 750upx;
		display: flex;
		justify-content: center;
		/* background-color: #007AFF; */
	}
	.row {
		width: 750upx;
		display: flex;
		justify-content: center;
		/* background-color: #4CD964; */
		padding: 10upx 0;
	}
	.main-item {
		width: 300upx;
	}
	.item {
		width: 300upx;
	}
</style>
