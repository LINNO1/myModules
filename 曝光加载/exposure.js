/*功能描述: 当页面上的一个元素出现时，执行相应的功能*/

//参数： 该元素  回调函数
function Exposure($showItem,callback){
	this.$showItem=$showItem;
	this.callback=callback;
	this.bind();
}

Exposure.prototype.bind=function(){

	   var _this = this;
	   $(window).scroll(function(){
	   	if(clock){ clearTimeout(clock)}
	   	var clock=setTimeout(function(){
                if(_this.checkShow()){
			        _this.callback();
		    }

	   	},1000)
	   }
  }

	Exposure.prototype.checkShow=function(){
		 var windowHeight = $(window).height();
         var scrollTop = $(window).scrollTop();
         var offsetTop = this.$showItem.offset().top;
         var nodeHeight = this.$showItem.height();
         if(windowHeight+scrollTop > offsetTop && scrollTop<offsetTop+nodeHeight){
               return true;
         }
         return false;
	}


	/*使用：
	new Exposure($showItem,function(){})
	*/
