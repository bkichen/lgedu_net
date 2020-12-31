(function(){
    /*轮播时间*/
    var s = 5;
    s = s*1000;

    var bannerBox = document.querySelector('.banner');
    var list = document.querySelector('.banner .list');
    var item = document.querySelectorAll('.banner .list li');
    var listIndex = document.querySelectorAll('.banner .listIndex li');
    var timer;
    var length = item.length;
    var x = 0;
    list.innerHTML = item[length-1].outerHTML+list.innerHTML;
    listIndex[0].classList.add('active');
    /*
     * 自动播放函数
     * */
    var autoSlider =function (){
        var y = x;
        x++;
        if (x>=item.length) {
            list.classList.remove('active');
            list.style.left = 0;
            list.offsetWidth; //强制浏览器reflow
            list.classList.add('active');
            x = 0;
            slider(y,x);
        } else {
            slider(y,x);
        }
    };
    /*
     * 轮播图位置改变函数
     * */
    var slider = function (m,n){
        listIndex[m].classList.remove('active');
        listIndex[n].classList.add('active');
        list.style.left = -(n+1)*100 +'%';
    };

    /*
     * 鼠标进入时清除定时器，鼠标离开时启动定时器
     * */
    bannerBox.onmouseenter = function(){
        clearInterval(timer);
    };
    bannerBox.onmouseleave = function(){
        timer = setInterval(autoSlider,s);
    };
    /*
     * 给每个下标索引加一个鼠标事件
     * */
    for (var i = 0; i < item.length; i++){
        listIndex[i].index = i;
        listIndex[i].onclick = function(){
            if (this.index != x) {
                slider(x,this.index);
                x = this.index;
            }
        };
    }
    timer = setInterval(autoSlider,s);
}());