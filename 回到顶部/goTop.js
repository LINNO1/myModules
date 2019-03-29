 //回到顶部组件
//功能：在页面上建立一个button，点击可以回到顶部
//参数： 一个id名称   使用 new GoTop('string');
 function GoTop(id){
      this.id = id || 'lll-gotop';
      this.init();
      this.bind();
     
    }
     GoTop.prototype.init=function(){
     // this.$c=$(document);
      $el=$('#'+this.id);
      if($el.length===0){
         this.createNode();
         $('body').append(this.$el)
      }else{
        this.$el=$el;
      }
    }
    GoTop.prototype.bind=function(){
      var _this=this;
       this.$el.on('click',function(){
        _this.goToTop();
       })
      /* this.$c.on('scroll',function(){
        _this.scroll();
       })*/

    }
    GoTop.prototype.createNode=function(){
        this.$el=$('<button id="'+this.id+'">Top</button>');
        this.$el.css({"position": "fixed", 
                      "right":" 50px", 
                      "bottom": "50%" ,
                      "width": "60px",
                      "height": "60px",
                      "line-height": "60px",
                      "border": "1px solid #ccc",
                      "text-align":"center",
                      "border-radius": "50%",
                      "background": "#ccc",
                     " opacity": "0.6"
                     })
       
    }
    GoTop.prototype.goToTop = function(){
          window.scrollTo(0,0);
    }
    /*GoTop.prototype.scroll = function(){
          var scrollTop = this.$c.scrollTop();
          if(scrollTop>100){
            this.$el.show();
          }else{
            this.$el.hide();
          }
    }*/
