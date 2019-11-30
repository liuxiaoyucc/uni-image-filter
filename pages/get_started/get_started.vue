<template>
	<view class="page">
		<scroll-view :style="{top: top+'px', left: left+'px'}" class="scroll-view_H" scroll-x="true">
			<canvas canvas-id="canvas" class="canvas" :style="{width: upx2px(canvas.width)+ 'px', height: upx2px(canvas.height) +'px'}"></canvas>
		</scroll-view>


		<view class="render-area">
			<view :animation="render_image_animationData">
				<image :src="render_src" :style="{width: render_image.width + 'px', height: render_image.height +'px'}"></image>
			</view>
			<view v-if="!render_src">
				<image @tap="upload" style="width: 100upx;height: 100upx;" src="../../static/tool_icon/upload_image.png"></image>
			</view>
		</view>

		<view style="background-color: #000000;display: flex;flex-direction: column;">
			<view :animation="filters_animationData" class="scroll">
				<scroll-view scroll-x="true" class="operation-scroll">
					<view class="operation-box">
						<view class="operation-item" @tap="filter_choose(id)" v-for="(name, id) in filter_obj" :key="id">
							<image :class="id == active_item ? 'active-item':''" :src="'../../static/tool_icon/' + id +'.jpg'" mode="aspectFill"
							 class="filter"></image>
							<text class="filter-name">{{name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="toolbar">

				<view class="actions">
					<view class="action" @tap="filter">
						<image src="../../static/tool_icon/filter.png" class="action-icon"></image>
					</view>
					<view class="action" @tap="rotate">
						<image src="../../static/tool_icon/rotate.png" class="action-icon"></image>
					</view>
					<view class="action" @tap="upload">
						<image src="../../static/tool_icon/tailor.png" class="action-icon"></image>
					</view>
					<view class="action">
						<image src="../../static/tool_icon/beauty.png" class="action-icon"></image>
					</view>
					<view class="action" @tap="save">
						<image src="../../static/tool_icon/edit.png" class="action-icon"></image>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import ImageFilters from '../../utils/weImageFilters/weImageFilters.js';
	import Helper from '../../utils/weImageFilters/weImageFiltersHelper.js';
	let helper = '';
	const filters = {
		original: function(data) {
			return data
		},
		Binarize: function(data) {
			// Binarize (srcImageData, threshold)
			// threshold 0.0 <= n <= 1.0
			return ImageFilters.Binarize(data, 0.5)
		},
		BoxBlur: function(data) {
			// BoxBlur (srcImageData, hRadius, vRadius, quality)

			return ImageFilters.BoxBlur(data, 3, 3, 2)
		},
		GaussianBlur: function(data) {
			// GaussianBlur (srcImageData, strength)
			// strength 1 <= n <= 4
			return ImageFilters.GaussianBlur(data, 4)
		},
		StackBlur: function(data) {
			// StackBlur (srcImageData, radius)

			return ImageFilters.StackBlur(data, 6)
		},
		Brightness: function(data) {
			// Brightness (srcImageData, brightness)
			// brightness - 100 <= n <= 100
			return ImageFilters.Brightness(data, 100)
		},
		BrightnessContrastGimp: function(data) {
			// BrightnessContrastGimp (srcImageData, brightness, contrast)
			// brightness - 100 <= n <= 100
			// contrast - 100 <= n <= 100
			return ImageFilters.BrightnessContrastGimp(data, 26, 13)
		},
		BrightnessContrastPhotoshop: function(data) {
			// ImageFilters.BrightnessContrastPhotoshop (srcImageData, brightness, contrast)
			// brightness - 100 <= n <= 100
			// contrast - 100 <= n <= 100
			return ImageFilters.BrightnessContrastPhotoshop(data, 26, 13)
		},
		Channels: function(data) {
			// ImageFilters.Channels (srcImageData, channel)
			// channel: default is red, 2 green, 3 blue

			return ImageFilters.Channels(data, 3)
		},
		ColorTransformFilter: function(data) {
			// ImageFilters.ColorTransformFilter (srcImageData, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
			// redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier: 0~5
			// redOffset, greenOffset, blueOffset, alphaOffset: 0~255

			return ImageFilters.ColorTransformFilter(data, 2, 1, 1, 1, 38, 0, 0, 0)
		},
		Desaturate: function(data) {
			// ImageFilters.Desaturate (srcImageData)
			return ImageFilters.Desaturate(data)
		},
		Dither: function(data) {
			// ImageFilters.Dither (srcImageData, levels)
			// levels 2 <= n <= 255
			return ImageFilters.Dither(data, 2)
		},
		Edge: function(data) {
			// ImageFilters.Edge (srcImageData)
			return ImageFilters.Edge(data)
		},
		Emboss: function(data) {
			// ImageFilters.Emboss (srcImageData)
			return ImageFilters.Emboss(data)
		},
		Enrich: function(data) {
			// ImageFilters.Enrich (srcImageData)
			return ImageFilters.Enrich(data)
		},
		Flip: function(data) {
			// ImageFilters.Flip (srcImageData, vertical)
			// vertical{Boolean}
			return ImageFilters.Flip(data, 1);
		},
		Gamma: function(data) {
			// ImageFilters.Gamma (srcImageData, gamma)
			// gamma: 0~5
			return ImageFilters.Gamma(data, 5)
		},
		GrayScale: function(data) {
			// ImageFilters.GrayScale (srcImageData)
			return ImageFilters.GrayScale(data)
		},
		HSLAdjustment: function(data) {
			// ImageFilters.HSLAdjustment (srcImageData, hueDelta, satDelta, lightness)
			// hueDelta: 0~180
			// satDelta, lightness: 0~100
			return ImageFilters.HSLAdjustment(data, -23, 54, 19)
		},
		Invert: function(data) {
			// ImageFilters.Invert (srcImageData)
			return ImageFilters.Invert(data)
		},
		Mosaic: function(data) {
			// ImageFilters.Mosaic (srcImageData, blockSize)
			// blockSize > 0
			return ImageFilters.Mosaic(data, 10)
		},
		Oil: function(data) {
			// ImageFilters.Oil (srcImageData, range, levels)
			// range: 1~5
			// levels: 1~256
			return ImageFilters.Oil(data, 5, 62)
		},
		OpacityFilter: function(data) {
			// ImageFilters.OpacityFilter (srcImageData, opacity)
			// opacity: 0~255
			return ImageFilters.OpacityFilter(data, 123)
		},
		Posterize: function(data) {
			// ImageFilters.Posterize (srcImageData, levels)
			// levels: 2~32
			return ImageFilters.Posterize(data, 6)
		},
		Rescale: function(data) {
			// ImageFilters.Rescale (srcImageData, scale)
			// scale: 0~5
			return ImageFilters.Rescale(data, 3.2)
		},
		// ResizeNearestNeighbor: function (data) {
		//     // ImageFilters.ResizeNearestNeighbor (srcImageData, width, height)
		//     return ImageFilters.ResizeNearestNeighbor(data, 500, 500)
		// },
		Sepia: function(data) {
			// ImageFilters.Sepia(srcImageData)
			return ImageFilters.Sepia(data)
		},
		Sharpen: function(data) {
			// ImageFilters.Sharpen (srcImageData, factor)
			// factor: 1~10
			return ImageFilters.Sharpen(data, 9)
		},
		Solarize: function(data) {
			// ImageFilters.Solarize (srcImageData)
			return ImageFilters.Solarize(data)
		},
		Transpose: function(data) {
			// ImageFilters.Transpose (srcImageData)
			// factor: 1~10
			return ImageFilters.Transpose(data)
		},
		Twril: function(data) {
			// ImageFilters.Twril (srcImageData, centerX, centerY, radius, angle, edge, smooth)
			// centerX 0.0 <= n <= 1.0
			// centerY 0.0 <= n <= 1.0
			// radius
			// angle(degree)
			// smooth{Boolean}
			return ImageFilters.Twril(data, 0.5, 0.5, 120, 90, 0, true)
		},
		Rotate: function(data) {
			return ImageFilters.Rotate(data, 90);
		}
	}


	let filter_obj = {
		original: '原图',
		Binarize: '二值化',
		BoxBlur: '方框模糊',
		GaussianBlur: '高斯模糊',
		StackBlur: '堆栈模糊',
		Brightness: '明亮',
		BrightnessContrastGimp: '高对比度1',
		BrightnessContrastPhotoshop: '高对比度2',
		Channels: '单色',
		// ColorTransformFilter: '颜色变换滤波器',
		// Desaturate: '冲淡',
		// Dither: '抖动',
		// Edge: '边缘',
		// Emboss: '浮雕',
		// Enrich: '丰富',
		Flip: '翻转',
		// Rotate: '旋转',
		// Gamma: '伽马',
		// GrayScale: '灰度',
		// HSLAdjustment: 'HSL调节',
		// Invert: '反色',
		// Mosaic: '马赛克',
		// Oil: '油画',
		// OpacityFilter: '不透明度',
		// Posterize: '色调分离',
		// Rescale: '缩放',
		// Sepia: '褐色',
		// Sharpen: '锐化',
		// Solarize: '曝光',
		// Transpose: '调换',
		// Twril: '水波旋转'
	}

	const keys = Object.keys(filters);

	const picker_items = Object.values(filter_obj);
	const transverse_canvas_width = 1000;
	const lengthways_canvas_height = 1000;
	export default {
		data() {
			return {
				from: '',
				filters_animationData: '',
				render_image_animationData: '',
				
				src: '',
				selected: false,
				gap: 0,
				filter_obj: filter_obj,
				active_item: 'original',
				show_filter: false,

				render_src: '',
				render_image: { //px
					width: 0,
					height: 0,
					rotate_width: 0,
					rotate_height: 0,
					max_width: 375,
					max_height: 0
				},
				
				top: -99999,
				left: -99999,
				canvas: { //upx
					width: 0,
					height: 0,
					origin_width: 0,
					origin_height: 0,
				},
				angle: 0,
				temp_angle: 0,
				rendered: true,
			}
		},
		onLoad(options) {
			console.log(options);
			this.from = options.from;
			this.src = options.image_src;
			this.render_src = options.image_src;
			
			//盲人分袜子
			let socks = [0, 0, 1, 1, 1, 0, 0, 1];
			let first = [];
			let second = [];
			
			for (var i = 0; i < socks.length; i++) {
				first.push(socks[i]);
				second.push(socks[i]);
			}
			console.log(first);
			console.log(second);
			
			this.picker_items = picker_items;

			this.filters_animation = uni.createAnimation({
				duration: 300
			})
			this.render_image_animation = uni.createAnimation();
			
			this.system = uni.getSystemInfoSync();
			this.render_image.max_height = this.system.windowHeight

			console.log(uni.getSystemInfoSync());
			
			this.init_image();
		},
		onUnload() {
			this.filters_animationData = '';
			this.render_image_animationData = '';
		},
		onReady() {
			// this.upload();
		},
		watch: {
			show_filter(val, old_value) {
				console.log(val);
				if (val === true) {
					this.filters_animation.translateY(uni.upx2px(-230)).step()
				} else {
					this.filters_animation.translateY(uni.upx2px(230)).step()
				}
				this.filters_animationData = this.filters_animation.export()
			}
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
			init_data() {
				this.angle = 0;
				
				this.render_image = {
					width: 0,
					height: 0,
					max_width: 375,
					max_height: this.system.windowHeight
				}
			},
			init_image() {
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
				
						} else {
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
						helper = new Helper({
							canvasId: 'canvas',
							width: this.upx2px(this.canvas.width),
							height: this.upx2px(this.canvas.height)
						})
						// this.ctx = uni.createCanvasContext('canvas');
						helper.initCanvas(this.src, () => {
							console.log('initCanvas');
							uni.hideLoading();
						})
				
						// this.ctx.drawImage(this.src, 0, 0, this.px_width, this.px_height);
						// this.ctx.draw();
					},
					fail: (e) => {
						console.log(e);
					}
				})
			},
			
			upload() {

				this.init_data();
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: ['original'],
					success: (res) => {
						uni.showLoading({
							title: '加载中...',
							mask: true
						})
						this.src = res.tempFilePaths[0]
						this.render_src = this.src;
						this.init_image();
					}
				})
			},


			filter_choose(key) {
				if (!this.can_handle()) {
					return;
				}
				if (key == this.active_item) {
					console.log('当前');
					return;
				}

				this.active_item = key;

				uni.showLoading({
					title: '处理中...',
					mask: true
				})

				let startTime = (new Date()).getTime()
				let imageData = helper.createImageData()

				let filtered = filters[key](imageData)

				helper.putImageData(filtered, (tempFilePath) => {
					uni.hideLoading();

					console.log(this.render_image);
					this.reset_render_image();
					
					this.render_src = tempFilePath;
					
					let endTime = (new Date()).getTime()
					let gap = (endTime - startTime)
					this.gap = gap;
				})
			},
			reset_render_image() {
				
				return;
				console.log(this.angle);
				console.log(this.render_image);
				// this.render_image.width = this.render_image.width ^ this	.render_image.height;
				// this.render_image.width = this.render_image.width ^ this.render_image.height;
				this.render_image_animation.rotate(0).scale(1).step({duration: 0})
				this.render_image_animationData = this.render_image_animation.export()
				this.angle = this.temp_angle = 0;
				this.render_image.height = this.render_image.width * (1/this.scale);
				console.log(this.render_image.height);
				return;
				this.render_image_animation.rotate(0, 0)
					.scale(1)
					.step({
						duration: 0
					})
				this.render_image_animationData = this.render_image_animation.export()
			},
			
			filter() {
				this.show_filter = !this.show_filter;
			},

			rotate() {
				if (!this.can_handle()) {
					return;
				}
				this.rendered = false;
				this.show_filter = false;
				this.temp_angle += 90;
				this.angle += 90;
				let temp_scale = this.temp_angle % 180 == 0 ? 1 : (this.render_image.max_width / this.render_image.height).toFixed(
					2);

				console.log(temp_scale);

				console.log(this.temp_angle);
				this.render_image_animation.rotate(this.temp_angle).scale(temp_scale).step()
				this.render_image_animationData = this.render_image_animation.export()
			},
			render_rotate(cb) {
				
				this.angle = this.angle % 360;
				let angle = this.angle;
				
				let translate_x, translate_y, draw_width, draw_height, d_width, d_height;
				console.log(this.canvas);
				switch (angle) {
					case 90:
					case 270:
						console.log('90 || 270');
						this.canvas.width = this.canvas.origin_height;
						this.canvas.height = this.canvas.origin_width;
						translate_x = angle / 90 == 1 ? this.px_width : 0;
						translate_y = translate_x ? 0 : this.px_height;
						draw_width = this.px_height;
						draw_height = this.px_width;
						break;
					case 180:
					case 0:
						console.log('0 || 180');
						try{
							this.canvas.height = this.canvas.origin_height;
							this.canvas.width = this.canvas.origin_width;
							translate_x = angle / 180 == 1 ? this.px_width : 0;
							translate_y = translate_x ? this.px_height : 0;
							draw_width = this.px_width;
							draw_height = this.px_height
						}catch(e){
							console.log(e);
						}
						
						break;
					default:
						break;
				}
				console.log(this.canvas);
				d_width = this.upx2px(this.canvas.height);
				d_height = this.upx2px(this.canvas.width);
				console.log(angle, translate_x, translate_y, draw_width, draw_height, d_width, d_height);
				helper.rotateCanvas(this.render_src, angle, translate_x, translate_y, draw_width, draw_height, d_width, d_height, ()=> {
					console.log('canvas渲染完成ok');
					this.rendered = true;
					cb && cb()
				});
			},
			upx2px(value) {
				if (!value) {
					return 0;
				}
				return uni.upx2px(value);
			},
			can_handle() {
				if (!this.src) {
					this.$helper.toast('none', '请先上传图片', 2000, false, 'bottom');
					return false;
				}
				if (!this.render_src) {
					this.$helper.toast('none', '没有需要保存的图片', 2000, false, 'bottom');
					return false;
				}
				return true;
			},
			
			/**
			 *  到这里拿到图片就操作结束了
			 */
			save() {
				if (!this.can_handle()) {
					return;
				}
				this.$helper.toast('loading', '保存中...', 10000);
				this.render_rotate(()=> {
					helper.getImageTempFilePath((tempFilePath)=> {
						this.$helper.to("../preview/preview?from=" + this.from + '&image_src=' + encodeURIComponent(tempFilePath))
						uni.hideToast();
						// uni.saveImageToPhotosAlbum({
						// 	filePath: tempFilePath,
						// 	success: res => {
						// 		uni.hideToast();
						// 		this.$helper.toast('success', '保存成功');
						// 	}
						// })
					})
				})
				console.log(this.angle);
				
				
				
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}

	.scroll-view_H {
		position: fixed;
		white-space: nowrap;
		width: 100%;
		height: auto;
		border: 1px solid #007AFF;
	}

	.canvas {
		/* background-color: #007AFF; */
		border: 1px solid #FF0000;
	}









	.page {
		display: flex;
		flex-direction: column;
		/* width: 750upx; */
		/* justify-content: center; */
		align-items: center;
	}
	.render-area {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.main-image {
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 250upx;
	}

	.main-canvas {}

	.upload-image {
		height: 100upx;
		width: 100upx;
		margin-top: 500upx;
	}

	.operation-box {
		/* position: fixed;
		bottom: 80upx; */
		display: flex;
		padding-left: 10upx;
		flex-direction: row;
		height: 150upx;
		width: 750upx;
	}

	.scroll {
		position: fixed;
		bottom: -150upx;
		left: 0;
		background-color: #171717;
		;
	}

	.operation-scroll {
		white-space: nowrap;
		width: 750upx;
		box-shadow: inset 0px 15px 2px -15px rgba(255, 255, 255, .4);
	}

	.operation-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10upx 10upx 0upx 10upx;
	}

	.active-item {
		border: 4upx solid #EE9A00;
	}

	.filter-name {
		line-height: 36upx;
		font-size: 24upx;
		color: #e6e6e6;
		font-weight: 600;
	}

	.filter {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
	}

	.toolbar {
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #0F0F0F;
		box-shadow: inset 0px 15px 5px -15px rgba(255, 255, 255, .4);
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		width: 750upx;
	}

	.action {
		height: 80upx;
		width: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.action-icon {
		width: 40upx;
		height: 40upx;
	}
</style>
