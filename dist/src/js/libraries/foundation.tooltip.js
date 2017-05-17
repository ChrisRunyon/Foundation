!function($,window,document,undefined){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.5.3",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,fade_in_duration:150,fade_out_duration:150,show_on:"all",tip_template:function(selector,content){return'<span data-selector="'+selector+'" id="'+selector+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+content+'<span class="nub"></span></span>'}},cache:{},init:function(scope,method,options){Foundation.inherit(this,"random_str"),this.bindings(method,options)},should_show:function(target,tip){var settings=$.extend({},this.settings,this.data_options(target));return"all"===settings.show_on||(!(!this.small()||"small"!==settings.show_on)||(!(!this.medium()||"medium"!==settings.show_on)||!(!this.large()||"large"!==settings.show_on)))},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(instance){function _startShow(elt,$this,immediate){elt.timer||(immediate?(elt.timer=null,self.showTip($this)):elt.timer=setTimeout(function(){elt.timer=null,self.showTip($this)}.bind(elt),self.settings.hover_delay))}function _startHide(elt,$this){elt.timer&&(clearTimeout(elt.timer),elt.timer=null),self.hide($this)}var self=this,S=self.S;self.create(this.S(instance)),$(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(e){var $this=S(this),settings=$.extend({},self.settings,self.data_options($this)),is_touch=!1;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&S(e.target).is("a"))return!1;if(/mouse/i.test(e.type)&&self.ie_touch(e))return!1;if($this.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&e.preventDefault(),self.hide($this);else{if(settings.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type))return;if(!settings.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&(e.preventDefault(),S(settings.tooltip_class+".open").hide(),is_touch=!0,$(".open["+self.attr_name()+"]").length>0)){var prevOpen=S($(".open["+self.attr_name()+"]")[0]);self.hide(prevOpen)}/enter|over/i.test(e.type)?_startShow(this,$this):"mouseout"===e.type||"mouseleave"===e.type?_startHide(this,$this):_startShow(this,$this,!0)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(e){return(!/mouse/i.test(e.type)||!self.ie_touch(e))&&void("touch"==$(this).data("tooltip-open-event-type")&&"mouseleave"==e.type||("mouse"==$(this).data("tooltip-open-event-type")&&/MSPointerDown|touchstart/i.test(e.type)?self.convert_to_touch($(this)):_startHide(this,$(this))))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(e){_startHide(this,S(this))})},ie_touch:function(e){return!1},showTip:function($target){var $tip=this.getTip($target);if(this.should_show($target,$tip))return this.show($target)},getTip:function($target){var selector=this.selector($target),settings=$.extend({},this.settings,this.data_options($target)),tip=null;return selector&&(tip=this.S('span[data-selector="'+selector+'"]'+settings.tooltip_class)),"object"==typeof tip&&tip},selector:function($target){var dataSelector=$target.attr(this.attr_name())||$target.attr("data-selector");return"string"!=typeof dataSelector&&(dataSelector=this.random_str(6),$target.attr("data-selector",dataSelector).attr("aria-describedby",dataSelector)),dataSelector},create:function($target){var self=this,settings=$.extend({},this.settings,this.data_options($target)),tip_template=this.settings.tip_template;"string"==typeof settings.tip_template&&window.hasOwnProperty(settings.tip_template)&&(tip_template=window[settings.tip_template]);var $tip=$(tip_template(this.selector($target),$("<div></div>").html($target.attr("title")).html())),classes=this.inheritable_classes($target);$tip.addClass(classes).appendTo(settings.append_to),Modernizr.touch&&($tip.append('<span class="tap-to-close">'+settings.touch_close_text+"</span>"),$tip.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(e){self.hide($target)})),$target.removeAttr("title").attr("title","")},reposition:function(target,tip,classes){var width,nub,nubHeight,nubWidth,objPos;tip.css("visibility","hidden").show(),width=target.data("width"),nub=tip.children(".nub"),nubHeight=nub.outerHeight(),nubWidth=nub.outerWidth(),this.small()?tip.css({width:"100%"}):tip.css({width:width?width:"auto"}),objPos=function(obj,top,right,bottom,left,width){return obj.css({top:top?top:"auto",bottom:bottom?bottom:"auto",left:left?left:"auto",right:right?right:"auto"}).end()};var o_top=target.offset().top,o_left=target.offset().left,outerHeight=target.outerHeight();if(objPos(tip,o_top+outerHeight+10,"auto","auto",o_left),this.small())objPos(tip,o_top+outerHeight+10,"auto","auto",12.5,$(this.scope).width()),tip.addClass("tip-override"),objPos(nub,-nubHeight,"auto","auto",o_left);else{Foundation.rtl&&(nub.addClass("rtl"),o_left=o_left+target.outerWidth()-tip.outerWidth()),objPos(tip,o_top+outerHeight+10,"auto","auto",o_left),nub.attr("style")&&nub.removeAttr("style"),tip.removeClass("tip-override");var tip_outerHeight=tip.outerHeight();classes&&classes.indexOf("tip-top")>-1?(Foundation.rtl&&nub.addClass("rtl"),objPos(tip,o_top-tip_outerHeight,"auto","auto",o_left).removeClass("tip-override")):classes&&classes.indexOf("tip-left")>-1?(objPos(tip,o_top+outerHeight/2-tip_outerHeight/2,"auto","auto",o_left-tip.outerWidth()-nubHeight).removeClass("tip-override"),nub.removeClass("rtl")):classes&&classes.indexOf("tip-right")>-1&&(objPos(tip,o_top+outerHeight/2-tip_outerHeight/2,"auto","auto",o_left+target.outerWidth()+nubHeight).removeClass("tip-override"),nub.removeClass("rtl"))}tip.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function($target){var settings=$.extend({},this.settings,this.data_options($target)),inheritables=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(settings.additional_inheritable_classes),classes=$target.attr("class"),filtered=classes?$.map(classes.split(" "),function(el,i){if($.inArray(el,inheritables)!==-1)return el}).join(" "):"";return $.trim(filtered)},convert_to_touch:function($target){var self=this,$tip=self.getTip($target),settings=$.extend({},self.settings,self.data_options($target));0===$tip.find(".tap-to-close").length&&($tip.append('<span class="tap-to-close">'+settings.touch_close_text+"</span>"),$tip.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(e){self.hide($target)})),$target.data("tooltip-open-event-type","touch")},show:function($target){var $tip=this.getTip($target);"touch"==$target.data("tooltip-open-event-type")&&this.convert_to_touch($target),this.reposition($target,$tip,$target.attr("class")),$target.addClass("open"),$tip.fadeIn(this.settings.fade_in_duration)},hide:function($target){var $tip=this.getTip($target);$tip.fadeOut(this.settings.fade_out_duration,function(){$tip.find(".tap-to-close").remove(),$tip.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),$target.removeClass("open")})},off:function(){var self=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(i){$("["+self.attr_name()+"]").eq(i).attr("title",$(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document);