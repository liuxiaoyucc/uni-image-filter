<template>
	<view>
		<view style="width: 750upx;display:flex; flex-direction: column; align-items: center;justify-content: center;">
			<view class="status_bar"></view>
			<image class="preview" :src="image_src" mode="widthFix"></image>

		</view>
		<view style="width: 750upx;display:flex; flex-direction: column;align-items: center;position: fixed;bottom: 0;">
			<!-- <image @tap="start" class="start" :src="'../../static/' + from + '.png'" mode="widthFix"></image> -->
			<view class="main-item">
				<image @tap="to_continue" class="item" src="/static/continue.png" mode="widthFix"></image>
				<view style="width: 4upx;height: 50upx;background-color: gold;"></view>
				<image @tap="home" class="item" src="/static/home.png" mode="widthFix"></image>
				<view style="width: 4upx;height: 50upx;background-color: gold;"></view>
				<image @tap="save" class="item" src="/static/save.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				from: "",
				image_src: "",
			}
		},
		onLoad(options) {
			
			console.log(options);
			this.from = options.from
			if (options.image_src) {
				this.image_src = decodeURIComponent(options.image_src)
				console.log(this.image_src);
			}
		},
		methods: {
			home() {
				try{
					this.$helper.relaunch('../../pages/index/index')
				}catch(e){
					console.log(e);
				}
			},
			to_continue() {
				if (!this.image_src) {
					this.$helper.toast('none', '请先选择图片', 2000, false, 'bottom');
					return;
				}
				this.$helper.to('../' + this.from + '/' + this.from + '?from=' + this.from + '&image_src=' + encodeURIComponent(this.image_src))
			},
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: this.image_src,
					success: res => {
						this.$helper.toast('success', '保存成功');
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.preview {
		width: 750upx;
	}

	.main-item {
		width: 750upx;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, .8);
	}

	.item {
		/* background-color: #007AFF; */
		margin-top: 20upx;
	}
</style>
