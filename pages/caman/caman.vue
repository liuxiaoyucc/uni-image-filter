<template>
	<view>
		<view class='wrap'>
			<button @tap="choose">choose image</button>


			<view class='time' v-if="gap">Processing time:{{gap}}ms</view>
		</view>
		<canvas style="width: 750upx; height: 750upx; background-color: #2C405A;" canvas-id="firstCanvas"></canvas>



	</view>
</template>

<script>
	import WxCaman from 'wx-caman'

	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			choose() {
				const z = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						if (res.tempFilePaths.length) {
							let image_path = res.tempFilePaths[0];
							this.init_canvas(image_path);
						}
					},
				})
			},
			init_canvas(path) {
				var canvas = uni.createCanvasContext('firstCanvas');
				/**
				 * 0 || 360: 
				 * 90度: (长, 0) 顶部朝向右侧
				 * 180度 || -180度: (长, 宽)
				 * -90度 || 270度: (0, 宽) 顶部朝向左侧
				 */
				canvas.translate(0, 0);
				canvas.rotate(360 * Math.PI / 180);
				canvas.drawImage(path, 0, 0, uni.upx2px(750), uni.upx2px(750));
				
				canvas.draw()
				
				
			},
		}
	}
</script>

<style>

</style>
