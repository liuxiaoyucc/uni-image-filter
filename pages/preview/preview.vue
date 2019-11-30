<template>
	<view style="width: 750upx;">
		<view style="width: 750upx;display:flex; flex-direction: column; align-items: center;justify-content: center;">
			<image class="preview" :src="image_src" mode="widthFix"></image>
			
		</view>
		<view style="width: 750upx;display:flex; flex-direction: column;align-items: center;">
			<image @tap="start" class="start" :src="'../../static/' + from + '.png'" mode="widthFix"></image>
			<image class="item" src="/static/change.png" mode="widthFix"></image>
			<image @tap="save" class="item" src="/static/save.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				from: "",
				image_src: '/static/test.jpg',
			}
		},
		onLoad(options) {
			console.log(options);
			this.from = options.from
			if (options.image_src) {
				this.image_src = options.image_src
			}
		},
		methods: {
			start() {
				if (!this.image_src) {
					this.$helper.toast('none', '请先选择图片', 2000, false, 'bottom');
					return;
				}
				this.$helper.to('../'+this.from+'/'+this.from + '?from='+this.from+'&image_src=' + encodeURIComponent(this.image_src))
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
.preview {
	width: 750upx;
}
.item {
	width: 300upx;
}
</style>
