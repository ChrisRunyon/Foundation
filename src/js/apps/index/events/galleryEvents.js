if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var GalleryEvents = {};

    var EventListener = _.extend({}, Backbone.Events);

    var EventCallout = {
        HANDLER: 'ONCLICK'
    };

    EventListener.on('ONCLICK', function (evt) {
        //SeatingChart.data.push(evt.model);
        //window.location.href = "/model/" + evt.model.link;
        console.log('ONCLICK');
        //this.trigger(EventRegister.EventCallout.END_ADD_SEAT, evt);
    });

    GalleryEvents.EventListener = EventListener;
    GalleryEvents.EventCallout = EventCallout;
    return GalleryEvents;
});