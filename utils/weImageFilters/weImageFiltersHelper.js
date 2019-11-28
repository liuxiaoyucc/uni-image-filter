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
    this.ctx = uni.createCanvasContext(z.canvasInfo.canvasId)
	
    this.ctx.drawImage(tempFilePath, 0, 0, z.canvasInfo.width, z.canvasInfo.height)
    this.ctx.draw(false, () => {
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
			z.getImageTempFilePath((tempFilePath)=> {
				if (cb) {
				    cb(tempFilePath)
				}
			})
            
        }
    })
}



Helper.prototype.getImageTempFilePath = function (cb) {
    const z = this
    // 将画布内容保存为图片
    uni.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: z.canvasInfo.canvasId,
        success: function (res) {
            cb(res.tempFilePath)
        }
    })
}


//下面是扩展的功能
Helper.prototype.rotateCanvas = function (tempFilePath,angle, translate_x, translate_y, draw_width, draw_height, cb) {
	console.log(angle, translate_x, translate_y, draw_width, draw_height);
	this.ctx.translate(translate_x, translate_y);
	this.ctx.rotate(angle * Math.PI / 180);
	this.ctx.drawImage(tempFilePath, 0, 0, draw_width, draw_height);
	
	setTimeout(()=> {
		this.ctx.draw(false, ()=> {
			cb && cb();
		});
	}, 100);
}

module.exports = Helper