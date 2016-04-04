if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var EventRegister = (typeof require === 'function') ? require('framework/events/eventRegister') : window.EventRegister,
        CookieManager = (typeof require === 'function') ? require('cookiemanager')                  : window.CookieManager;

    var HeaderLoggedIn = Backbone.View.extend({
        tagName: 'div',
        className: 'headerwrapper',
        template: '',
        cookie: null,

        events: {
            'click #search': 'search',
            'click #logout': 'logout'
        },

        initialize: function () {
            this.fetchAuthCookie();
        },

        search: function () {
            var keywords = $('#input-search').val();
            window.location.href = '/models/'+keywords;
        },

        logout: function () {
            this.cookie = null;
            CookieManager.deleteCookie('username');
            CookieManager.deleteCookie('oauth_consumer_key');
            CookieManager.deleteCookie('oauth_signature');
            CookieManager.deleteCookie('oauth_signature_metho');
            CookieManager.deleteCookie('oauth_token');
            CookieManager.deleteCookie('oauth_version');
            window.location.href = '/';
        },
      
        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        fetchAuthCookie: function () {
            this.cookie = {
                username: CookieManager.readCookie('username'),
                oauth_consumer_key: CookieManager.readCookie('oauth_consumer_key'),
                oauth_signature: CookieManager.readCookie('oauth_signature'),
                oauth_signature_method: CookieManager.readCookie('oauth_signature_method'),
                oauth_token: CookieManager.readCookie('oauth_token'),
                oauth_version: CookieManager.readCookie('oauth_version')
            };
        },

        getTemplate: function () {
            var self = this;

            $.get('js/templates/modules/containers/header-loggedin.html', function(data) {
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
    return HeaderLoggedIn;
});