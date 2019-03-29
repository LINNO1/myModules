/*版本3 照片墙*/


function Waterfall_v3(ct,num){
   console.log('LLL')
   this.initFram(ct);
   this.init(num);
   this.lazyLoad();


 }

 
 Waterfall_v3.prototype.init=function(num){
   
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

 Waterfall_v3.prototype.initFram=function(ct){
   this.$ct = ct;
   var html='<ul id="pic-ct" class="clearfix">';
       html+='<li class="item hide">我看不见，用于第一次计算高度</li></ul>'; 
       html+='<div id="load">我是看不见的，用来懒加载定位</div>';
    this.$ct.append(html);
 }
   

  Waterfall_v3.prototype.lazyLoad=function(){
   
      if(this.isShow()){  //如果滚到底部，则向后台要数据
    
        this.getImg();
      }
   }


  
   //判断该节点是否出现的屏幕上
  Waterfall_v3.prototype.isShow=function(){
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
   

//要图片的地址
  Waterfall_v3.prototype.getImg=function(){
      var height,width,url=[];
      for(var i=0;i<this.num;i++){
                  
          width=200;
          height=Math.floor(Math.random()*100+50);
          url.push("http://lorempixel.com/" + width + "/" + height + "/" );

      }
        this.loadImg(url);

  },

    Waterfall_v3.prototype.loadImg=function(url){
    //获得图片的地址
         var imgs= url;
         var _this =this;
         
    
    for(var i=0;i<imgs.length;i++){
         //根据地址生成图片
          var img = new Image();
          img.src = imgs[i]; 
         
   
          img.onload=function(){
          
            var imgsInfo = {
                  target: this,
                  width:  this.width,
                  height: this.height
                 
                 }

           _this.render(imgsInfo);

}
      
     }
   }

Waterfall_v3.prototype.render=function(img){
        var $node= $('<li class="item"></li>');
           $node.append($(img.target));
          this.$picct.append($node);//则放到页面上
          this.waterFallPlace($node); //瀑布流布局,用绝对定位
        
          }
       





//瀑布流
     Waterfall_v3.prototype.waterFallPlace=function($node){
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
     /*console.log($node.outerHeight(true));*/

    }






/*//封装1 使用
    new Waterfall_v3($('.ct-waterfall'),50)
    $(window).on('scroll',function(){
      new Waterfall_v3($('.ct-waterfall'),50)
    });
     //当屏幕大小改变时，重新调整
    $(window).resize(function(){
        new Waterfall_v3($('.ct-waterfall'),50)
    })*/

//二次封装，立即执行函数
 var Waterfall=(function(){
   return{
      init: function($ct,num){
        $ct.each(function(index,node){
            new Waterfall_v3($ct,num)
        })
      }
   }

 })();

 Waterfall.init($('.ct-waterfall'),50);