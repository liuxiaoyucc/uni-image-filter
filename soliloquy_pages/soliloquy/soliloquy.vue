<template>
	<view class="page">
		
		<view v-for="(rbs, index) in rubbish" :key="index" style="margin: 30rpx 0;display: flex;flex-direction: column;justify-content: center;">
			<text :style="{fontSize: rbs.font_size + 'rpx', color: rbs.font_color}">{{rbs.content}}</text>
			<view class="line">
				<view style="width: 5rpx; height: 5rpx;" :style="{backgroundColor: rbs.font_color}"></view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-button">
				<!-- <text class="font-100 footer-text">+</text> -->
				<image class="image" src="../../static/1.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				rubbish: [
					{content: '生活又不是热血动漫，你也没有主角光环。', font_size: 30, font_color: '#B0E2FF', nickname: ''},
					{content: '我得到的都是侥幸，失去的都是人生。', font_size: 30, font_color: '#FF6A6A', nickname: ''},
					{content: '地点：南宁，一个人终究是没找到暑假工，还找家里拿了一千块，喜欢热血动漫的我，此刻的感觉是完完全全败给了现世生活。对这个现实社会实在感到很无力。希望毕业以后不像现在这样无力就好。', font_size: 30, font_color: '#DC143C', nickname: ''},
					{content: '生活总是起落落落落落落落落落起落落落落落落', font_size: 30, font_color: '#B8860B', nickname: '张三浪_ShAn'},
					{content: '生活总是起落落落落落落落落落起落落落落落落', font_size: 30, font_color: '#B8860B', nickname: '张三浪_ShAn'},
					{content: '生活总是起落落落落落落落落落起落落落落落落', font_size: 30, font_color: '#B8860B', nickname: '张三浪_ShAn'},
					{content: '生活总是起落落落落落落落落落起落落落落落落', font_size: 30, font_color: '#B8860B', nickname: '张三浪_ShAn'},
					{content: '生活总是起落落落落落落落落落起落落落落落落', font_size: 30, font_color: '#B8860B', nickname: '张三浪_ShAn'},
					{content: '一直怀念高中和同桌没被捅破的爱情，28岁还没谈过恋爱，父母到处为我安排相亲。一天，母亲电话说安排了一个相亲。 跑去看到女孩竟然就是高中同桌！我激动的脑子发热，开口就问：谈吗？女孩：谈！我又问：订婚？女孩：订！双方父母目瞪口呆,沉默了许久,相亲宴在4句话6个字后变成了订婚宴。', font_size: 30, font_color: '#B8860B', nickname: '张三浪_ShAn'},
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			
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
		padding: 0 20rpx;
	}
	.line {
		height: 5rpx;
		width: 710rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.font-30 {
		font-size: 30rpx;
	}
	.font-50 {
		font-size: 50rpx;
	}
	.font-100 {
		font-size: 100rpx;
	}
	.font-40 {
		font-size: 40rpx;
	}
	.FF6A6A {
		color: #FF6A6A;
	}
	.DC143C {
		color: #DC143C
	}
	.B0E2FF {
		color: #B0E2FF;
	}
	.B8860B {
		color: #B8860B;
	}
	.blue {
		color: #0000FF;
	}
	.green {
		color: #008000;
	}
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750rpx;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: flex-end;
		/* background-color: #4CD964; */
	}
	.footer-button {
		/* background-color: #F0AD4E; */
		display: flex;
		flex-direction: row;
		width: 140rpx;
		height: 100rpx;
		border-radius: 5rpx;
		justify-content: center;
		align-items: flex-end;
	}
	.footer-text {
		color: #FF0000;
		font-weight: bold;
	}
	.image {
		width: 100rpx;
		height: 100rpx;
	}
</style>
