if("function"!=typeof define)var define=require("amdefine")(module);define(function(require){"use strict";var GenericModel="function"==typeof require?require("framework/models/genericModel"):window.GenericModel,EventRegister="function"==typeof require?require("framework/events/eventRegister"):window.EventRegister,AddPasswdControls=Backbone.View.extend({tagName:"div",className:"modalcontainer",template:"",model:new GenericModel,events:{submit:"submit","click #close":"close"},initialize:function(){},destroy:function(){this.undelegateEvents(),this.unbind(),this.remove()},close:function(){EventRegister.EventListener.trigger(EventRegister.EventCallout.CLOSE_MODAL)},submit:function(e){e.preventDefault()},getTemplate:function(){var self=this;return self.template=require("text!templates/modules/containers/modal.html"),self.template},render:function(){var self=this,tmpl=this.getTemplate(),markup=_.template(tmpl);return self.$el.html(markup()),this}});return AddPasswdControls});