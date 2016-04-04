!function($,window,document,undefined){"use strict";Foundation.libs.joyride={name:"joyride",version:"5.5.3",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(scope,method,options){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||$.extend({},this.defaults,options||method),this.bindings(method,options)},go_next:function(){this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())},go_prev:function(){this.settings.$li.prev().length<1||(this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(null,!0),this.startTimer()):(this.hide(),this.show(null,!0)))},events:function(){var self=this;$(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(e){e.preventDefault(),this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(e){e.preventDefault(),this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(e){if(this.settings.keyboard&&this.settings.riding)switch(e.which){case 39:e.preventDefault(),this.go_next();break;case 37:e.preventDefault(),this.go_prev();break;case 27:e.preventDefault(),this.end(this.settings.abort_on_close)}}.bind(this)),$(window).off(".joyride").on("resize.fndtn.joyride",self.throttle(function(){if($("["+self.attr_name()+"]").length>0&&self.settings.$next_tip&&self.settings.riding){if(self.settings.exposed.length>0){var $els=$(self.settings.exposed);$els.each(function(){var $this=$(this);self.un_expose($this),self.expose($this)})}self.is_phone()?self.pos_phone():self.pos_default(!1)}},100))},start:function(){var self=this,$this=$("["+this.attr_name()+"]",this.scope),integer_settings=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],int_settings_count=integer_settings.length;!$this.length>0||(this.settings.init||this.events(),this.settings=$this.data(this.attr_name(!0)+"-init"),this.settings.$content_el=$this,this.settings.$body=$(this.settings.tip_container),this.settings.body_offset=$(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.riding=!0,"function"!=typeof $.cookie&&(this.settings.cookie_monster=!1),(!this.settings.cookie_monster||this.settings.cookie_monster&&!$.cookie(this.settings.cookie_name))&&(this.settings.$tip_content.each(function(index){var $this=$(this);this.settings=$.extend({},self.defaults,self.data_options($this));for(var i=int_settings_count;i--;)self.settings[integer_settings[i]]=parseInt(self.settings[integer_settings[i]],10);self.create({$li:$this,index:index})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")))},resume:function(){this.set_li(),this.show()},tip_template:function(opts){var $blank,content;return opts.tip_class=opts.tip_class||"",$blank=$(this.settings.template.tip).addClass(opts.tip_class),content=$.trim($(opts.li).html())+this.prev_button_text(opts.prev_button_text,opts.index)+this.button_text(opts.button_text)+this.settings.template.link+this.timer_instance(opts.index),$blank.append($(this.settings.template.wrapper)),$blank.first().attr(this.add_namespace("data-index"),opts.index),$(".joyride-content-wrapper",$blank).append(content),$blank[0]},timer_instance:function(index){var txt;return txt=0===index&&this.settings.start_timer_on_click&&this.settings.timer>0||0===this.settings.timer?"":$(this.settings.template.timer)[0].outerHTML},button_text:function(txt){return this.settings.tip_settings.next_button?(txt=$.trim(txt)||"Next",txt=$(this.settings.template.button).append(txt)[0].outerHTML):txt="",txt},prev_button_text:function(txt,idx){return this.settings.tip_settings.prev_button?(txt=$.trim(txt)||"Previous",txt=0==idx?$(this.settings.template.prev_button).append(txt).addClass("disabled")[0].outerHTML:$(this.settings.template.prev_button).append(txt)[0].outerHTML):txt="",txt},create:function(opts){this.settings.tip_settings=$.extend({},this.settings,this.data_options(opts.$li));var buttonText=opts.$li.attr(this.add_namespace("data-button"))||opts.$li.attr(this.add_namespace("data-text")),prevButtonText=opts.$li.attr(this.add_namespace("data-button-prev"))||opts.$li.attr(this.add_namespace("data-prev-text")),tipClass=opts.$li.attr("class"),$tip_content=$(this.tip_template({tip_class:tipClass,index:opts.index,button_text:buttonText,prev_button_text:prevButtonText,li:opts.$li}));$(this.settings.tip_container).append($tip_content)},show:function(init,is_prev){var $timer=null;if(this.settings.$li===undefined||-1===$.inArray(this.settings.$li.index(),this.settings.pause_after))if(this.settings.paused?this.settings.paused=!1:this.set_li(init,is_prev),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0){if(init&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=$.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],!/body/i.test(this.settings.$target.selector)&&!this.settings.expose){var joyridemodalbg=$(".joyride-modal-bg");/pop/i.test(this.settings.tipAnimation)?joyridemodalbg.hide():joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed),this.scroll_to()}this.is_phone()?this.pos_phone(!0):this.pos_default(!0),$timer=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?($timer.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){$timer.animate({width:$timer.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&($timer.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){$timer.animate({width:$timer.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip}else this.settings.$li&&this.settings.$target.length<1?this.show(init,is_prev):this.end();else this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||$(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout($.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(init,is_prev){init?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(is_prev?this.settings.$li=this.settings.$li.prev():this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=$(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var cl=this.settings.$li.attr(this.add_namespace("data-class")),id=this.settings.$li.attr(this.add_namespace("data-id")),$sel=function(){return id?$(document.getElementById(id)):cl?$("."+cl).first():$("body")};this.settings.$target=$sel()},scroll_to:function(){var window_half,tipOffset;window_half=$(window).height()/2,tipOffset=Math.ceil(this.settings.$target.offset().top-window_half+this.settings.$next_tip.outerHeight()),0!=tipOffset&&$("html, body").stop().animate({scrollTop:tipOffset},this.settings.scroll_speed,"swing")},paused:function(){return-1===$.inArray(this.settings.$li.index()+1,this.settings.pause_after)},restart:function(){this.hide(),this.settings.$li=undefined,this.show("init")},pos_default:function(init){var $nub=this.settings.$next_tip.find(".joyride-nub"),nub_width=Math.ceil($nub.outerWidth()/2),nub_height=Math.ceil($nub.outerHeight()/2),toggle=init||!1;if(toggle&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal($nub);else{var topAdjustment=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,leftAdjustment=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;this.bottom()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top+nub_height+this.settings.$target.outerHeight()+topAdjustment,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+leftAdjustment}):this.settings.$next_tip.css({top:this.settings.$target.offset().top+nub_height+this.settings.$target.outerHeight()+topAdjustment,left:this.settings.$target.offset().left+leftAdjustment}),this.nub_position($nub,this.settings.tip_settings.nub_position,"top")):this.top()?(this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-nub_height+topAdjustment,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}):this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-nub_height+topAdjustment,left:this.settings.$target.offset().left+leftAdjustment}),this.nub_position($nub,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top+topAdjustment,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+nub_width+leftAdjustment}),this.nub_position($nub,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top+topAdjustment,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-nub_width+leftAdjustment}),this.nub_position($nub,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&($nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}toggle&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(init){var tip_height=this.settings.$next_tip.outerHeight(),target_height=(this.settings.$next_tip.offset(),this.settings.$target.outerHeight()),$nub=$(".joyride-nub",this.settings.$next_tip),nub_height=Math.ceil($nub.outerHeight()/2),toggle=init||!1;$nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),toggle&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal($nub):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-tip_height-nub_height}),$nub.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+target_height+nub_height}),$nub.addClass("top")),toggle&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function($nub){this.center(),$nub.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var joyridemodalbg=$(".joyride-modal-bg");if(joyridemodalbg.length<1){var joyridemodalbg=$(this.settings.template.modal);joyridemodalbg.appendTo("body")}/pop/i.test(this.settings.tip_animation)?joyridemodalbg.show():joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var expose,exposeCover,el,origCSS,origClasses,randId="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof $)el=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;el=this.settings.$target}return el.length<1?(window.console&&console.error("element not valid",el),!1):(expose=$(this.settings.template.expose),this.settings.$body.append(expose),expose.css({top:el.offset().top,left:el.offset().left,width:el.outerWidth(!0),height:el.outerHeight(!0)}),exposeCover=$(this.settings.template.expose_cover),origCSS={zIndex:el.css("z-index"),position:el.css("position")},origClasses=null==el.attr("class")?"":el.attr("class"),el.css("z-index",parseInt(expose.css("z-index"))+1),"static"==origCSS.position&&el.css("position","relative"),el.data("expose-css",origCSS),el.data("orig-class",origClasses),el.attr("class",origClasses+" "+this.settings.expose_add_class),exposeCover.css({top:el.offset().top,left:el.offset().left,width:el.outerWidth(!0),height:el.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(exposeCover),expose.addClass(randId),exposeCover.addClass(randId),el.data("expose",randId),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,el),void this.add_exposed(el))},un_expose:function(){var exposeId,el,expose,origCSS,origClasses,clearAll=!1;if(arguments.length>0&&arguments[0]instanceof $)el=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;el=this.settings.$target}return el.length<1?(window.console&&console.error("element not valid",el),!1):(exposeId=el.data("expose"),expose=$("."+exposeId),arguments.length>1&&(clearAll=arguments[1]),clearAll===!0?$(".joyride-expose-wrapper,.joyride-expose-cover").remove():expose.remove(),origCSS=el.data("expose-css"),"auto"==origCSS.zIndex?el.css("z-index",""):el.css("z-index",origCSS.zIndex),origCSS.position!=el.css("position")&&("static"==origCSS.position?el.css("position",""):el.css("position",origCSS.position)),origClasses=el.data("orig-class"),el.attr("class",origClasses),el.removeData("orig-classes"),el.removeData("expose"),el.removeData("expose-z-index"),void this.remove_exposed(el))},add_exposed:function(el){this.settings.exposed=this.settings.exposed||[],el instanceof $||"object"==typeof el?this.settings.exposed.push(el[0]):"string"==typeof el&&this.settings.exposed.push(el)},remove_exposed:function(el){var search,i;for(el instanceof $?search=el[0]:"string"==typeof el&&(search=el),this.settings.exposed=this.settings.exposed||[],i=this.settings.exposed.length;i--;)if(this.settings.exposed[i]==search)return void this.settings.exposed.splice(i,1)},center:function(){var $w=$(window);return this.settings.$next_tip.css({top:($w.height()-this.settings.$next_tip.outerHeight())/2+$w.scrollTop(),left:($w.width()-this.settings.$next_tip.outerWidth())/2+$w.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(el){if(0===el.length)return[!1,!1,!1,!1];var w=$(window),window_half=w.height()/2,tipOffset=Math.ceil(this.settings.$target.offset().top-window_half+this.settings.$next_tip.outerHeight()),right=w.width()+w.scrollLeft(),offsetBottom=w.height()+tipOffset,bottom=w.height()+w.scrollTop(),top=w.scrollTop();return top>tipOffset&&(top=0>tipOffset?0:tipOffset),offsetBottom>bottom&&(bottom=offsetBottom),[el.offset().top<top,right<el.offset().left+el.outerWidth(),bottom<el.offset().top+el.outerHeight(),w.scrollLeft()>el.offset().left]},visible:function(hidden_corners){for(var i=hidden_corners.length;i--;)if(hidden_corners[i])return!1;return!0},nub_position:function(nub,pos,def){"auto"===pos?nub.addClass(def):nub.addClass(pos)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(abort){this.settings.cookie_monster&&$.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),$(this.scope).off("keyup.joyride"),this.settings.$next_tip.data("closed",!0),this.settings.riding=!1,$(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),("undefined"==typeof abort||abort===!1)&&(this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)),$(".joyride-tip-guide").remove()},off:function(){$(this.scope).off(".joyride"),$(window).off(".joyride"),$(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),$(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate)},reflow:function(){}}}(jQuery,window,window.document);