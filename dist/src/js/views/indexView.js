if("function"!=typeof define)var define=require("amdefine")(module);define(function(require){"use strict";var Header="function"==typeof require?require("framework/modules/containers/header"):window.Header,IndexPage="function"==typeof require?require("apps/index/indexPage"):window.IndexPage,Footer="function"==typeof require?require("framework/modules/containers/footer"):window.Footer,IndexView=Backbone.View.extend({tagName:"div",className:"appwrapper",template:"",events:{},initialize:function(){this.header=new Header,this.indexPage=new IndexPage,this.footer=new Footer},destroy:function(){this.undelegateEvents(),this.unbind(),this.remove()},getTemplate:function(){var self=this;return $.get("js/templates/views/defaultView.html",function(data){var temp=Handlebars.compile(data);self.template=$("."+self.className).html(temp);var container=self.$el.find(".container");container.append(self.header.render().el),container.append(self.indexPage.render().el),container.append(self.footer.render().el)}),self.template},render:function(){var self=this;return self.getTemplate(),this}});return IndexView});