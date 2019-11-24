<template>
	<view>
		
		<view v-for="(item, index) in result_matrix" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// matrix: [
				// 	[1,2,3],
				// 	[4,5,6],
				// 	[7,8,9],
				// 	[10,11,12]
				// ],
				result_matrix: [],
				// matrix: [1 ,2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
				matrix: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
			}
		},
		onLoad() {
			console.log(this.matrix);
			setTimeout(()=> {
				this.rotate_matrix();
			}, 300);
		},
		methods: {
			rotate_matrix() {
				
				let arr = [];
				for (var i = 1; i <= 48; i++) {
					arr.push(i);
				}
				console.log(arr);
				
				let matrix = this.matrix;
				let new_matrix = [];
				let width = 3;
				let height = 4;
				let srcPixels = matrix;
				let dstPixels = [];
				let a_index,b_index;
				try{
					for(let i = 0; i < height; i++){
					    for(let j = 0; j < width; j++){
							
							
							a_index = (i * width + j) << 2;
							
							b_index = ((height - i - 1) + height * j) << 2;
							console.log(b_index);
					        // new_matrix[j][i] = matrix[matrix.length - 1 - i][j]
							// new_matrix[i] = matrix[]
							dstPixels[b_index + 0] = srcPixels[a_index + 0];
							dstPixels[b_index + 1] = srcPixels[a_index + 1];
							dstPixels[b_index + 2] = srcPixels[a_index + 2];
							dstPixels[b_index + 3] = srcPixels[a_index + 3];
					    }
					}
					console.log(dstPixels);
					
				}catch(e){
					console.log(e);
				}
				
				this.result_matrix = new_matrix;
			},
			
			rotate_matrix2() {
				
				let srcPixels = [1 ,2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24, 25, 26]
				let width = 3;
				let height = 2;
				console.log(new Uint8ClampedArray(4 * width * height));
				// return;
				let srcIndex, dstIndex;
				let dstPixels = [];
				
				let b_index_rule = [4, 12, 20, 0, 8, 16];
				let t = 0;
				try{
					for (var i = 0; i < height; i++) {
						for (var j = 0; j < width; j++) {
							srcIndex = (i * width + j) << 2;
							// dstIndex = ((height - i - 1) * width + j) << 2;
							dstIndex = b_index_rule[t];
							console.log(t);
							t++;
							// console.log(srcIndex);
							// console.log(dstIndex);
							dstPixels[dstIndex + 0] = srcPixels[srcIndex + 0];
							dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
							dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
							dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
						}
					}
					console.log(dstPixels);
				}catch(e){
					console.log(e);
				}
			}
			
			// for(int i=0;i<len;i++){  
			//     for(int j=0;j<len;j++){  
			//         b[j][len-1-i]=temp[i][j];  
			//     }  
			// }  
		}
	}
</script>

<style>

</style>
