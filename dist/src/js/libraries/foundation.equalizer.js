!function($,window,document,undefined){"use strict";Foundation.libs.equalizer={name:"equalizer",version:"5.5.3",settings:{use_tallest:!0,before_height_change:$.noop,after_height_change:$.noop,equalize_on_stack:!1,act_on_hidden_el:!1},init:function(scope,method,options){Foundation.inherit(this,"image_loaded"),this.bindings(method,options),this.reflow()},events:function(){this.S(window).off(".equalizer").on("resize.fndtn.equalizer",function(e){this.reflow()}.bind(this))},equalize:function(equalizer){var vals,firstTopOffset,isStacked=!1,group=equalizer.data("equalizer"),settings=equalizer.data(this.attr_name(!0)+"-init")||this.settings;if(vals=settings.act_on_hidden_el?group?equalizer.find("["+this.attr_name()+'-watch="'+group+'"]'):equalizer.find("["+this.attr_name()+"-watch]"):group?equalizer.find("["+this.attr_name()+'-watch="'+group+'"]:visible'):equalizer.find("["+this.attr_name()+"-watch]:visible"),0!==vals.length&&(settings.before_height_change(),equalizer.trigger("before-height-change.fndth.equalizer"),vals.height("inherit"),settings.equalize_on_stack!==!1||(firstTopOffset=vals.first().offset().top,vals.each(function(){return $(this).offset().top!==firstTopOffset?(isStacked=!0,!1):void 0}),!isStacked))){var heights=vals.map(function(){return $(this).outerHeight(!1)}).get();if(settings.use_tallest){var max=Math.max.apply(null,heights);vals.css("height",max)}else{var min=Math.min.apply(null,heights);vals.css("height",min)}settings.after_height_change(),equalizer.trigger("after-height-change.fndtn.equalizer")}},reflow:function(){var self=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){var $eq_target=$(this),media_query=$eq_target.data("equalizer-mq"),ignore_media_query=!0;media_query&&(media_query="is_"+media_query.replace(/-/g,"_"),Foundation.utils.hasOwnProperty(media_query)&&(ignore_media_query=!1)),self.image_loaded(self.S("img",this),function(){if(ignore_media_query||Foundation.utils[media_query]())self.equalize($eq_target);else{var vals=$eq_target.find("["+self.attr_name()+"-watch]:visible");vals.css("height","auto")}})})}}}(jQuery,window,window.document);