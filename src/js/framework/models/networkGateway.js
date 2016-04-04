if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var NetworkGateway = Backbone.Model.extend({
        url: undefined,
        initialize: function () {}
    });
    return NetworkGateway;
});