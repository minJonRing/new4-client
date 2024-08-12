const CanvasMixin = {
    data: () => ({
        canvas: null,
        ctx: null,
        initScale: 0,
        imgScale: 0,
        currentImg: null,
        imgX: 0,
        imgY: 0,
        move: {
            initX: 0,
            initY: 0,
            x: 0,
            y: 0
        },
    }),
    mounted() {
        const canvas = document.querySelector(".canvas");
        const ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasEventsInit()
    },
    methods: {
        initCanvas(src = '') {
            if (!src) {
                const { width, height } = this.canvas;
                this.ctx.clearRect(0, 0, width, height);
                return
            }
            this.currentImg = new Image();
            this.currentImg.src = src;
            this.currentImg.onload = () => {
                // 图片加载完成后调用函数

                const { width: widthImg, height: heightImg } = this.currentImg;
                const { width, height } = this.canvas;
                // 计算宽高比,进行缩放,保证初始画面全部展现在画布上
                // 默认图片高度为0，需要默认的缩放比例 initScale;
                this.initScale = height / heightImg;
                this.imgScale = this.initScale;

                const currentWidth = widthImg * this.imgScale;
                const currentHeight = heightImg * this.imgScale;
                this.imgX = (width - currentWidth) / 2;
                this.imgY = (height - currentHeight) / 2;

                this.ctx.restore(); //恢复状态
                this.ctx.save(); //保存状态        
                this.drawImage();
                // canvasEventsInit()
            };
        },
        drawImage() {
            const { width, height } = this.canvas;
            const { width: widthImg, height: heightImg } = this.currentImg;
            const currentWidth = widthImg * this.imgScale;
            const currentHeight = heightImg * this.imgScale;
            this.ctx.clearRect(0, 0, width, height);
            this.ctx.drawImage(
                this.currentImg, //规定要使用的图像、画布或视频。
                0, 0, //开始剪切的 x 坐标位置。
                widthImg, heightImg, //被剪切图像的高度。
                this.imgX,
                this.imgY, //在画布上放置图像的 x 、y坐标位置。
                // 0, 0,
                currentWidth, currentHeight //要使用的图像的宽度、高度
            );
        },
        canvasEventsInit() {
            //事件注册
            this.canvas.onmousedown = (event) => {
                var pos = windowToCanvas(event.clientX, event.clientY);
                //坐标转换，将窗口坐标转换成canvas的坐标 
                this.canvas.onmousemove = (evt) => { //移动
                    this.canvas.style.cursor = 'pointer';
                    var posl = windowToCanvas(evt.clientX, evt.clientY);
                    var x = posl.x - pos.x;
                    var y = posl.y - pos.y;
                    pos = posl;
                    this.imgX = this.imgX + x;
                    this.imgY = this.imgY + y;
                    this.drawImage(); //重新绘制图片
                };
                this.canvas.onmouseup = () => {
                    this.canvas.onmousemove = null;
                    this.canvas.onmouseup = null;
                    this.canvas.style.cursor = 'default';
                };
            };
            this.canvas.onmousewheel = this.canvas.onwheel = (event) => { //滚轮放大缩小
                event.preventDefault()
                var { x, y } = windowToCanvas(event.clientX, event.clientY);
                const wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltalY * (-40)); //获取当前鼠标的滚动情况
                if (wheelDelta > 0) {
                    // if (this.imgScale < 2) {
                    this.imgScale *= 2;
                    this.imgX = this.imgX * 2 - x;
                    this.imgY = this.imgY * 2 - y;
                    // }
                } else {
                    if (this.imgScale > 0.6) {
                        this.imgScale /= 2;
                        this.imgX = this.imgX * 0.5 + x * 0.5;
                        this.imgY = this.imgY * 0.5 + y * 0.5;
                    }
                }
                this.drawImage(); //重新绘制图片
            };
            // 双击回复原状态
            this.canvas.ondblclick = this.canvas.ondblclick = (event) => {
                initCanvas();
                drawImage(); //重新绘制图片
            }
            /*坐标转换*/
            const windowToCanvas = (x, y) => {
                var { top, left } = this.canvas.getBoundingClientRect(); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离
                return {
                    x: x - left,
                    y: y - top
                };
            }
        }
    },
}
export default CanvasMixin
