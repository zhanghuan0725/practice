// attr要执行动画的样式,比如:top,left,width,height
        // speed速度(正数向右移动,负数向左移动)
        // target执行动画的目标位置
        // callback回调函数,将会在动画执行完毕以后执行
        // 创建一个可以执行简单动画的函数
        function move(obj,attr,target,speed,callback){
            clearInterval(obj.timer);
            // 获取元素目前的位置
            var current = parseInt(getStyle(obj,attr));
            // 判断速度正负值
            if(current > target){
                speed = -speed;
            }

                // 开启一个定时器,用来执行动画效果
            obj.timer = setInterval(function() {
                    // 获取box1原来的left值
                var oldValue = parseInt(getStyle(obj,attr));
                //    在自增的基础上增加
                var newValue = oldValue + speed;
                    // 判断newValue是否大于800
                    // 向左移动判断newValue是否小于target
                    // 向右移动时,判断newValue是否大于target
                if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
                        newValue = target;
                }
                // 将新值设置给box1
                obj.style[attr] = newValue + "px"; 
                    // 当元素移动到800px时,使其停止执行动画
                if(newValue == target){
                    clearInterval(obj.timer);
                    // 动画执行完毕,调用回调函数
                    callback && callback();
                }                   
            }, 30);
        };

       
        function getStyle(obj,name){
            if(window.getComputedStyle){

            
            // 正常浏览器的方式
                return getComputedStyle(obj,null)[name];
            }else{

            
            // IE8的方式
                return obj.currentStyle[name];
             }
            }
            // 定义一个函数,用来向一个元素中添加指定的class属性值
        // 参数:obj 要添加class属性的元素
        //     cn 要添加class值
        function addClass(obj,cn){
            // 检查obj中是否含有cn
            if(!hasClass(obj,cn)){
                obj.className += " "+cn;

            };      
            
        }
        // 判断一个元素中是否含有指定的class属性值,如果有返回true,没有,返回false
        function hasClass(obj, cn){
            

            // 正则表达式
            // var reg = /\bb2\b/;
            var reg = new RegExp("\\b"+cn+"\\b");
            // alert(reg);
            return reg.test(obj.className);

        }
        // 删除一个元素中的指定的class属性
        function removeClass(obj,cn){
            var reg = new RegExp("\\b"+cn+"\\b");
            obj.className = obj.className.replace(reg,"");

        }
        // 切换一个类,有删除,没有添加
        function toggleClass(obj,cn){
            if(hasClass(obj,cn)){
                removeClass(obj,cn);
            }else{
                addClass(obj,cn);
            }

        }