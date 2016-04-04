!function($,window,document,undefined){"use strict";Foundation.libs.clearing={name:"clearing",version:"5.5.3",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div><img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'},close_selectors:".clearing-close, div.clearing-blackout",open_selectors:"",skip_selector:"",touch_label:"",init:!1,locked:!1},init:function(scope,method,options){var self=this;Foundation.inherit(this,"throttle image_loaded"),this.bindings(method,options),self.S(this.scope).is("["+this.attr_name()+"]")?this.assemble(self.S("li",this.scope)):self.S("["+this.attr_name()+"]",this.scope).each(function(){self.assemble(self.S("li",this))})},events:function(scope){var self=this,S=self.S,$scroll_container=$(".scroll-container");$scroll_container.length>0&&(this.scope=$scroll_container),S(this.scope).off(".clearing").on("click.fndtn.clearing","ul["+this.attr_name()+"] li "+this.settings.open_selectors,function(e,current,target){var current=current||S(this),target=target||current,next=current.next("li"),settings=current.closest("["+self.attr_name()+"]").data(self.attr_name(!0)+"-init"),image=S(e.target);e.preventDefault(),settings||(self.init(),settings=current.closest("["+self.attr_name()+"]").data(self.attr_name(!0)+"-init")),target.hasClass("visible")&&current[0]===target[0]&&next.length>0&&self.is_open(current)&&(target=next,image=S("img",target)),self.open(image,current,target),self.update_paddles(target)}).on("click.fndtn.clearing",".clearing-main-next",function(e){self.nav(e,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(e){self.nav(e,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}),$(document).on("keydown.fndtn.clearing",function(e){self.keydown(e)}),S(window).off(".clearing").on("resize.fndtn.clearing",function(){self.resize()}),this.swipe_events(scope)},swipe_events:function(scope){var self=this,S=self.S;S(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(e){e.touches||(e=e.originalEvent);var data={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:undefined};S(this).data("swipe-transition",data),e.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(e){if(e.touches||(e=e.originalEvent),!(e.touches.length>1||e.scale&&1!==e.scale)){var data=S(this).data("swipe-transition");if("undefined"==typeof data&&(data={}),data.delta_x=e.touches[0].pageX-data.start_page_x,Foundation.rtl&&(data.delta_x=-data.delta_x),"undefined"==typeof data.is_scrolling&&(data.is_scrolling=!!(data.is_scrolling||Math.abs(data.delta_x)<Math.abs(e.touches[0].pageY-data.start_page_y))),!data.is_scrolling&&!data.active){e.preventDefault();var direction=data.delta_x<0?"next":"prev";data.active=!0,self.nav(e,direction)}}}).on("touchend.fndtn.clearing",".visible-img",function(e){S(this).data("swipe-transition",{}),e.stopPropagation()})},assemble:function($li){var $el=$li.parent();if(!$el.parent().hasClass("carousel")){$el.after('<div id="foundationClearingHolder"></div>');var grid=$el.detach(),grid_outerHTML="";if(null!=grid[0]){grid_outerHTML=grid[0].outerHTML;var holder=this.S("#foundationClearingHolder"),settings=$el.data(this.attr_name(!0)+"-init"),data={grid:'<div class="carousel">'+grid_outerHTML+"</div>",viewing:settings.templates.viewing},wrapper='<div class="clearing-assembled"><div>'+data.viewing+data.grid+"</div></div>",touch_label=this.settings.touch_label;Modernizr.touch&&(wrapper=$(wrapper).find(".clearing-touch-label").html(touch_label).end()),holder.after(wrapper).remove()}}},open:function($image,current,target){function startLoad(){setTimeout(function(){this.image_loaded(image,function(){1!==image.outerWidth()||error?cb.call(this,image):startLoad.call(this)}.bind(this))}.bind(this),100)}function cb(image){var $image=$(image);$image.css("visibility","visible"),$image.trigger("imageVisible"),body.css("overflow","hidden"),root.addClass("clearing-blackout"),container.addClass("clearing-container"),visible_image.show(),this.fix_height(target).caption(self.S(".clearing-caption",visible_image),self.S("img",target)).center_and_label(image,label).shift(current,target,function(){target.closest("li").siblings().removeClass("visible"),target.closest("li").addClass("visible")}),visible_image.trigger("opened.fndtn.clearing")}var self=this,body=$(document.body),root=target.closest(".clearing-assembled"),container=self.S("div",root).first(),visible_image=self.S(".visible-img",container),image=self.S("img",visible_image).not($image),label=self.S(".clearing-touch-label",container),error=!1,loaded={};$("body").on("touchmove",function(e){e.preventDefault()}),image.error(function(){error=!0}),this.locked()||(visible_image.trigger("open.fndtn.clearing"),loaded=this.load($image),loaded.interchange?image.attr("data-interchange",loaded.interchange).foundation("interchange","reflow"):image.attr("src",loaded.src).attr("data-interchange",""),image.css("visibility","hidden"),startLoad.call(this))},close:function(e,el){e.preventDefault();var container,visible_image,root=function(target){return/blackout/.test(target.selector)?target:target.closest(".clearing-blackout")}($(el)),body=$(document.body);return el===e.target&&root&&(body.css("overflow",""),container=$("div",root).first(),visible_image=$(".visible-img",container),visible_image.trigger("close.fndtn.clearing"),this.settings.prev_index=0,$("ul["+this.attr_name()+"]",root).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),container.removeClass("clearing-container"),visible_image.hide(),visible_image.trigger("closed.fndtn.clearing")),$("body").off("touchmove"),!1},is_open:function(current){return current.parent().prop("style").length>0},keydown:function(e){var clearing=$(".clearing-blackout ul["+this.attr_name()+"]"),NEXT_KEY=this.rtl?37:39,PREV_KEY=this.rtl?39:37,ESC_KEY=27;e.which===NEXT_KEY&&this.go(clearing,"next"),e.which===PREV_KEY&&this.go(clearing,"prev"),e.which===ESC_KEY&&this.S("a.clearing-close").trigger("click.fndtn.clearing")},nav:function(e,direction){var clearing=$("ul["+this.attr_name()+"]",".clearing-blackout");e.preventDefault(),this.go(clearing,direction)},resize:function(){var image=$("img",".clearing-blackout .visible-img"),label=$(".clearing-touch-label",".clearing-blackout");image.length&&(this.center_and_label(image,label),image.trigger("resized.fndtn.clearing"))},fix_height:function(target){var lis=target.parent().children(),self=this;return lis.each(function(){var li=self.S(this),image=li.find("img");li.height()>image.outerHeight()&&li.addClass("fix-height")}).closest("ul").width(100*lis.length+"%"),this},update_paddles:function(target){target=target.closest("li");var visible_image=target.closest(".carousel").siblings(".visible-img");target.next().length>0?this.S(".clearing-main-next",visible_image).removeClass("disabled"):this.S(".clearing-main-next",visible_image).addClass("disabled"),target.prev().length>0?this.S(".clearing-main-prev",visible_image).removeClass("disabled"):this.S(".clearing-main-prev",visible_image).addClass("disabled")},center_and_label:function(target,label){return!this.rtl&&label.length>0?label.css({marginLeft:-(label.outerWidth()/2),marginTop:-(target.outerHeight()/2)-label.outerHeight()-10}):label.css({marginRight:-(label.outerWidth()/2),marginTop:-(target.outerHeight()/2)-label.outerHeight()-10,left:"auto",right:"50%"}),this},load:function($image){var href,interchange,closest_a;return"A"===$image[0].nodeName?(href=$image.attr("href"),interchange=$image.data("clearing-interchange")):(closest_a=$image.closest("a"),href=closest_a.attr("href"),interchange=closest_a.data("clearing-interchange")),this.preload($image),{src:href?href:$image.attr("src"),interchange:href?interchange:$image.data("clearing-interchange")}},preload:function($image){this.img($image.closest("li").next(),"next").img($image.closest("li").prev(),"prev")},img:function(img,sibling_type){if(img.length){var src,interchange,image,preload_img=$(".clearing-preload-"+sibling_type),new_a=this.S("a",img);new_a.length?(src=new_a.attr("href"),interchange=new_a.data("clearing-interchange")):(image=this.S("img",img),src=image.attr("src"),interchange=image.data("clearing-interchange")),interchange?preload_img.attr("data-interchange",interchange):(preload_img.attr("src",src),preload_img.attr("data-interchange",""))}return this},caption:function(container,$image){var caption=$image.attr("data-caption");if(caption){var containerPlain=container.get(0);containerPlain.innerHTML=caption,container.show()}else container.text("").hide();return this},go:function($ul,direction){var current=this.S(".visible",$ul),target=current[direction]();this.settings.skip_selector&&0!=target.find(this.settings.skip_selector).length&&(target=target[direction]()),target.length&&this.S("img",target).trigger("click.fndtn.clearing",[current,target]).trigger("change.fndtn.clearing")},shift:function(current,target,callback){var skip_shift,clearing=target.parent(),old_index=this.settings.prev_index||target.index(),direction=this.direction(clearing,current,target),dir=this.rtl?"right":"left",left=parseInt(clearing.css("left"),10),width=target.outerWidth(),dir_obj={};target.index()===old_index||/skip/.test(direction)?/skip/.test(direction)&&(skip_shift=target.index()-this.settings.up_count,this.lock(),skip_shift>0?(dir_obj[dir]=-(skip_shift*width),clearing.animate(dir_obj,300,this.unlock())):(dir_obj[dir]=0,clearing.animate(dir_obj,300,this.unlock()))):/left/.test(direction)?(this.lock(),dir_obj[dir]=left+width,clearing.animate(dir_obj,300,this.unlock())):/right/.test(direction)&&(this.lock(),dir_obj[dir]=left-width,clearing.animate(dir_obj,300,this.unlock())),callback()},direction:function($el,current,target){var response,lis=this.S("li",$el),li_width=lis.outerWidth()+lis.outerWidth()/4,up_count=Math.floor(this.S(".clearing-container").outerWidth()/li_width)-1,target_index=lis.index(target);return this.settings.up_count=up_count,response=this.adjacent(this.settings.prev_index,target_index)?target_index>up_count&&target_index>this.settings.prev_index?"right":target_index>up_count-1&&target_index<=this.settings.prev_index?"left":!1:"skip",this.settings.prev_index=target_index,response},adjacent:function(current_index,target_index){for(var i=target_index+1;i>=target_index-1;i--)if(i===current_index)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},off:function(){this.S(this.scope).off(".fndtn.clearing"),this.S(window).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,window,window.document);