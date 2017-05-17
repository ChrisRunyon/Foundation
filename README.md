# BackboneJS & Zurb Foundation
BackboneJS w/ Zurb Foundation 5.0

#### Dependencies:
  * nodeJS
  * gulpJS
  * requireJS
  * backboneJS
  * jQuery
  * underScoreJS
  * handleBarsJS
  * mochaPhantomJS
  * mocha (Behavior Driven Development)
  * Zurb Foundation 5.0
  
#### Usage:
  Clone Repo

  * ``` git clone https://github.com/ChrisRunyon/Foundation.git ```
  * ``` cd Foundation ```

  Terminal commands
  
  * ``` npm update ```
  
  Run gulpfile.js located in src/js/
  
  * ``` gulp ```
  
  Output to /dist folder
  
#### Test Output:
	1..1
	ok 1 indexPage should return -1 when the value is not present
	tests 1
	pass 1
	fail 0
	1..1
	ok 1 detailsPage should return -1 when the value is not present
	tests 1
	pass 1
	fail 0

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
        $(window).ready(function() {
            APP.launch();
        });
    });
```
