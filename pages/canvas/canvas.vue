<template>
	<view>
		<view style="display: flex;flex-direction: row;">
			<image class="image" src="../../static/2.jpg"></image>
			<canvas canvas-id="canvas" class="canvas"></canvas>
			<!-- <canvas canvas-id="canvas_test" style="width: 50px;height: 50px;background-color: #007AFF;"></canvas> -->
		</view>
		<button @click="test">TEST</button>
		<button @click="save">save</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ctx: {},

			}
		},
		methods: {
			test() {
				console.log(111);
				try {
					uni.canvasGetImageData({
						canvasId: 'canvas',
						x: 0,
						y: 0,
						width: 10,
						height: 50,
						success(res) {

							// console.log(11111);
							console.log(res.data);
							console.log(res.width) // 100
							console.log(res.height) // 100
							console.log(res.data instanceof Uint8ClampedArray) // true
							console.log(res.data.length) // 100 * 100 * 4

							uni.canvasPutImageData({
								canvasId: 'canvas_test',
								x: 0,
								y: 0,
								width: 10,

								data: res.data,
								success(res) {
									console.log(res);
								},
								fail(e) {
									console.log(e);
								}
							})

						}
					})
				} catch (e) {
					console.log(e);
				}
			},
			save() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'canvas_test',
					success: function(res) {
						// 在H5平台下，tempFilePath 为 base64
						console.log(res.tempFilePath)
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								console.log('save success');
							}
						});
					}
				})
			}
		},
		onLoad() {

		},
		onReady() {
			try {
				this.ctx = uni.createCanvasContext('canvas');
				this.ctx.drawImage('../../static/2.jpg', 0, 0, 360, 720);
				this.ctx.draw();
			} catch (e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.image {
		width: 180px;
		height: 360px;
	}
	
</style>
