<template>
	<view>
		<scroll-view :style="{top: top+'px', left: left+'px'}" class="scroll-view_H" scroll-x="true">
			<!-- <view style="display: flex;flex-direction: row;justify-content: center;width: auto;"> -->
			<canvas canvas-id="canvas" class="canvas" :style="{width: upx2px(canvas.width)+ 'px', height: upx2px(canvas.height) +'px'}"></canvas>
			<!-- <canvas canvas-id="canvas_test" style="width: 50px;height: 50px;background-color: #007AFF;"></canvas> -->
			<!-- </view> -->
		</scroll-view>
		<view style="height: 100vh;background-color: #DD524D;display: flex;flex-direction: column;justify-content: center;align-items: center;">
			<image :src="render_src" :style="{width: render_image.width + 'px', height: render_image.height +'px'}" :animation="animationData"></image>
		</view>
		

		<view style="position: fixed;bottom: 0;width: 750upx;">
			<view class="row">
				<button @click="rotate">rotate</button>
				<button @click="render_rotate">draw</button>
			</view>
			
			<button @click="save">save</button>
			<button @click="upload">choose image</button>
			<view class="row">
				<button @click="down">down</button>
				<button @click="up">up</button>
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
				system: {},
				animationData: '',
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
				canvas: { //upx
					width: 0,
					height: 0,
					origin_width: 0,
					origin_height: 0,
				},
				render_image: { //px
					width: 0,
					height: 0,
					max_width: 375,
					max_height: 0
				},
				
				angle: 0,
				temp_angle: 0,
			}
		},
		onLoad() {
			this.animation = uni.createAnimation();
			this.system = uni.getSystemInfoSync();
			this.render_image.max_height = this.system.windowHeight
		},
		onUnload() {
			this.animationData = '';
		},
		onReady() {
			// this.upload();
			
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
			init() {
				this.angle = 0;
				this.temp_images = {}
				this.render_image = {
					width: 0,
					height: 0,
					max_width: 375,
					max_height: this.system.windowHeight
				}
			},
			upload() {
				
				this.init();
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
									//初始化canvas尺寸
									this.canvas.width = image.width > transverse_canvas_width ? transverse_canvas_width : image.width
									this.canvas.height = parseInt(this.canvas.width * image.height / image.width);
									this.canvas.origin_height = this.canvas.height
									this.canvas.origin_width = this.canvas.width
									
									//初始化预览图尺寸
									this.render_image.width = this.render_image.max_width;
									this.render_image.height = parseInt(this.render_image.width * image.height / image.width);
									
								}else {
									//初始化canvas尺寸
									this.canvas.height = image.height > lengthways_canvas_height ? lengthways_canvas_height : image.height
									this.canvas.width = parseInt(this.canvas.height * image.width / image.height);
									this.canvas.origin_width = this.canvas.width;
									this.canvas.origin_height = this.canvas.height
									
									//初始化预览图尺寸
									this.render_image.width = this.render_image.max_width
									this.render_image.height = parseInt(this.render_image.width * image.height / image.width);
									if (this.render_image.height > this.render_image.max_height) {
										this.render_image.height = this.render_image.max_height
										this.render_image.width = parseInt(this.render_image.height * image.width / image.height);
									}
								}
								
									
								console.log(this.canvas);
								console.log(this.render_image);
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
			down() {
				this.top += 50;
			},
			up() {
				this.top -= 50;
			},
			to_left() {
				this.left -= 50;
			},
			to_right() {
				this.left += 50;
			},
			rotate() {
				this.temp_angle += 90;
				
				let temp_scale = this.temp_angle % 180 == 0 ? 1 : (this.render_image.max_width / this.render_image.height).toFixed(2);

				console.log(temp_scale);
				
				console.log(this.temp_angle);
				this.animation.rotate(this.temp_angle).scale(temp_scale).step()
				this.animationData = this.animation.export()
			},
			render_rotate() {
				this.angle = this.temp_angle % 360;
				
				switch (this.angle) {
					case 90:
						console.log(11111111);
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
				setTimeout(()=> {
					this.ctx.draw(false, ()=> {
						console.log('canvas渲染完成');
					});
				}, 300);
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
				// this.temp_angle = 0;
				
			},
			save() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'canvas',
					success: (res)=> {
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
