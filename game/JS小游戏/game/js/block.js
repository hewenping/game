//方块
function Block(gamePanel) {
    this.gamePanel = gamePanel;
    this.dom = null;
    this.init();
}

Block.prototype = {
    //游戏背景DOM
    gamePanel: null,
    //移动速度
    speed: 1,
    //移动频率
    freq: 5,

    init: function() {
        this.dom = document.createElement("div");
        this.dom.className = "block";
    },

    //设置位置
    setPos: function(x, y) {
        this.dom.style.left = x + (document.body.clientWidth - 600) / 2 + "px";
        this.dom.style.top = y + 50 + "px";
    },

    //移除方块
    removeBlock: function() {
        this.gamePanel.removeChild(this.dom);
    },

    animation: function() {
        var _this = this;
        //处理移动函数
        var process = function() {
            var left = _this.dom.offsetLeft - ((document.width - 600) / 2);
            var top = _this.dom.offsetTop;

            top = top + _this.speed;
            _this.dom.style.top = top + 'px';

            //判断是否移动到尽头
            if (top <= 500 - 8 && !_this.isCrash()) {
                setTimeout(process, _this.freq);
            }
            //移出底部
            else if (top > 500 - 8) {
                _this.calLife();
                _this.onEnd();
            }
            else {
                //_this.removeBlock(_this.dom);
                _this.onEnd();
            }

        }

        process();
    },

    //是否碰撞
    isCrash: function() { },
    //结束方块生命
    onEnd: function() { },
    //计算生命
    calLife: function() { }
}