<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			uni.getSystemInfo({
				success: function (res) {
				    console.log(res);
				}
			})
			console.log(plus.runtime);
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
