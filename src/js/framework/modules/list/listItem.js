if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var ListItem = Backbone.View.extend({
        tagName: "li",
        className: "listItem",
        template: '',
        no_cache: new Date().getTime(),

        events: {
            // using mouse events to test
            "click": "onClick",
            "mouseover": "onOver",
            "mouseout": "onOut"
        },
        
        initialize: function (options) {
            this.model = options.data;
        },

        onClick: function(evt) {
            this.$el.find('#firstModal').foundation('reveal','open');
        },

        onOver: function(evt) {
            this.$el.addClass("is-over");
        },

        onOut: function(evt) {
            this.$el.removeClass("is-over");
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;
            
            self.template = require('text!templates/modules/list/listItem.html');
                
            return self.template;
        },

        render: function () {
            var self = this;
            var tmpl = this.getTemplate();

            var markup = _.template(tmpl);
            
            self.$el.html(markup(self.model));
    
            return this;
        }
    });
    return ListItem;
});