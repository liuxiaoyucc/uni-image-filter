<template>
	<view class="page">
		<view class="main-image">
			<canvas v-if="selected" class="main-canvas" canvas-id='main_canvas' :style="{width: upx2px(image.width)+ 'px', height: upx2px(image.height) +'px'}"></canvas>
			<image class="upload-image" @tap="choose" v-if="!selected" src="../../static/tool_icon/upload_image.png"></image>
		</view>
		<view style="background-color: #000000;display: flex;flex-direction: column;">
			<scroll-view :animation="animationData" v-if="show_filter" scroll-x="true" class="operation-scroll">
				<view class="operation-box">
					<view class="operation-item" @tap="filter_choose(id)" v-for="(name, id) in filter_obj" :key="id">
						<image :class="id == active_item ? 'active-item':''" :src="'../../static/tool_icon/' + id +'.jpg'" mode="aspectFill" class="filter"></image>
						<text class="filter-name">{{name}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="toolbar">
				
				<view class="actions">
					<view class="action" @tap="filter">
						<image src="../../static/tool_icon/filter.png" class="action-icon"></image>
					</view>
					<view class="action">
						<image src="../../static/tool_icon/rotate.png" class="action-icon"></image>
					</view>
					<view class="action">
						<image src="../../static/tool_icon/tailor.png" class="action-icon"></image>
					</view>
					<view class="action">
						<image src="../../static/tool_icon/beauty.png" class="action-icon"></image>
					</view>
					<view class="action">
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
	    original: function (data) {
	        return data
	    },
	    Binarize: function (data) {
	        // Binarize (srcImageData, threshold)
	        // threshold 0.0 <= n <= 1.0
	        return ImageFilters.Binarize(data, 0.5)
	    },
	    BoxBlur: function (data) {
	        // BoxBlur (srcImageData, hRadius, vRadius, quality)
	
	        return ImageFilters.BoxBlur(data, 3, 3, 2)
	    },
	    GaussianBlur: function (data) {
	        // GaussianBlur (srcImageData, strength)
	        // strength 1 <= n <= 4
	        return ImageFilters.GaussianBlur(data, 4)
	    },
	    StackBlur: function (data) {
	        // StackBlur (srcImageData, radius)
	
	        return ImageFilters.StackBlur(data, 6)
	    },
	    Brightness: function (data) {
	        // Brightness (srcImageData, brightness)
	        // brightness - 100 <= n <= 100
	        return ImageFilters.Brightness(data, 100)
	    },
	    BrightnessContrastGimp: function (data) {
	        // BrightnessContrastGimp (srcImageData, brightness, contrast)
	        // brightness - 100 <= n <= 100
	        // contrast - 100 <= n <= 100
	        return ImageFilters.BrightnessContrastGimp(data, 26, 13)
	    },
	    BrightnessContrastPhotoshop: function (data) {
	        // ImageFilters.BrightnessContrastPhotoshop (srcImageData, brightness, contrast)
	        // brightness - 100 <= n <= 100
	        // contrast - 100 <= n <= 100
	        return ImageFilters.BrightnessContrastPhotoshop(data, 26, 13)
	    },
	    Channels: function (data) {
	        // ImageFilters.Channels (srcImageData, channel)
	        // channel: default is red, 2 green, 3 blue
	
	        return ImageFilters.Channels(data, 3)
	    },
	    ColorTransformFilter: function (data) {
	        // ImageFilters.ColorTransformFilter (srcImageData, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
	        // redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier: 0~5
	        // redOffset, greenOffset, blueOffset, alphaOffset: 0~255
	
	        return ImageFilters.ColorTransformFilter(data, 2, 1, 1, 1, 38, 0, 0, 0)
	    },
	    Desaturate: function (data) {
	        // ImageFilters.Desaturate (srcImageData)
	        return ImageFilters.Desaturate(data)
	    },
	    Dither: function (data) {
	        // ImageFilters.Dither (srcImageData, levels)
	        // levels 2 <= n <= 255
	        return ImageFilters.Dither(data, 2)
	    },
	    Edge: function (data) {
	        // ImageFilters.Edge (srcImageData)
	        return ImageFilters.Edge(data)
	    },
	    Emboss: function (data) {
	        // ImageFilters.Emboss (srcImageData)
	        return ImageFilters.Emboss(data)
	    },
	    Enrich: function (data) {
	        // ImageFilters.Enrich (srcImageData)
	        return ImageFilters.Enrich(data)
	    },
	    Flip: function (data) {
	        // ImageFilters.Flip (srcImageData, vertical)
	        // vertical{Boolean}
	        return ImageFilters.Flip(data, 0)
	    },
	    Gamma: function (data) {
	        // ImageFilters.Gamma (srcImageData, gamma)
	        // gamma: 0~5
	        return ImageFilters.Gamma(data, 5)
	    },
	    GrayScale: function (data) {
	        // ImageFilters.GrayScale (srcImageData)
	        return ImageFilters.GrayScale(data)
	    },
	    HSLAdjustment: function (data) {
	        // ImageFilters.HSLAdjustment (srcImageData, hueDelta, satDelta, lightness)
	        // hueDelta: 0~180
	        // satDelta, lightness: 0~100
	        return ImageFilters.HSLAdjustment(data, -23, 54, 19)
	    },
	    Invert: function (data) {
	        // ImageFilters.Invert (srcImageData)
	        return ImageFilters.Invert(data)
	    },
	    Mosaic: function (data) {
	        // ImageFilters.Mosaic (srcImageData, blockSize)
	        // blockSize > 0
	        return ImageFilters.Mosaic(data, 10)
	    },
	    Oil: function (data) {
	        // ImageFilters.Oil (srcImageData, range, levels)
	        // range: 1~5
	        // levels: 1~256
	        return ImageFilters.Oil(data, 5, 62)
	    },
	    OpacityFilter: function (data) {
	        // ImageFilters.OpacityFilter (srcImageData, opacity)
	        // opacity: 0~255
	        return ImageFilters.OpacityFilter(data, 123)
	    },
	    Posterize: function (data) {
	        // ImageFilters.Posterize (srcImageData, levels)
	        // levels: 2~32
	        return ImageFilters.Posterize(data, 6)
	    },
	    Rescale: function (data) {
	        // ImageFilters.Rescale (srcImageData, scale)
	        // scale: 0~5
	        return ImageFilters.Rescale(data, 3.2)
	    },
	    // ResizeNearestNeighbor: function (data) {
	    //     // ImageFilters.ResizeNearestNeighbor (srcImageData, width, height)
	    //     return ImageFilters.ResizeNearestNeighbor(data, 500, 500)
	    // },
	    Sepia: function (data) {
	        // ImageFilters.Sepia(srcImageData)
	        return ImageFilters.Sepia(data)
	    },
	    Sharpen: function (data) {
	        // ImageFilters.Sharpen (srcImageData, factor)
	        // factor: 1~10
	        return ImageFilters.Sharpen(data, 9)
	    },
	    Solarize: function (data) {
	        // ImageFilters.Solarize (srcImageData)
	        return ImageFilters.Solarize(data)
	    },
	    Transpose: function (data) {
	        // ImageFilters.Transpose (srcImageData)
	        // factor: 1~10
	        return ImageFilters.Transpose(data)
	    },
	    Twril: function (data) {
	        // ImageFilters.Twril (srcImageData, centerX, centerY, radius, angle, edge, smooth)
	        // centerX 0.0 <= n <= 1.0
	        // centerY 0.0 <= n <= 1.0
	        // radius
	        // angle(degree)
	        // smooth{Boolean}
	        return ImageFilters.Twril(data, 0.5, 0.5, 120, 90, 0, true)
	    },
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
	    // Flip: '翻转',
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
	
	export default {
		data() {
			return {
				animationData: {},
				src: '',
				selected: false,
				gap: 0,
				filter_obj: filter_obj,
				active_item: 'original',
				show_filter: false,
				image: {
					width: 710,
					height: 900
				},
			}
		},
		onLoad() {
			this.picker_items = picker_items;
			
			
		},
		onShow() {
			
		},
		methods: {
			sliderChange(e) {
				console.log(e);
			},
			
			filter_choose(key) {
				if (!this.src) {
					this.$helper.toast('none', '请先上传图片', 2000, false, 'bottom');
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
				
				helper.putImageData(filtered, () => {
				    uni.hideLoading();
				
				    let endTime = (new Date()).getTime()
				    let gap = (endTime - startTime)
					this.gap = gap;
				})
			},
			choose() {
			    
			    uni.chooseImage({
			        count: 1,
			        success:  (res)=> {
						this.selected = true
						uni.showLoading({
							title: '加载中...',
							mask: true
						})
			            if (res.tempFilePaths.length) {
			                let path = res.tempFilePaths[0];
							this.src = path;
			                uni.getImageInfo({
			                	src: path,
			                	success: (image)=> {
									
			                		this.image.height = this.image.width * image.height / image.width;
									
			                		helper = new Helper({
			                		    canvasId: 'main_canvas',
			                		    width: this.upx2px(this.image.width),
			                		    height: this.upx2px(this.image.height)
			                		})
			                		helper.initCanvas(path, () => {
										uni.hideLoading();
										console.log("cb");
									})
			                	    
			                	}
			                })
							
			            }
			        },
			    })
			},
			filter() {
				this.show_filter = !this.show_filter
			},
			upx2px(value) {
				if (!value){
					return 0;
				}
				return uni.upx2px(value);
			},
			save() {
			    helper.getImageTempFilePath(tempFilePath => {
			        // 保存到相册
			        uni.saveImageToPhotosAlbum({
			            filePath: tempFilePath,
			            success: res => {
			                uni.showToast({
			                    title: '保存成功',
			                })
			            }
			        })
			    })
			}
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
		width: 750upx;
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
	.main-canvas {
		
	}
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
	.operation-scroll {
		background-color: #171717;
		position: fixed;
		bottom: 80upx;
		left: 0;
		white-space: nowrap;
		width: 750upx;
		box-shadow:inset 0px 15px 2px -15px rgba(255, 255, 255, .4);
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
		box-shadow:inset 0px 15px 5px -15px rgba(255, 255, 255, .4);
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
		
		height: 80upx;
		width: 750upx;
	}
	.action {
		display: flex;
		flex: 1;
		justify-content: center;
		align-content: center;
	}
	.action-icon {
		width: 40upx;
		height: 40upx;
	}
	
</style>
