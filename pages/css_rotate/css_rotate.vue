<template>
	<view >
		<view style="background-color: #007AFF;">
			<image class="image" src="../../static/2.jpg" :animation="animationData"></image>
		</view>
		<button @tap="rotate">旋转</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationData: ''
			}
		},
		onLoad() {
			this.animation = uni.createAnimation();
		},
		onUnload() {
			this.animationData = '';
		},
		methods: {
			rotate() {
				this.animation.rotate(-90).scale(0.5).step()
				this.animationData = this.animation.export()
			}
		}
	}
</script>

<style>
.image {
	width: 650upx;
	height: 1300upx;
}
</style>
