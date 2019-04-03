
/*照片墙： 瀑布流布局 
  使用： 


       var ww= new Waterfull($('容器')，[图片数目]，[图片宽度])
    
         ww.getImag([图片数目]);
*/



/*思路:瀑布流布局的图片宽度相同，高度不同
 	   1. 计算每一行能排多少个图片，用数组记下每一列图片的高度
 	   2. 排完一行之后，排下一行，从高度最小的那一列开始排

 	*/

     function Waterfull($ct,num,width){
        this.$ct = $ct;
        this.num=num || 20;   //一次加载的图片的个数
        this.width=width || 220;
        this.isImagLoad = true;  //状态锁，避免重复要数据
        this.creatHtml();
        this.init();


     }
     Waterfull.prototype={
        init: function(){
                 this.$bottom = this.$ct.find('#bottom');
                 this.$imgct=$(this.$ct.find('.img-ct'));            
                 this.itemWidth = $(this.$ct.find('.hide-item')).outerWidth(true); //用来计算高度
                 var ctWidth = this.$imgct.width();
                 var rowLength =parseInt(ctWidth/this.itemWidth);
                 this.rowList=[];
                 for(var i=0;i<rowLength;i++){
                        this.rowList[i]=0;
                    }

                 
           },
        creatHtml: function(){
                 var html ='';
                 html += '<ul class="img-ct"><li class="hide-item">看不见,用来计算宽度</li></ul>';
                 html +='</div><div id="bottom">bottom</div>'
                 this.$ct.addClass('waterfull');
                 this.$ct.append(html);
                 this.$ct.find('#bottom')
                     .css({ width: 10+'px',
                            height: 10+'px',
                            visibility: 'hidden'})

        },
        //向后台要图片
        getImag: function(num){
            var imgArray=[]
            if(num!==undefined){
               this.num = num;
            } 
            if( !this.isImagLoad ){ return;}
            this.isImagLoad=false;
            for(var i=0;i<this.num;i++){
               var imgHeight = parseInt(Math.random()*250+50);//高度为50~300px
               var imgWidth = this.width;     //宽度固定       
               var imgUrl = 'Http://lorempixel.com/'+imgWidth+'/'+imgHeight;            
               var $imgNode = $('<li><img src="'+imgUrl+'"></li>');
               var imgObj = {
                  imgNode: $imgNode,
                  imgHeight: imgHeight    //注意：这里的高度要存下来
               }
                 imgArray.push(imgObj);
             }
             this.waterfull(imgArray);
             this.isImagLoad=true;
           
         },
         waterfull: function(nodeArray){  
              var _this=this;       
              nodeArray.forEach(function(ele,idx){
                    var minLength = Math.min.apply(null,_this.rowList);
                    var minIndex = _this.rowList.indexOf(minLength);
                    if($(ele.imgNode).find('img').load()){
                       _this.$imgct.append(ele.imgNode);   
              
                       $(ele.imgNode).css({
                               top: _this.rowList[minIndex]+5+'px',
                               left: _this.itemWidth*minIndex+'px'  
                        })
               //用之前存的图片的真实高度，用$(ele.imgNode).height()得出的高度是假的      
               _this.rowList[minIndex]+=ele.imgHeight+5;    
               _this.$imgct.height(Math.max.apply(null,_this.rowList));  //父容器的高度重新设置，不然高度为0，元素一直看得见
              }
         })
                window.scrollTo(0,this.$bottom.offset().top);

     }
    
}

     
      