## 像素级旋转遇到的问题




canvasGetImageData获取像素点后即使不经任何处理再使用canvasPutImageData绘制后,图片清晰度变差

**方案一**
1. 将canvas放入scroll-view中 :heavy_check_mark:
2. 隐藏掉scroll-view :heavy_check_mark: (fixed到屏幕外)
3. 正常绘制及取像素组 :black_square_button:
4. 获取图片路径并使用image标签缩放显示 :heavy_check_mark:(canvasToTempFilePath速度太慢需要缓存一下)

**方案二**
在方案一的基础上优化,解决了每次生成临时路径及canvasToTempFilePath效率低下问题
1. 使用css旋转并预览 :heavy_check_mark: 
2. 有其他操作时,再使用canvas绘制 :heavy_check_mark: (按需绘制,速度大大提高)

**问题**
1. 滤镜效果需要实时看到,所以需要每次点击滤镜后生成新图片,替换预览图,但是预览图可能旋转过角度,所以会导致显示异常,图片方向错误