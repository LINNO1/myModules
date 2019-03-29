/*不同按键弹出的对话框不同，那么传入的参数应该是对话框的样式*/
/* 可选项： 标题 内容 是否有 确定和取消键  按下这两个键是否有弹窗 */

/*
  
   使用方法
      Dialog.open({
              title: '',   //标题
              message: '',   //内容
              isShowCloseBtn: true,  //确定键
              isShowConfirmBtn: false, //取消键 
              onClose: function(){},   
              onConfirm: function(){}



      })


*/


//Dialog 是个立即执行函数，返回一个Modal 函数， 该函数进行了初始化和绑定事件
//用户用 .open() 来执行
var Dialog= (function(){

       function Modal(){
        this.createDialog(); //创建弹窗
        this.bindEvent();  //绑定事件
    
       }




       Modal.prototype = {
           /*默认样式*/
            defaultOpts: {
              title: '',
              message: '',
              isShowCloseBtn: true,
              isShowConfirmBtn: false,
              onClose: function(){},
              onConfirm: function(){}
            },

             /*创建Dialog,并显示到页面上*/
            createDialog: function(){
              var tpl = '<div class="dialog" style="display:none">'
                + '<div class="dialog-overlay"></div>'
                + '<div class="dialog-box">'
                +   '<div class="dialog-header"><h3></h3><span class="btn-close">x</span></div>'
                +   '<div class="dialog-content">'
                +   '</div>'
                + '<div class="dialog-footer">'
                + '  <a href="#" class="btn btn-close">取消</a>'
                + '  <a href="#" class="btn btn-confirm">确定</a>'
                + '</div>'
                + '</div>'
                +'</div>';
                /*-----------------------------------------*/
                this.$dialog = $(tpl);
                $('body').append(this.$dialog);

            },
             /*为下面的两个按键绑定事件*/
            bindEvent: function(){
              var _this = this;
              _this.$dialog.find('.btn-close').on('click',function(e){
                e.preventDefault();
                _this.opts.onClose();
                _this.hideDialog();
              });
              _this.$dialog.find('.btn-confirm').on('click',function(e){
                e.preventDefault();
                _this.opts.onConfirm();
                _this.hideDialog();

              })

            },
            /*用户点击按键时，调用该方法*/
            /*打开弹窗 1：设置样式 2：根据样式渲染 3：显示*/
            open: function(opts){
              this.setOpts(opts);  
              this.setDialog();
              this.showDialog();

            },
            close: function(){
              this.hideDialog();

            },
            /*将样式拼接到一个对象里*/
            setOpts: function(opts){
              /*如果传入的opts 是字符串，则是弹窗的内容*/
              /*用到jquery 的 extend 函数*/
              if (typeof opts ==='string') {
              this.opts=$.extend({},this.defaultOpts,{message: opts});
              }else if (typeof opts ==='object'){
              this.opts = $.extend({},this.defaultOpts,opts);
              }

            },
          
            /*根据参数设置样式*/
            setDialog: function(){
               var $dialog = this.$dialog;
               if(!this.opts.title){
                $dialog.find('.dialog-header').hide();
               }else{
                $dialog.find('.dialog-header').show();
               }

               if(!this.opts.isShowCloseBtn){
                $dialog.find('.dialog-footer .btn-close').hide();
               }else{
                $dialog.find('.dialog-footer .btn-close').show();
               }
                
               if(!this.opts.isShowConfirmBtn){
                $dialog.find('.dialog-footer .btn-confirm').hide();
                }else{
                $dialog.find('.dialog-footer .btn-confirm').show();
                }

                $dialog.find('.dialog-header h3').text(this.opts.title);
                /*注意： 这里用html, 否则 a 链接什么的显示不出*/
                $dialog.find('.dialog-content').html(this.opts.message);

            },

            showDialog: function(){
              this.$dialog.show();

            },
            hideDialog: function(){
             this.$dialog.hide();
            }


        }

       return new Modal();

  })();