!function($,window,document,undefined){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.5.3",settings:{content_class:"content",active_class:"active",multi_expand:!1,toggleable:!0,callback:function(){}},init:function(scope,method,options){this.bindings(method,options)},events:function(instance){var self=this,S=this.S;self.create(this.S(instance)),S(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > dd > a, ["+this.attr_name()+"] > li > a",function(e){var accordion=S(this).closest("["+self.attr_name()+"]"),groupSelector=self.attr_name()+"="+accordion.attr(self.attr_name()),settings=accordion.data(self.attr_name(!0)+"-init")||self.settings,target=S("#"+this.href.split("#")[1]),aunts=$("> dd, > li",accordion),siblings=aunts.children("."+settings.content_class),active_content=siblings.filter("."+settings.active_class);return e.preventDefault(),accordion.attr(self.attr_name())&&(siblings=siblings.add("["+groupSelector+"] dd > ."+settings.content_class+", ["+groupSelector+"] li > ."+settings.content_class),aunts=aunts.add("["+groupSelector+"] dd, ["+groupSelector+"] li")),settings.toggleable&&target.is(active_content)?(target.parent("dd, li").toggleClass(settings.active_class,!1),target.toggleClass(settings.active_class,!1),S(this).attr("aria-expanded",function(i,attr){return"true"===attr?"false":"true"}),settings.callback(target),target.triggerHandler("toggled",[accordion]),void accordion.triggerHandler("toggled",[target])):(settings.multi_expand||(siblings.removeClass(settings.active_class),aunts.removeClass(settings.active_class),aunts.children("a").attr("aria-expanded","false")),target.addClass(settings.active_class).parent().addClass(settings.active_class),settings.callback(target),target.triggerHandler("toggled",[accordion]),accordion.triggerHandler("toggled",[target]),void S(this).attr("aria-expanded","true"))})},create:function($instance){var self=this,accordion=$instance,aunts=$("> .accordion-navigation",accordion),settings=accordion.data(self.attr_name(!0)+"-init")||self.settings;aunts.children("a").attr("aria-expanded","false"),aunts.has("."+settings.content_class+"."+settings.active_class).addClass(settings.active_class).children("a").attr("aria-expanded","true"),settings.multi_expand&&$instance.attr("aria-multiselectable","true")},toggle:function(options){var options="undefined"!=typeof options?options:{},selector="undefined"!=typeof options.selector?options.selector:"",toggle_state="undefined"!=typeof options.toggle_state?options.toggle_state:"",$accordion="undefined"!=typeof options.$accordion?options.$accordion:this.S(this.scope).closest("["+this.attr_name()+"]"),$items=$accordion.find("> dd"+selector+", > li"+selector);if($items.length<1)return window.console&&console.error("Selection not found.",selector),!1;var S=this.S,active_class=this.settings.active_class;$items.each(function(){var $item=S(this),is_active=$item.hasClass(active_class);(is_active&&"close"===toggle_state||!is_active&&"open"===toggle_state||""===toggle_state)&&$item.find("> a").trigger("click.fndtn.accordion")})},open:function(options){var options="undefined"!=typeof options?options:{};options.toggle_state="open",this.toggle(options)},close:function(options){var options="undefined"!=typeof options?options:{};options.toggle_state="close",this.toggle(options)},off:function(){},reflow:function(){}}}(jQuery,window,window.document);