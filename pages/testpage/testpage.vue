<template>
	<view class="page">
		
		<view style="margin: 30rpx 0;display: flex;flex-direction: column;justify-content: center;">
			<text class="font-30 B0E2FF">陌生人 请你继续相信爱情 不是爱情不好 是他（她）不好</text>
			<view class="line">
				<view style="width: 5rpx; height: 5rpx; background-color: #B0E2FF;"></view>
			</view>
		</view>
		<view style="margin: 30rpx 0;display: flex;flex-direction: column;justify-content: center;">
			<text class="font-30 FF6A6A">有时候，你选择与某人保持距离，不是因为不在乎，而是因为你清楚的知道，他不属于你。</text>
			<view class="line" style="">
				<view style="width: 5rpx; height: 5rpx; background-color: #FF6A6A;"></view>
			</view>
		</view>
		
		<view style="margin: 30rpx 0;display: flex;flex-direction: column;justify-content: center;">
			<text class="font-30 DC143C">对不起 很想你 昨天去看了你妈妈 一起给你扫了扫墓 等阿姨走了 我在你墓哭的像个孩子 对不起 以后我不会再来了 我。。。 要结婚了 再见</text>
			<view class="line" style="">
				<view style="width: 5rpx; height: 5rpx; background-color: #DC143C;"></view>
			</view>
		</view>
		
		<view style="margin: 30rpx 0;display: flex;flex-direction: column;justify-content: center;">
			<text class="font-30 B8860B">多少次痛到不得已，想念没经得你同意</text>
			<view class="line" style="">
				<view style="width: 5rpx; height: 5rpx; background-color: #B8860B;"></view>
			</view>
		</view>
		
		<text></text>
		<text></text>
		<view class="footer">
			<view class="footer-button">
				<!-- <text class="font-100 footer-text">+</text> -->
				<image class="image" src="../../static/1.png"></image>
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
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style>
	page {
		background-color: #000000;
	}
	.page {
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
	}
	.line {
		height: 5rpx;
		width: 710rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.font-30 {
		font-size: 30rpx;
	}
	.font-50 {
		font-size: 50rpx;
	}
	.font-100 {
		font-size: 100rpx;
	}
	.font-40 {
		font-size: 40rpx;
	}
	.FF6A6A {
		color: #FF6A6A;
	}
	.DC143C {
		color: #DC143C
	}
	.B0E2FF {
		color: #B0E2FF;
	}
	.B8860B {
		color: #B8860B;
	}
	.blue {
		color: #0000FF;
	}
	.green {
		color: #008000;
	}
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: flex-end;
		/* background-color: #4CD964; */
	}
	.footer-button {
		/* background-color: #F0AD4E; */
		display: flex;
		flex-direction: row;
		width: 140rpx;
		height: 100rpx;
		border-radius: 5rpx;
		justify-content: center;
		align-items: flex-end;
	}
	.footer-text {
		color: #FF0000;
		font-weight: bold;
	}
	.image {
		width: 100rpx;
		height: 100rpx;
	}
</style>
