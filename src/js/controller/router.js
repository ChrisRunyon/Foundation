if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var appview = null;
    var IndexView = require('views/indexView');
    var DetailView = require('views/detailView');

    var Router = Backbone.Router.extend({
        routes: {
            '#': '',
            '': 'index',
            'details': 'gotoDetails'
        },

        initialize: function (options) {
            if (options) {
                this.options = options || {};
            }
        },
        index: function () {
           
            this.appview = new IndexView();
            $("#content").html(this.appview.render().el);
        },
        gotoDetails: function () {
           
            this.appview = new DetailView();
            $("#content").html(this.appview.render().el);
        }

	});
    return Router;
});