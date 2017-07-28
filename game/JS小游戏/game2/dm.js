        (function() {
            var $ = function(id) {
                return document.getElementById(id);
            }

            $.bindEvent = function(obj, e, fun) {
                if (window.attachEvent) {
                    obj.attachEvent('on' + e, function() { fun.call(obj); });
                } else {
                    obj.addEventListener(e, fun, false);
                }
            };

            var game = {
                loop: null,
                objArr: [],
                pos: { x: 0, y: 0 },
                score: 0,
                isStart: false,
                isMouseIn: false,
                frames: 20,
                speed: 2,
                num: 50,
                init: function() {
                    this.frames = $('iptFrames').value;
                    this.speed = $('iptBallSpeed').value;
                    this.num = $('iptBallNum').value;
                    this.start();
                },
                //创建小球
                createObj: function(top, left, rgb) {
                    var obj = document.createElement('span');
                    var css = obj.style;
                    css.cssText = "position:absolute;width:2px;height:2px;overflow: hidden;";
                    css.top = top + 'px';
                    css.left = left + 'px';
                    css.background = rgb;
                    obj.x = left;
                    obj.y = top;
                    obj.dx = this.getRandom(-this.speed, this.speed);
                    obj.dy = this.getRandom(-this.speed, this.speed);
                    return obj;
                },
                //生成给定数量小球
                addIn: function() {
                    for (var i = 0; i < this.num; i++) {
                        var left = this.getRandom(5, 390);
                        var top = this.getRandom(5, 290);
                        var obj = this.createObj(top, left, "rgb(255,255,255)");
                        this.objArr.push(obj);
                        $('main').appendChild(obj);
                    }
                },
                getRandom: function(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                },
                //小球移动
                objMove: function(obj) {
                    if (obj.x >= 400 || obj.x <= 0) {
                        obj.dx = -obj.dx;
                    }
                    if (obj.y >= 300 || obj.y <= 0) {
                        obj.dy = -obj.dy;
                    }

                    obj.x += obj.dx;
                    obj.y += obj.dy;

                    if (this.checkImpact(obj)) {
                        this.end();
                    }

                    obj.style.left = obj.x + 'px';
                    obj.style.top = obj.y + 'px';
                },
                start: function() {
                    this.isStart = true;
                    $('lbM').innerHTML = '0';
                    this.addIn();
                    var _this = this;
                    this.loop = setInterval(function() {
                        if (_this.isMouseIn) {
                            $('lbM').innerHTML = (_this.score += 1);
                        }
                        for (var i = 0; i < _this.objArr.length; i++) {
                            _this.objMove(_this.objArr[i]);
                        }
                    }, _this.frames);
                },
                end: function() {
                    this.isStart = false;
                    this.isMouseIn = false;
                    clearInterval(this.loop);
                    this.objArr.length = 0;
                    $('main').innerHTML = '';
                    $('lbX').innerHTML = '0';
                    $('lbY').innerHTML = '0';
                },
                getMousePos: function(e) {
                    var e = e || window.event;
                    var x = e.clientX;
                    var y = e.clientY;
                    this.setPos(x, y);
                },
                setPos: function(x, y) {
                    this.pos.x = x;
                    this.pos.y = y;
                    $('lbX').innerHTML = x;
                    $('lbY').innerHTML = y;
                },
                //碰撞检测
                checkImpact: function(obj) {
                    if (this.isMouseIn) {
                        if (Math.abs(obj.x - this.pos.x) <= 4 && Math.abs(obj.y - this.pos.y) <= 4) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }

            onload = function() {
                $.bindEvent($('btnStart'), 'click', function() {
                    if (!game.isStart) {
                        game.init();
                    }
                });

                $.bindEvent($('btnEnd'), 'click', function() {
                    game.end();
                });

                $.bindEvent($('main'), 'mousemove', function(e) {
                    game.isMouseIn = true;
                    game.getMousePos(e);
                });

                $.bindEvent($('main'), 'mouseout', function(e) {
                    game.end();
                });
            }
        })();