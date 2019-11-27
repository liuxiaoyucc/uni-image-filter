<template>
	<view>
		<view style="display: flex;flex-direction: row;justify-content: center;">
			<canvas canvas-id="canvas" class="canvas" :style="{width: upx2px(canvas.width)+ 'px', height: upx2px(canvas.height) +'px'}"></canvas>
			<!-- <canvas canvas-id="canvas_test" style="width: 50px;height: 50px;background-color: #007AFF;"></canvas> -->
		</view>
		<button @click="rotate">rotate</button>
		<button @click="save">save</button>
	</view>
</template>

<script>
	import ImageFilters from '../../utils/weImageFilters/weImageFilters.js';
	import Helper from '../../utils/weImageFilters/weImageFiltersHelper.js';
	export default {
		data() {
			return {
				src: '/static/4.jpg',
				ctx: {},
				canvas: {
					width: 650,
					height: 1300,
					origin_width: 650,
					origin_height: 1300,
				},
				angle: 0,
			}
		},
		onReady() {
			uni.getImageInfo({
				src: this.src,
				success: (image)=> {
					console.log(image);
					this.canvas.height = this.canvas.width * image.height / image.width;
					this.canvas.origin_height = this.canvas.height;
				    this.ctx = uni.createCanvasContext('canvas');
				    // this.ctx.scale(1,1)
				    
				    this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
				    this.ctx.draw();
				},
				fail: (e) => {
					console.log(e);
				}
			})
			// try {
			// 	this.ctx = uni.createCanvasContext('canvas');
			// 	// this.ctx.scale(1,1)

			// 	this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
			// 	this.ctx.draw();
			// } catch (e) {
			// 	console.log(e);
			// }
		},
		computed: {
			px_width() {
				return this.upx2px(this.canvas.width);
			},
			px_height() {
				return this.upx2px(this.canvas.height);
			},
			scale() { //宽高比
				return this.canvas.width / this.canvas.height;
			},
			reverse_scale() {
				return this.canvas.height / this.canvas.width;
			}
		},
		methods: {
			rotate() {
				this.angle = this.angle == 270 ? 0 : this.angle + 90;
				//先使用scale等比缩放
				let scale = this.scale
				let reverse_scale = this.reverse_scale;
				console.log(this.angle);
				switch (this.angle){
					case 90:
						this.canvas.height = this.canvas.width * scale;
						
						this.ctx.translate(this.px_width, 0);
						this.ctx.rotate(this.angle * Math.PI / 180);
						this.ctx.drawImage(this.src, 0, 0, this.px_height, this.px_width);
						break;
					case 180: 
						this.canvas.height = this.canvas.origin_height;
						this.ctx.translate(this.px_width, this.px_height);
						this.ctx.rotate(this.angle * Math.PI / 180);
						this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
						
						break;
					case 270:
						this.canvas.height = this.canvas.width * scale;
						this.ctx.translate(0, this.px_height);
						this.ctx.rotate(this.angle * Math.PI / 180);
						this.ctx.drawImage(this.src, 0, 0, this.px_height, this.px_width);
						break;
					default:
						this.canvas.height = this.canvas.origin_height;
						this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
						break;
				}
				console.log(2);
				
				// #ifdef H5
				setTimeout(()=> {
					this.ctx.draw()
				}, 100);
				// #endif
				// #ifndef H5
				this.ctx.draw()
				// #endif
			},
			save() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'canvas',
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
			},
			upx2px(value) {
				if (!value) {
					return 0;
				}
				return uni.upx2px(value);
			},
		},

	}
</script>

<style>
	.image {
		width: 180px;
		height: 360px;
	}

	.canvas {
		/* background-color: #007AFF; */
		border: 1px solid #007AFF;
	}
</style>
