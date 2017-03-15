# Foundation
BackboneJS w/ Foundation

#### Dependencies:
  * nodejs
  * gulp
  
#### Usage:
  * To get latest node packages Run npm update
  * Run gulp to minify and create dist folder

#### Routes:
``` javascript
	var Router = Backbone.Router.extend({
        routes: {
            '#': '',
            '': 'index'
        },
```
#### Model Fetch:
``` javascript
	var NetworkGateway = Backbone.Model.extend({
        url: undefined,
        initialize: function () {}
    });

    NetworkGateway.url = "https://example.net";
    $.when(NetworkGateway.fetch()).then(function (responseText) {
        self.create(responseText);
    });
```
#### Events:
``` javascript
	var EventListener = _.extend({}, Backbone.Events);

	 EventListener.on('ONCLICK', function (evt) {
        this.trigger(EventRegister.EVENT_NAME, evt);
    });
```
#### Grid: 
``` javascript
	createGridContainer: function (data) {
        var options = {
            data: data.result,
            elements: 100
        };
        this.gridcontainer = new GridBase(options);
        var container = this.$el.find(".galleryContainer");
        container.append(this.gridcontainer.render().el);
    },
``` 
#### HTML templates:
``` javascript
	$.get('js/templates/modules/containers/header.html', function(data) {
        var temp = Handlebars.compile(data);
        self.template = $('.' + self.className).html(temp).foundation();
    });
```
#### Config:
``` javascript
	requireConfig({basePath: 'js'});
        require(['require',
        'jquery',
        'backbone',
        'underscore',
        'handlebars',
        'foundation.core',
        'foundation.reveal',
        'default/index'],
        function (require, $, Backbone, _, Handlebars, Foundation, FoundationReveal, APP) {
        window.$ = $;
        window.Backbone = Backbone;
        window._ = _;
        window.Handlebars = Handlebars;
        APP.launch();
    });
```
