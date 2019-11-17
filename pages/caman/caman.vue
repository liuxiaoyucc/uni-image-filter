<template>
	<view>
		<view class='wrap'>
		    <button @tap="choose">choose image</button>
		    
		    
		    <view class='time' v-if="gap">Processing time:{{gap}}ms</view>
		</view>
		<canvas style="width: 300px; height: 400px; background-color: #2C405A;" canvas-id="firstCanvas"></canvas>
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
			        success:  (res)=> {
			            if (res.tempFilePaths.length) {
			                let image_path = res.tempFilePaths[0];
							this.init_canvas(image_path);
			            }
			        },
			    })
			},
			init_canvas(image_path) {
				var context = uni.createCanvasContext('firstCanvas');
				
				
				context.drawImage(image_path, 0, 0, 300, 400);//上
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
