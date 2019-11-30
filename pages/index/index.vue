<template>
	<view class="page">
		<view class="top">
			<image class="logo" src="../../static/imageer.png" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="main-row" @tap="get_started('get_started')">
				<image class="main-item" src="../../static/get_started.png" mode="widthFix"></image>
			</view>
			<view class="row">
				<image class="item" @tap="get_started('filter')" src="../../static/filter.png" mode="widthFix"></image>
			</view>
			<view class="row">
				<image class="item" @tap="rotate('rotate')" src="../../static/rotate.png" mode="widthFix"></image>
			</view>
			<view class="row">
				<image class="item" @tap="get_started('scale')" src="../../static/scale.png" mode="widthFix"></image>
			</view>
			<view class="row">
				<image class="item" @tap="get_started('cropper')" src="../../static/cropper.png" mode="widthFix"></image>
			</view>
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
				this.$helper.to("../get_started/get_started?from=" + from)
			},
			rotate(from) {
				this.$helper.to("../rotate/rotate?from=" + from)
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
	.content {
		width: 750upx;
		display: flex;
		flex-direction: column;
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
		padding: 20upx 0;
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
