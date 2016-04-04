if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';
 
    var Router    = (typeof require === 'function') ? require('router')     : window.Router;

    var APP = {};

    APP.launch = function (options) {

        _.templateSettings = { evaluate: /\{\%(.+?)\%\}/g,
                          interpolate: /\{\{(.+?)\}\}/g };

        this.route = new Router();

        Backbone.history.start();
    };

    return APP;
});
