if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var EventRegister = {
    };

    var EventListener = _.extend({}, Backbone.Events);

    var EventCallout = {
        CREATE_MODAL: 'CREATE_MODAL',
        CLOSE_MODAL: 'CLOSE_MODAL',
    };
  
    EventListener.on('CREATE_MODAL', function (data) {
        $("body").wrapInner( function ()  {
            return "<div class='blocker'></div>";
        });
        var view = data.view;
        $("body").append("<div class='modal'></div>");
        $(".modal").append(view.render().el);
    });

    EventListener.on('CLOSE_MODAL', function () {
        $("body").find('.blocker').children().unwrap();
        $(".modal").remove();
    });

    EventRegister.EventListener = EventListener;
    EventRegister.EventCallout = EventCallout;
    return EventRegister;
});