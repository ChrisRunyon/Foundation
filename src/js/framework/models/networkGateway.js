if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    /**
    *
    * Default Model Network Gateway
    * 
    */
    var NetworkGateway = Backbone.Model.extend({
        url: undefined,
        initialize: function () {}
    });
    return NetworkGateway;
});