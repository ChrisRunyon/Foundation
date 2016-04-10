# Foundation
BackboneJS w/ Foundation

#### Dependencies:
  * nodejs
  * gulp
  
#### Usage:
  * To get latest node packages Run npm update
  * Run gulp to minify and create dist folder

#### Routes:
``` html
	var Router = Backbone.Router.extend({
        routes: {
            '#': '',
            '': 'index'
        },
```
#### Model Fetch:
``` html
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
``` html
	var EventListener = _.extend({}, Backbone.Events);

	 EventListener.on('ONCLICK', function (evt) {
        this.trigger(EventRegister.EVENT_NAME, evt);
    });
```
#### Grid: 
``` html
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
``` html
	$.get('js/templates/modules/containers/header.html', function(data) {
        var temp = Handlebars.compile(data);
        self.template = $('.' + self.className).html(temp).foundation();
    });
```
#### Config:
``` html
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
  
#### Example:
  [http://modernjs.aplacefor3d.com] (http://modernjs.aplacefor3d.com)

#### Note:
I worked at a startup that has lots of bad reviews. I no longer work there but before I left I was able to convince the team to use BackboneJS. Everyone agreed. Their lead front-end developer loved Foundation and he decided to include that too. A long time has passed and their site is still the same so here I am putting this on Github in hopes of helping them and to make a point that it's a good time to hire a new developer. Wasted time is wasted money and if your developer(s) aren't good it's time to look elsewhere. This is a common problem where politics is emphasized over engineering. Usually because good engineering is in shorter supply. This might even help the sad designer who's claim to fame is creating bookmarks in Chrome and using a blog that looks like it's from 1999. I can't give you talent so stop asking. I don't owe you anything. I get requests for coding 'tests' (or free work?) so this might help with that too. If you had enough of bad decision making and fear mongering against change in your organization, contact someone who is no nonsense when it comes to engineering - chris@plasmicmedia.com. Don't think that you are protecting your business by ignoring the obvious. This is proof.

#### Free Software:
Please consider donating in order to continue work for free software.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVACW559Q5Z92)

Thanks