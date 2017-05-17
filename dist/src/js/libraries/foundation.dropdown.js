!function($,window,document,undefined){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.5.3",settings:{active_class:"open",disabled_class:"disabled",mega_class:"mega",align:"bottom",is_hover:!1,hover_timeout:150,opened:function(){},closed:function(){}},init:function(scope,method,options){Foundation.inherit(this,"throttle"),$.extend(!0,this.settings,method,options),this.bindings(method,options)},events:function(scope){var self=this,S=self.S;S(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(e){var settings=S(this).data(self.attr_name(!0)+"-init")||self.settings;settings.is_hover&&!Modernizr.touch||(e.preventDefault(),S(this).parent("[data-reveal-id]").length&&e.stopPropagation(),self.toggle($(this)))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(e){var dropdown,target,$this=S(this);clearTimeout(self.timeout),$this.data(self.data_attr())?(dropdown=S("#"+$this.data(self.data_attr())),target=$this):(dropdown=$this,target=S("["+self.attr_name()+'="'+dropdown.attr("id")+'"]'));var settings=target.data(self.attr_name(!0)+"-init")||self.settings;S(e.currentTarget).data(self.data_attr())&&settings.is_hover&&self.closeall.call(self),settings.is_hover&&self.open.apply(self,[dropdown,target])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(e){var settings,$this=S(this);if($this.data(self.data_attr()))settings=$this.data(self.data_attr(!0)+"-init")||self.settings;else var target=S("["+self.attr_name()+'="'+S(this).attr("id")+'"]'),settings=target.data(self.attr_name(!0)+"-init")||self.settings;self.timeout=setTimeout(function(){$this.data(self.data_attr())?settings.is_hover&&self.close.call(self,S("#"+$this.data(self.data_attr()))):settings.is_hover&&self.close.call(self,$this)}.bind(this),settings.hover_timeout)}).on("click.fndtn.dropdown",function(e){var parent=S(e.target).closest("["+self.attr_name()+"-content]"),links=parent.find("a");if(links.length>0&&"false"!==parent.attr("aria-autoclose")&&self.close.call(self,S("["+self.attr_name()+"-content]")),(e.target===document||$.contains(document.documentElement,e.target))&&!(S(e.target).closest("["+self.attr_name()+"]").length>0))return!S(e.target).data("revealId")&&parent.length>0&&(S(e.target).is("["+self.attr_name()+"-content]")||$.contains(parent.first()[0],e.target))?void e.stopPropagation():void self.close.call(self,S("["+self.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+self.attr_name()+"-content]",function(){self.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+self.attr_name()+"-content]",function(){self.settings.closed.call(this)}),S(window).off(".dropdown").on("resize.fndtn.dropdown",self.throttle(function(){self.resize.call(self)},50)),this.resize()},close:function(dropdown){var self=this;dropdown.each(function(idx){var original_target=$("["+self.attr_name()+"="+dropdown[idx].id+"]")||$("aria-controls="+dropdown[idx].id+"]");original_target.attr("aria-expanded","false"),self.S(this).hasClass(self.settings.active_class)&&(self.S(this).css(Foundation.rtl?"right":"left","-99999px").attr("aria-hidden","true").removeClass(self.settings.active_class).prev("["+self.attr_name()+"]").removeClass(self.settings.active_class).removeData("target"),self.S(this).trigger("closed.fndtn.dropdown",[dropdown]))}),dropdown.removeClass("f-open-"+this.attr_name(!0))},closeall:function(){var self=this;$.each(self.S(".f-open-"+this.attr_name(!0)),function(){self.close.call(self,self.S(this))})},open:function(dropdown,target){this.css(dropdown.addClass(this.settings.active_class),target),dropdown.prev("["+this.attr_name()+"]").addClass(this.settings.active_class),dropdown.data("target",target.get(0)).trigger("opened.fndtn.dropdown",[dropdown,target]),dropdown.attr("aria-hidden","false"),target.attr("aria-expanded","true"),dropdown.focus(),dropdown.addClass("f-open-"+this.attr_name(!0))},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(target){if(!target.hasClass(this.settings.disabled_class)){var dropdown=this.S("#"+target.data(this.data_attr()));0!==dropdown.length&&(this.close.call(this,this.S("["+this.attr_name()+"-content]").not(dropdown)),dropdown.hasClass(this.settings.active_class)?(this.close.call(this,dropdown),dropdown.data("target")!==target.get(0)&&this.open.call(this,dropdown,target)):this.open.call(this,dropdown,target))}},resize:function(){var dropdown=this.S("["+this.attr_name()+"-content].open"),target=$(dropdown.data("target"));dropdown.length&&target.length&&this.css(dropdown,target)},css:function(dropdown,target){var left_offset=Math.max((target.width()-dropdown.width())/2,8),settings=target.data(this.attr_name(!0)+"-init")||this.settings,parentOverflow=dropdown.parent().css("overflow-y")||dropdown.parent().css("overflow");if(this.clear_idx(),this.small()){var p=this.dirs.bottom.call(dropdown,target,settings);dropdown.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:p.top}),dropdown.css(Foundation.rtl?"right":"left",left_offset)}else if("visible"!==parentOverflow){var offset=target[0].offsetTop+target[0].offsetHeight;dropdown.attr("style","").css({position:"absolute",top:offset}),dropdown.css(Foundation.rtl?"right":"left",left_offset)}else this.style(dropdown,target,settings);return dropdown},style:function(dropdown,target,settings){var css=$.extend({position:"absolute"},this.dirs[settings.align].call(dropdown,target,settings));dropdown.attr("style","").css(css)},dirs:{_base:function(t,s){var o_p=this.offsetParent(),o=o_p.offset(),p=t.offset();p.top-=o.top,p.left-=o.left,p.missRight=!1,p.missTop=!1,p.missLeft=!1,p.leftRightFlag=!1;var actualBodyWidth,windowWidth=window.innerWidth;actualBodyWidth=document.getElementsByClassName("row")[0]?document.getElementsByClassName("row")[0].clientWidth:windowWidth;var actualMarginWidth=(windowWidth-actualBodyWidth)/2,actualBoundary=actualBodyWidth;if(!this.hasClass("mega")&&!s.ignore_repositioning){var outerWidth=this.outerWidth(),o_left=t.offset().left;t.offset().top<=this.outerHeight()&&(p.missTop=!0,actualBoundary=windowWidth-actualMarginWidth,p.leftRightFlag=!0),o_left+outerWidth>o_left+actualMarginWidth&&o_left-actualMarginWidth>outerWidth&&(p.missRight=!0,p.missLeft=!1),o_left-outerWidth<=0&&(p.missLeft=!0,p.missRight=!1)}return p},top:function(t,s){var self=Foundation.libs.dropdown,p=self.dirs._base.call(this,t,s);return this.addClass("drop-top"),1==p.missTop&&(p.top=p.top+t.outerHeight()+this.outerHeight(),this.removeClass("drop-top")),1==p.missRight&&(p.left=p.left-this.outerWidth()+t.outerWidth()),(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu))&&self.adjust_pip(this,t,s,p),Foundation.rtl?{left:p.left-this.outerWidth()+t.outerWidth(),top:p.top-this.outerHeight()}:{left:p.left,top:p.top-this.outerHeight()}},bottom:function(t,s){var self=Foundation.libs.dropdown,p=self.dirs._base.call(this,t,s);return 1==p.missRight&&(p.left=p.left-this.outerWidth()+t.outerWidth()),(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu))&&self.adjust_pip(this,t,s,p),self.rtl?{left:p.left-this.outerWidth()+t.outerWidth(),top:p.top+t.outerHeight()}:{left:p.left,top:p.top+t.outerHeight()}},left:function(t,s){var p=Foundation.libs.dropdown.dirs._base.call(this,t,s);return this.addClass("drop-left"),1==p.missLeft&&(p.left=p.left+this.outerWidth(),p.top=p.top+t.outerHeight(),this.removeClass("drop-left")),{left:p.left-this.outerWidth(),top:p.top}},right:function(t,s){var p=Foundation.libs.dropdown.dirs._base.call(this,t,s);this.addClass("drop-right"),1==p.missRight?(p.left=p.left-this.outerWidth(),p.top=p.top+t.outerHeight(),this.removeClass("drop-right")):p.triggeredRight=!0;var self=Foundation.libs.dropdown;return(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu))&&self.adjust_pip(this,t,s,p),{left:p.left+t.outerWidth(),top:p.top}}},adjust_pip:function(dropdown,target,settings,position){var sheet=Foundation.stylesheet,pip_offset_base=8;dropdown.hasClass(settings.mega_class)?pip_offset_base=position.left+target.outerWidth()/2-8:this.small()&&(pip_offset_base+=position.left-8),this.rule_idx=sheet.cssRules.length;var sel_before=".f-dropdown.open:before",sel_after=".f-dropdown.open:after",css_before="left: "+pip_offset_base+"px;",css_after="left: "+(pip_offset_base-1)+"px;";1==position.missRight&&(pip_offset_base=dropdown.outerWidth()-23,sel_before=".f-dropdown.open:before",sel_after=".f-dropdown.open:after",css_before="left: "+pip_offset_base+"px;",css_after="left: "+(pip_offset_base-1)+"px;"),1==position.triggeredRight&&(sel_before=".f-dropdown.open:before",sel_after=".f-dropdown.open:after",css_before="left:-12px;",css_after="left:-14px;"),sheet.insertRule?(sheet.insertRule([sel_before,"{",css_before,"}"].join(" "),this.rule_idx),sheet.insertRule([sel_after,"{",css_after,"}"].join(" "),this.rule_idx+1)):(sheet.addRule(sel_before,css_before,this.rule_idx),sheet.addRule(sel_after,css_after,this.rule_idx+1))},clear_idx:function(){var sheet=Foundation.stylesheet;"undefined"!=typeof this.rule_idx&&(sheet.deleteRule(this.rule_idx),sheet.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(window).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document);