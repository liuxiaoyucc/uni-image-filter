<template>
	<view>
		<scroll-view :style="{top: top+'px', left: left+'px'}" class="scroll-view_H" scroll-x="true" @scroll="scroll">
			<!-- <view style="display: flex;flex-direction: row;justify-content: center;width: auto;"> -->
			<canvas canvas-id="canvas" class="canvas" :style="{width: upx2px(canvas.width)+ 'px', height: upx2px(canvas.height) +'px'}"></canvas>
			<!-- <canvas canvas-id="canvas_test" style="width: 50px;height: 50px;background-color: #007AFF;"></canvas> -->
			<!-- </view> -->
		</scroll-view>
		
		<image :src="render_src" style="width: 750upx;" mode="widthFix"></image>

		<view style="position: fixed;bottom: 0;width: 750upx;">
			<button @click="rotate">rotate</button>
			<button @click="save">save</button>
			<button @click="upload">reupload</button>
			<view class="row">
				<button @click="pull">pull</button>
				<button @click="push">push</button>
			</view>
			<view class="row">
				<button @click="to_left">left</button>
				<button @click="to_right">right</button>
			</view>
		</view>
	</view>
</template>

<script>
	import ImageFilters from '../../utils/weImageFilters/weImageFilters.js';
	import Helper from '../../utils/weImageFilters/weImageFiltersHelper.js';
	let transverse_canvas_width = 1000;
	let lengthways_canvas_height = 1000;
	export default {
		data() {
			return {
				src: '',
				render_src: '',
				temp_images: {
					angle0: '',
					angle90: '',
					angle180: '',
					angle270: '',
				},
				
				ctx: {},
				top: -99999,
				left: -99999,
				canvas: {
					width: 0,
					height: 0,
					origin_width: 0,
					origin_height: 0,
				},
				
				angle: 0,
			}
		},
		onReady() {
			this.upload();
			
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
			upload() {
				this.angle = 0;
				this.temp_images = {}
				uni.chooseImage({
					count:1,
					sourceType: ['album'],
					sizeType: ['original'],
					success: (res)=>{
						this.src = res.tempFilePaths[0]
						this.render_src = this.src;
						uni.getImageInfo({
							src: this.src,
							success: (image) => {
								console.log(image);
								if (image.width >= image.height) {
									this.canvas.width = image.width > transverse_canvas_width ? transverse_canvas_width : image.width
									this.canvas.height = parseInt(this.canvas.width * image.height / image.width);
									this.canvas.origin_height = this.canvas.height
									this.canvas.origin_width = this.canvas.width
								}else {
									this.canvas.height = image.height > lengthways_canvas_height ? lengthways_canvas_height : image.height
									this.canvas.width = parseInt(this.canvas.height * image.width / image.height);
									this.canvas.origin_width = this.canvas.width;
									this.canvas.origin_height = this.canvas.height
								}
								console.log(this.canvas);
								this.ctx = uni.createCanvasContext('canvas');
								// this.ctx.scale(1,1)
						
								this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
								this.ctx.draw();
							},
							fail: (e) => {
								console.log(e);
							}
						})
					}
				})
			},
			scroll() {
				console.log(1);
			},
			pull() {
				this.top += 50;
			},
			push() {
				this.top -= 50;
			},
			to_left() {
				this.left += 50;
			},
			to_right() {
				this.left -= 50;
			},
			rotate() {
				this.angle = this.angle == 270 ? 0 : this.angle + 90;
				//先使用scale等比缩放
				let scale = this.scale
				let reverse_scale = this.reverse_scale;
				
				switch (this.angle) {
					case 90:
						
						// this.canvas.height = this.canvas.width * scale;
						this.canvas.width = this.canvas.height;
						this.canvas.height = this.canvas.origin_width;
						this.ctx.translate(this.px_width, 0);
						this.ctx.rotate(this.angle * Math.PI / 180);
						
						this.ctx.drawImage(this.src, 0, 0, this.px_height, this.px_width);
						break;
					case 180:
						this.canvas.height = this.canvas.origin_height;
						this.canvas.width = this.canvas.origin_width;
						this.ctx.translate(this.px_width, this.px_height);
						this.ctx.rotate(this.angle * Math.PI / 180);
						this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);

						break;
					case 270:
						this.canvas.width = this.canvas.height;
						this.canvas.height = this.canvas.origin_width;

						this.ctx.translate(0, this.px_height);
						this.ctx.rotate(this.angle * Math.PI / 180);
						this.ctx.drawImage(this.src, 0, 0, this.px_height, this.px_width);
						break;
					default:
						this.canvas.height = this.canvas.origin_height;
						this.canvas.width = this.canvas.origin_width;
						this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
						break;
				}


				// #ifdef H5
				setTimeout(() => {
					this.ctx.draw(false, ()=> {
						this.render_image_to_show();
					});
				}, 100);
				// #endif
				// #ifndef H5
				this.ctx.draw(false, ()=> {
					this.render_image_to_show();
				});
				// #endif
			},
			render_image_to_show() {
				console.log(this.temp_images);
				if (this.temp_images['angle'+this.angle]) {
					this.render_src = this.temp_images['angle'+this.angle];
				}else {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						canvasId: 'canvas',
						success: (res)=> {
							console.log(res.tempFilePath)
							this.render_src = res.tempFilePath;
							this.temp_images['angle'+this.angle] = res.tempFilePath;
						}
					})
				}
				
			},
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: this.render_src,
					success: function() {
						console.log('save success');
					}
				});
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

	.row {
		display: flex;
		flex-direction: row;
	}

	.scroll-view_H {
		position: fixed;
		white-space: nowrap;
		width: 100%;
		height: auto;
	}
</style>
