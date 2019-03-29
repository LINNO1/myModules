 /*版本2 新闻业******************/
 function Waterfall_v2(ct,num){
  
   this.initFram(ct);
   this.init(num);
   this.lazyLoad();


 }

 
 Waterfall_v2.prototype.init=function(num){
   
    this.num =num;
    
    this.curPage=1;  //当前页
    //用于懒加载
    this.$load=$(this.$ct.find('#load'));
    //用于第一次计算高度
    this.$item=$(this.$ct.find('.item'));
    //存放图片容器
    this.$picct=$(this.$ct.find('#pic-ct'));
    //存放高度数组
    this.waterCol=[];
    this.itemWide=this.$item.outerWidth(true);  //计算隐藏的li的宽度
    var itemLength = parseInt(this.$ct.width()/this.itemWide);
    for(var i=0;i<itemLength;i++){
         this.waterCol[i]=0;
    }

 }

 Waterfall_v2.prototype.initFram=function(ct){
   this.$ct = ct;
   var html='<ul id="pic-ct" class="clearfix">';
       html+='<li class="item hide">我看不见，用于第一次计算高度</li></ul>'; 
       html+='<div id="load">我是看不见的，用来懒加载定位</div>';
    this.$ct.append(html);
 }
   

  Waterfall_v2.prototype.lazyLoad=function(){
    //console.log('111');
      if(this.isShow()){  //如果滚到底部，则向后台要数据
       // console.log('222');
        this.getNews();
      }
   }


  
   //判断该节点是否出现的屏幕上
  Waterfall_v2.prototype.isShow=function(){
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var offsetTop = this.$load.offset().top;
    var nodeHeight= this.$load.height();
    if(windowHeight+scrollTop > offsetTop && scrollTop<offsetTop+nodeHeight){
      console.log('true');
      return true;
    }
      return false;
 }
   

//ajax 向后台发送参数
    Waterfall_v2.prototype.getNews=function(){
      var _this=this;
     // console.log('要数据、、、');
       $.ajax({
          //用到数据接口，注意参数不能错，否则没有数据回来
          //jsonp 接口参数： http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
          url: 'http://platform.sina.com.cn/slide/album_tech',
          dataType: 'jsonp',
          jsonp: "jsoncallback",
          data: {
            app_key: "1271687855",
            num: _this.num,
            page: _this.curPage
          }
        }).done(function(ret){   //要来的数据在ret之中，注意数据的格式
          if(ret&&ret.status && ret.status.code==='0'){  //如果数据要来了
            _this.getData(ret.data); //取数据，其中ret.data存放的数据数组
          }
        });     
    }

  //瀑布流,要有一个数组来存放当前的高度,data是个数组
 /* data:[
  { id:  ,"sid": ,},
  {},
  {}

  ]*/
  //取出数据中需要的部分，以瀑布流的形式放在页面上
     Waterfall_v2.prototype.getData=function(dataList){
      var _this = this;
      //dataList是数组，news是数组中的每个元素
      $.each(dataList,function(idx,news){
         var $node = _this.getNode(news);  //拼接成HTML，返回jquery对象
         $node.find('img').load(function(){ //如果数据中的图片加载完毕，则放到页面上
          _this.$picct.append($node);//则放到页面上
          _this.waterFallPlace($node); //瀑布流布局,用绝对定位
          _this.curPage++;

         })
        
      })
    }

//  { id:  ,"sid": ,   }拼接HTML
     Waterfall_v2.prototype.getNode=function(news){
      console.log(news)
     var html= '<li class="item">';
         html+='<a href="#">';
         html+='<img src='+news.img_url+'>';
         html+= '<h2>'+news.short_name+'</h2>'
         html+= '<p>'+news.name+'</p>'
         html+= '</a></li>'
     return $(html);
    }
//瀑布流
     Waterfall_v2.prototype.waterFallPlace=function($node){
       var minIndex=0;
       var minLength=this.waterCol[0];
       for(let i=0;i<this.waterCol.length;i++){
           if(minLength>this.waterCol[i]){
               minIndex=i;
               minLength=this.waterCol[i];
         }
      }
      $node.css({
          top: minLength,
          left: minIndex*this.itemWide
       });
     this.waterCol[minIndex]+=$node.outerHeight(true);
     this.$picct.height(Math.max.apply(null,this.waterCol));

    }






/*//封装1 使用
    new Waterfall_v2($('.ct-waterfall'),50)
    $(window).on('scroll',function(){
      new Waterfall_v2($('.ct-waterfall'),50)
    });
     //当屏幕大小改变时，重新调整
    $(window).resize(function(){
        new Waterfall_v2($('.ct-waterfall'),50)
    })*/

//二次封装，立即执行函数
 var Waterfall=(function(){
   return{
      init: function($ct,num){
        $ct.each(function(index,node){
            new Waterfall_v2($(node),num)
        })
      }
   }

 })();

 Waterfall.init($('.ct-waterfall'),50);