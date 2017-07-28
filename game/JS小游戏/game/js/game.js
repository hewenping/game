//代表游戏对象	
var game = {
    //游戏背景dom
    gamePanel: null,
    //持续时间
    durationTime: 0,
    //是否活着
    isAlive: false,
    //障碍物列表
    block: null,
    //方块列表
    blockList: [],
    //分数
    score: 0,
    //生命
    life: 10,
    //游戏是否结束
    isGameOver: false,
    mouseX: 0,
    mouseY: 0,
    //开始游戏
    startGame: function() {
        var _this = this;
        this.initGameData();
        this.setTime();

        this.gamePanel.onmousemove = function(e) {
			_this.setPos(_this.mousePos(e));
        };

        this.startBlocks();
    },

    //初始化游戏数据
    initGameData: function() {
        this.gamePanel = document.getElementById("panel");
        this.isGameOver = false;
        this.gamePanel.style.cursor = "crosshair";
        this.life = 10;
        this.score = 0;
        document.getElementById("life").innerHTML = this.life;
        document.getElementById("score").innerHTML = this.score;
        document.getElementById("help").style.display = "none";
    },

    //启动方块
    startBlocks: function() {
        if (this.isGameOver)
            return false;

        var _this = this;
        var block = new Block(this.gamePanel);
        this.gamePanel.appendChild(block.dom);
        var randomX = parseInt(590 * Math.random());
        block.setPos(randomX + 8, 0);

        block.calLife = function() {
            if (_this.life <= 0) {
                _this.isGameOver = true;
                document.getElementById("msg").style.display = "block";

                setTimeout(function() {
                    //document.getElementById("start").style.display = "block";
                    _this.gamePanel = null;
                    document.getElementById("msg").style.display = "none";
                }, 2000);


                return false;
            }
            _this.life -= 1;

            document.getElementById("life").innerHTML = _this.life;
        };

        block.isCrash = function() {

            var b_height = block.dom.offsetTop + 4 - 50;
            var b_width = randomX;

            var r = Math.sqrt(Math.abs(_this.mouseX - b_width) * Math.abs(_this.mouseX - b_width) + Math.abs(_this.mouseY - b_height) * Math.abs(_this.mouseY - b_height));

            //判断是否在鼠标半径20像素内
            if (r <= 20) {
                _this.calScore();

                return true;
            }
        };

        block.onEnd = function() {
            _this.gamePanel.removeChild(this.dom);
            _this.blockList.pop(this);
        }; ;

        block.animation();
        _this.blockList.push(block);

        setTimeout(function() { _this.startBlocks(); }, 400);
    },

    //计算得分
    calScore: function() {
        if (!this.isGameOver) {
            this.score += 100;
            document.getElementById("score").innerHTML = this.score;
        }
    },

    //返回鼠标位置
    mousePos: function(e) {
        if (this.isGameOver)
            return false;
        e = e || window.event;
        x = e.clientX - (document.body.clientWidth - 600) / 2 - 8;
        y = e.clientY - (document.body.clientHeight - 450) / 2 - 50;
        this.mouseX = x;
        this.mouseY = y;
        return x + ":" + y;
    },

    //设置鼠标位置
    setPos: function(v) {
		//游戏界面动态显示鼠标位置
        document.getElementById("pos").innerHTML = v;
    },

    //设置持续时间
    setTime: function() {
        var _this = this;
        this.durationTime += 1;
        document.getElementById("time").innerHTML = this.durationTime;

        if (this.durationTime > 0 && !_this.isGameOver) {
            setTimeout(function() { _this.setTime() }, 1000);
        }
    },

    //监听键盘事件
    listenKey: function(e) {
        e = e || window.event;
        var keyCode = e.keyCode;

        if (keyCode == 32) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        }
    }
}

function start() {
	//启动游戏
    game.startGame();
	//获得id为start的DOM对象,改变其样式为隐藏
    document.getElementById("start").style.display = "none";
}