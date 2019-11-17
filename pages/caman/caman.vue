<template>
	<view>
		<view class='wrap'>
			<button @tap="choose">choose image</button>


			<view class='time' v-if="gap">Processing time:{{gap}}ms</view>
		</view>
		<canvas style="width: 300px; height: 400px; background-color: #2C405A;" canvas-id="firstCanvas"></canvas>




		<view class='wrap'>
			<slider value="50" @change="sliderChange" activeColor="#FFCC33" backgroundColor="#000000" block-color="#8A6DE9"
			 block-size="20" />
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
			init_canvas(image_path) {
				var context = uni.createCanvasContext('firstCanvas');


				context.drawImage(image_path, 0, 0, 300, 400); //上
				context.draw(false, function() {
					new WxCaman('firstCanvas', 300, 400, function() {
						this.vintage(false)
						this.render()
					})
				})
			},
		}
	}
</script>

<style>

</style>
