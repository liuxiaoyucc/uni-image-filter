const ImageFilters = require('./weImageFilters.js')

let Helper = function(options) {
    /**
     * options{canvasId, width, height}
     */
    this.originalImageData = null
    this.canvasInfo = {
        canvasId: options.canvasId,
        width: options.width,
        height: options.height
    }
}

// 保存当前的画布像素信息到 originalImageData
Helper.prototype.saveImageData = function(cb) {
	
    const z = this

    // 获取canvas像素数据
    wx.canvasGetImageData({
        canvasId: z.canvasInfo.canvasId,
        x: 0,
        y: 0,
        width: z.canvasInfo.width,
        height: z.canvasInfo.height,
        success: res => {
            // console.log(res)
            let {
                data
            } = res

            z.originalImageData = data
            if (cb) {
                cb()
            }
        }
    })
}

// 初始化画布内容
Helper.prototype.initCanvas = function(tempFilePath, cb) {
    const z = this
    const ctx = wx.createCanvasContext(z.canvasInfo.canvasId)
	// ctx.scale(0.5, 0.5)
    ctx.drawImage(tempFilePath, 0, 0, z.canvasInfo.width, z.canvasInfo.height)
    ctx.draw(false, () => {
        console.log('draw done')
        z.saveImageData(cb)
    })
}

// 更新canvas信息
Helper.prototype.updateCanvasInfo = function (options) {
    if (options.canvasId) {
        this.canvasInfo.canvasId = options.canvasId
    }
    if (options.width) {
        this.canvasInfo.width = options.width
    }
    if (options.height) {
        this.canvasInfo.height = options.height
    }
    if (options.tempFilePath) {
        this.initCanvas(options.tempFilePath)
    }
}

// 从originalImageData创建 imageData
Helper.prototype.createImageData = function() {
    const z = this
    return ImageFilters.utils.createImageDataFromData(z.originalImageData, z.canvasInfo.width, z.canvasInfo.height)
}

Helper.prototype.putImageData = function(imageData, cb) {
    const z = this
	console.log(imageData.data.length);
	console.log(z.canvasInfo);
    // 将像素数据绘制到画布
    wx.canvasPutImageData({
        canvasId: z.canvasInfo.canvasId,
        data: imageData.data,
        x: 0,
        y: 0,
        width: z.canvasInfo.width,
        height: z.canvasInfo.height,
		// height: z.canvasInfo.width,
        complete: res => {
            if (cb) {
                cb()
            }
        }
    })
}

Helper.prototype.getImageTempFilePath = function (cb) {
    const z = this
    // 将画布内容保存为图片
    wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: z.canvasInfo.width,
        height: z.canvasInfo.height,
        // destWidth: z.canvasInfo.width,
        // destHeight: z.canvasInfo.height,
        canvasId: z.canvasInfo.canvasId,
        success: function (res) {
            cb(res.tempFilePath)
        }
    })
}


//下面是扩展的功能
Helper.prototype.rotateCanvas = function () {
	console.log(this.canvasInfo);
	return;
	const z = this
	const canvas = wx.createCanvasContext(z.canvasInfo.canvasId)
	console.log(canvas);
	let init_rotate = 0;
	let width = z.canvasInfo.width;
	let height = z.canvasInfo.height;
	/**
	 * translate: 
	 * 0 || 360: 
	 * 90度: (宽, 0) 顶部朝向右侧
	 * 180度 || -180度: (长, 宽)
	 * -90度 || 270度: (0, 高) 顶部朝向左侧
	 */
	canvas.translate(z.canvasInfo.width, 0);
	canvas.rotate(90 * Math.PI / 180);
	canvas.drawImage(z.originalImageData, 0, 0, z.canvasInfo.height, z.canvasInfo.width);
	
	canvas.draw()
	z.saveImageData();
	
}

module.exports = Helper