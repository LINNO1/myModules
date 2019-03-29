 
/*
  一个轮播的组件
  功能：可以左右播放图片，也可以按下面的按键看图片
  使用：

    MyCarousel.start($('容器的class'),图片URL数组)

    比如： MyCarousel.start($('.carousel'),imgUrlArr)
*/
 function Carousel($carousel,imgUrlArr){
       this.$carousel = $carousel;
       this.createHtml(imgUrlArr);
       this.init($carousel);
       this.bind();

   }


  Carousel.prototype={
    init: function(){
              
              this.$imgct = $(this.$carousel.find('.img-ct'));
              this.$imgs = $(this.$carousel.find('.img-ct>li'));//是个jquery数组
              this.imgCount = this.$imgs.length;
              this.imgWidth = this.$imgs.width();
              this.curPage = 0;  // -1 0 1 2 3 4
              this.$leftBtn = $(this.$carousel.find('.arrow.pre'));
              this.$rightBtn = $(this.$carousel.find('.arrow.next'));
              this.$bullet = $(this.$carousel.find('.bullet>li'));
              this.isAnimate = false; //优化，状态所，判断动画是否切换完毕
              this.$imgct.append(this.$imgs.first().clone()); //first() last() 不是代表第几个孩子，而是同类中的第一个
              this.$imgct.prepend(this.$imgs.last().clone());
              this.$imgct.width(this.imgWidth*(this.imgCount+2));
              this.$imgct.css({left: -this.imgWidth+'px' });

              },
    bind: function(){
              var _this =this;
              this.$leftBtn.on('click',function(){
                   _this.playLeft(1)
               })
              this.$rightBtn.on('click',function(){
                   _this.playRight(1)
               })
              this.$bullet.on('click',function(){
                   var index = $(this).index();
                   console.log('index:',index);

                  if(index>_this.curPage){
                         console.log('index-curPage:',index-_this.curPage)
                         _this.playLeft(index-_this.curPage);

                  }else if(index<_this.curPage){
                         console.log('curPage-index:',_this.curPage-index)
                         _this.playRight(_this.curPage-index)
                  }
               })
             },
    playLeft: function(len){
              var _this =this;
              if(this.isAnimate){return}
              this.isAnimate=true;

              this.$imgct.animate({
                      left: '-='+_this.imgWidth*len+'px'
                },function(){
                
                      _this.curPage+=len;     
                      if(_this.curPage===_this.imgCount){
                            _this.curPage=0;
                            _this.$imgct.css({
                                 left: -_this.imgWidth+'px'
                             })
                       }
                      _this.setBullet();
                      _this.isAnimate = false;
              })
           },
    playRight: function(len){
               var _this =this;
               if(this.isAnimate){return}
               this.isAnimate=true;
               this.$imgct.animate({
                      left: '+='+_this.imgWidth*len+'px'
                  },function(){
                      _this.curPage-=len;     
                      if(_this.curPage<0){
                            _this.curPage=_this.imgCount-1;
                            _this.$imgct.css({
                                left: -_this.imgWidth*_this.imgCount+'px'
                             })
                        }
                      _this.setBullet();
                      _this.isAnimate = false;
                })
            },
    setBullet: function(){
                    console.log(this.curPage)
                    this.$bullet.removeClass('active').eq(this.curPage).addClass('active');
             },
    createHtml: function(imgUrlArr){
                    var html='';
                    html+='<ul class="img-ct clearfix">'
                    for(var i=0;i<imgUrlArr.length;i++){
                        html+='<li><a href="javascript:void(0)"><img src="'+imgUrlArr[i]+'"></a></li>';
                    }
                   
                    html+='</ul><a href="javascript:void(0)" class="pre arrow"><</a><a href="javascript:void(0)" class="next arrow">></a>';
                    html+='<ul class="bullet">';
                    for(var i=0;i<imgUrlArr.length;i++){
                      if(i===0){
                                html+='<li class="active"></li>'
                      }else{
                                html+='<li></li>';
                        }
                       
                      }
                       html+='</ul>';
                      this.$carousel.html(html);
                   }
                    
   
            
  }

	

	
/*new Carousel($('.carousel').eq(0),imgUrlArr)
new Carousel($('.carousel').eq(1),imgUrlArr1)*/

/*	setInterval(function(){playRight(1)},3000)*/

// 二次封装
var MyCarousel =(function(){
      return {
        start: function($node,imgUrlArr){
               $node.each(function(idx,ele){
                  new Carousel($(ele),imgUrlArr[idx])
               })
        }
      }
})();

//MyCarousel.start($('.carousel'),imgUrlArr)