<template>
	<view>
		<view class='wrap'>
		    <button @tap="choose">choose image</button>
		    <!-- <button wx:if="{{selected}}" bindtap='filterTap'>filter</button> -->
		    <view v-if="selected" class='picker-wrap'>
		        <picker @change="bindPickerChange" :value="index" :range="picker_items">
		            <view class="picker">
		                当前选择：{{picker_items[index]}}
		            </view>
		        </picker>
		    </view>
		    <view class='time' v-if="gap">Processing time:{{gap}}ms</view>
		</view>
		<!-- <canvas canvas-id='hehe' style='margin:0 auto;width:320px; height:640px; border:1px solid #ddd;'></canvas> -->
		
		<canvas canvas-id='hehe' :style="{width: upx2px(image.width)+ 'px', height: upx2px(image.height) +'px'}"></canvas>
		
		<button v-if="selected" @tap="save" class='save'>save</button>
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
	    ColorTransformFilter: '颜色变换滤波器',
	    Desaturate: '冲淡',
	    Dither: '抖动',
	    Edge: '边缘',
	    Emboss: '浮雕',
	    Enrich: '丰富',
	    Flip: '翻转',
	    Gamma: '伽马',
	    GrayScale: '灰度',
	    HSLAdjustment: 'HSL调节',
	    Invert: '反色',
	    Mosaic: '马赛克',
	    Oil: '油画',
	    OpacityFilter: '不透明度',
	    Posterize: '色调分离',
	    Rescale: '缩放',
	    Sepia: '褐色',
	    Sharpen: '锐化',
	    Solarize: '曝光',
	    Transpose: '调换',
	    Twril: '水波旋转'
	}
	
	const keys = Object.keys(filters);
	
	const picker_items = Object.values(filter_obj);
	
	export default {
		data() {
			return {
				selected: 0,
				picker_items: [],
				index: 0,
				gap: 0,
				
				image: {
					width: 610.6,
					height: 610.6
				},
			}
		},
		onLoad() {
			this.picker_items = picker_items;
		},
		methods: {
			bindPickerChange(e) {
				const z = this
				let index = e.detail.value
				this.index = index;
				
				uni.showLoading({
				    title: '正在加载...',
				    mask: true
				})
				let startTime = (new Date()).getTime()
				let imageData = helper.createImageData()
				let filtered = filters[keys[index]](imageData)
				
				helper.putImageData(filtered, () => {
				    uni.hideLoading()
				
				    let endTime = (new Date()).getTime()
				    let gap = (endTime - startTime)
					z.gap = gap;
				    
				})
			},
			choose() {
			    const z = this
			    uni.chooseImage({
			        count: 1,
			        success: function (res) {
			            if (res.tempFilePaths.length) {
			                let path = res.tempFilePaths[0]
			
			                uni.getImageInfo({
			                	src: path,
			                	success: (image)=> {
									console.log(image);
			                		z.image.height = z.image.width * image.height / image.width;
			                		helper = new Helper({
			                		    canvasId: 'hehe',
			                		    width: z.upx2px(z.image.width),
			                		    height: z.upx2px(z.image.height)
			                		})
			                		helper.initCanvas(path, () => {
			                		    z.selected = 1
			                		})
			                	    
			                	}
			                })
							
			            }
			        },
			    })
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
	/* pages/index/index.wxss */
	.wrap {
	    height: 300rpx;
	}
	
	.picker-wrap {
	    width: 750rpx;
	    height: 88rpx;
	}
	
	.picker-wrap picker {
	    width: 100%;
	    height: 88rpx;
	    border-bottom: 2rpx solid #ddd;
	    display: flex;
	    align-items: center;
	    padding-left: 30rpx;
	    font-size: 30rpx;
	    background: #eee;
	}
	
	.picker {
	    width: 750rpx;
	    text-align: center;
	}
	
	.time {
	    width: 750rpx;
	    height: 88rpx;
	    line-height: 88rpx;
	    text-align: center;
	    font-size: 30rpx;
	}
	
	.save {
	    margin-top: 30rpx;
	}
</style>
