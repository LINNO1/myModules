/*描述： 木桶布局组件
  实现图片的木桶布局，图片从 Http://lorempixel.com/200/300 来
  使用方式：  


  var obj = new Barrel($('容器'),[一次性获得图片的数目],[基准高度])
  obj.getImag([要图片的数目])
  比如：
   var bb =new Barrel($('.barrel'),25,200)
   bb.getImag(2); 

*/


/*思路:
      木桶布局 用浮动
       1. 元素浮动，如果放不下，会自动到下一行
       2. 定义一个数组，用来存一行图片的宽度，当这行图片宽度之和大于容器宽度
        说明这行放不下了，放下一行；然后这行的图片进行整体的拉伸，撑满一行

  */

//三个参数 容器 每次加载图片的数目 基准高度
function Barrel($barrel,imgnum,baseHeight){
         this.$barrel=$barrel;
         this.$barrel.addClass('barrel')
         this.init(imgnum,baseHeight);
    }

Barrel.prototype={
    init: function(imgnum,baseHeight){
            this.imgnum=25||imgnum;
            this.baseHeight=200||baseHeight;
            
            this.baseHeight=baseHeight;
            this.sumWidth=0;
            this.rowNodeArray=[];
            this.ctWidth=this.$barrel.width();
            this.isImagDone = true; //避免数据未到，用户多次点击

      },

    getImag: function(num){
        if(num){
             this.num=num;
         }
           
            if(!this.isImagDone) {return}
            this.isImagDone=false;
          var imgArray=[]
          var _this=this;
          for(var i=0;i<this.num;i++){
               var width = parseInt(Math.random()*250+150);//高度为150~450px
               var height=parseInt(Math.random()*250+150);    
               var imgUrl = 'Http://lorempixel.com/'+width+'/'+height;          
               var img = new Image();
               img.src = imgUrl;

              img.onload = function(){
                 var imgObj = {
                     $imgNode: this,
                     imgHeight: _this.baseHeight,  
                     imgWidth: _this.baseHeight*this.width/this.height
                }
                 _this.renderBarrel(imgObj); //改为单个图片的处理
                 _this.isImagDone=true;
              }
           }  
   
  },
  renderBarrel: function(imgObj){
           if(this.sumWidth+imgObj.imgWidth>this.ctWidth){
                 var newHeight =this.ctWidth*this.baseHeight/this.sumWidth;
                 this.renderImag(this.rowNodeArray,newHeight);
                 this.sumWidth =imgObj.imgWidth;
                 this.rowNodeArray=[imgObj];
              }else{
                this.rowNodeArray.push(imgObj);
                this.sumWidth += imgObj.imgWidth;
              }
  },
  renderImag: function(imgNode,newHeight){
            var $rowct = $('<div class="img-ct"></div>');
      
           imgNode.forEach(function(ele,idx){
                 var newWidth = ele.imgWidth/ele.imgHeight*newHeight;             
                   $(ele.$imgNode).height(newHeight);
                   $(ele.$imgNode).width(newWidth);
                  var $imgct = $('<div class="img-box"></div>');
                   $imgct.append(ele.$imgNode)
                   $rowct.append($imgct);
           })
            this.$barrel.append($rowct);
  }
}

   var MyBarrel=(function(){
         return {
           start: function($ct,num,width){
                   $ct.each(function(idx,ele){
                          return new Barrel($(ele),num, width)
                   })
           }
         }
        
     })()
