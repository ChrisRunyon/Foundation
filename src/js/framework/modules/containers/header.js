if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var EventRegister = (typeof require === 'function') ? require('framework/events/eventRegister') : window.EventRegister;

    /**
    * 
    * Default Header 
    *
    */
    var Header = Backbone.View.extend({
        tagName: 'div',
        className: 'headerwrapper',
        template: '',
        cookie: null,

        events: {
        },

        initialize: function () {
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;

            $.get('js/templates/modules/containers/header.html', function(data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp(self.cookie)).foundation();
            });

        },

        render: function () {
            var self = this;

            self.getTemplate();
            
            return this;
        }
    });
    return Header;
});