if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var NetworkGateway = (typeof require === 'function') ? require('framework/models/networkGateway') : window.NetworkGateway,
        GridBase       = (typeof require === 'function') ? require('framework/modules/grid/gridBase') : window.GridBase;

    /**
    *
    *  Default Application Index Page
    *
    */
    var IndexPage = Backbone.View.extend({
        tagName: "div",
        className: "pagewrapper",
        template: '',
        model: new NetworkGateway(),
        no_cache: new Date().getTime(),
        cookie: null,

        initialize: function () {},

        initData: function () {
            var self = this;
            
            this.model.url = "js/stubs/AllMovies.json";
            $.when(this.model.fetch()).then(function (responseText) {
                self.createGridContainer(responseText);
            
            });
        },

        createGridContainer: function (data) {
            var options = {
                data: data.result,
                elements: 100
            };
            this.gridcontainer = new GridBase(options);
            var container = this.$el.find(".galleryContainer");
            container.append(this.gridcontainer.render().el);
        },

        destroy: function () {
            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        getTemplate: function () {
            var self = this;

            $.get('js/apps/index/indexPage.html?r=' + self.no_cache, function (data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp);

                self.initData();
            });

        },

        render: function () {
            var self = this;

            self.getTemplate();

            return this;
        }
    });
    return IndexPage;
});