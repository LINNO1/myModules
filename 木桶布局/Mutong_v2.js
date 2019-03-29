function Barrel($ct,num){
	this.$ct = $ct;
	this.rowList =[];
	this.baseHeight=100;
	console.log(this);
	console.log('loading');
	this.loadImg(num);

}


Barrel.prototype = {
   loadImg: function(num){
   	//获得图片的地址
         var imgs= this.getImgUrl(num);
         var _this =this;
         	console.log('111');
         for(var i=0;i<imgs.length;i++){
         //根据地址生成图片
         	var img = new Image();
         	img.src = imgs[i];

         	console.log("i="+i);
         	img.onload = function(){
                console.log("ii="+i);
             //1*************************注意 这里不能用img 只能用this,否则图片显示不出来
                 var imgsInfo = {
                 	target: this,
                 	width:  _this.baseHeight*this.width/this.height,
                 	height: _this.baseHeight,
                 

                 	//img.width==0  img.height==0  得用 this.width
                 }
         //加载图片
                 _this.render(imgsInfo);
         	}
         }
	   },
   
	getImgUrl: function(num){
                var color,height,width,url=[];
                for(var i=0;i<num;i++){
                	color=Math.random().toString(16).substring(2,8);
                    width=Math.floor(Math.random()*100+50);
                    height=Math.floor(Math.random()*30+50);
                    url.push("http://lorempixel.com/" + width + "/" + height + "/" );

				}
				return url;

	},
	render: function(imgsInfo){

             console.log(this)
		       var clientWidth= this.$ct.width();
		       var rowWidth = 0;
		       var newHeight = 0;
		       var currentImg = imgsInfo;
               this.rowList.push(currentImg);
               for(i=0;i<this.rowList.length;i++){
                 rowWidth = rowWidth+this.rowList[i].width;
                // console.log(rowWidth)
               }
               if(rowWidth>clientWidth){                
                 this.rowList.pop();
                 rowWidth= rowWidth-currentImg.width;
                 console.log('rowWidth:'+rowWidth);
                 //2******这个比例写错，导致无法显示一行******************
                 newHeight = clientWidth*this.baseHeight / rowWidth;
                
                 console.log(this.rowList);          
                 this.layout(newHeight);
                 rowWidth = 0;
                 this.rowList=[];
                 this.rowList.push(currentImg);
               }

	},
	layout: function(newHeight){

				var $rowct = $('<div class="img-ct"></div>');
				$.each(this.rowList,function(inx,imgsInfo){
                   var $imgct = $('<div class="img-box"></div>');
                   var $img =$(imgsInfo.target);
                   $img.height(newHeight); //只要新的高度。宽度会自适应            
                   console.log(inx)
                   console.log($img.width())
                   $imgct.append($img);
                   $rowct.append($imgct)

				})
           this.$ct.append($rowct);

	  }
       
	 
	}


/*	var $ct = $('.barrel');
    new Barrel($ct,50);*/
//二次封装，立即执行函数
 var Barrel1=(function(){
   return{
      init: function($ct,num){
        $ct.each(function(index,node){
            new Barrel($ct,num)
        })
      }
   }

 })();

 Barrel1.init($('.barrel'),50);