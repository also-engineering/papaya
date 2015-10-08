/*
 * Displays a selector
 * depends on RadioButtonView
 * emits change when different option is selected and passes value
 */

var Backbone = require("Backbone");
var $ = require("jquery");
var _ = require("lodash");

var SelectorView = Backbone.View.extend({

  events: {
    "touchstart .indicator": "toggle",
  },

  initialize: function(options) {
    this.templates = {
      layout: _.template($("template#SelectorView-layout").html()),
      item: _.template($("template#SelectorView-item").html())
    };
    this.languages = options.languages;
    this.title = options.title;
    this.languageByCode = this.languages.reduce(function(obj, cur) {
      obj[cur.value] = cur.label;
      return obj;
    }, {});

  },

  update: function(code) {
    this.$el.find(".indicator").html(this.languageByCode[code]);
    this.$el.find(".pure-menu-children").hide();
  },

  toggle: function() {
    this.$el.find(".pure-menu-children").toggle();
  },

  render: function() {

    // Render layout template to DOM
    this.$el.html(this.templates.layout({
      title: this.title
    }));

    // Sort languages alphabetically
    var alphabetically = function(a,b) {
      if (a.label < b.label){
        return -1;
      } else if (a.label > b.label) {
        return 1;
      } else {
        return 0;
      }
    };

    var sortedLangages = this.languages.sort(alphabetically);

    // create li options for dropdown list
    var optionsHtml = sortedLangages.map(function(language) {
      return this.templates.item(language);
    }, this).join("");

    // render options
    this.$el.find(".pure-menu-children").html(optionsHtml);
  }

});

module.exports = SelectorView;