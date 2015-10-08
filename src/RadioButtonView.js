/*
 * Shows a series of buttons, only one is selectable at a time.
 * @default selection is whatever is indexed at 0.
 */

var Backbone = require("Backbone");
var $ = require("jquery");
var _ = require("lodash");

var RadioButtonView = Backbone.View.extend({
  events: {
    "touchstart button": "onTouch"
  },
  initialize: function(options) {

    this.templates = {
      button: _.template($("template#RadioButtonView").html())
    };

    // options.options must be an array of objects {label:"", value:""}
    this.options = options.options;

    // @default first option
    this.index = 0;
  },
  onTouch: function(event) {
    // Don't do anything unless a new option is selected
    var newIndex = $(event.target).attr("data-index");
    if (this.index === newIndex) {
      return;
    }
    this.index = newIndex;
    this.updateButtons();
    this.trigger("change", this.value());
  },
  value: function() {
    return this.options[this.index].value;
  },
  updateButtons: function() {
    this.$buttons.removeClass("RadioButtonView-selected");
    this.$buttons.eq(this.index).addClass("RadioButtonView-selected");
  },
  render: function() {
    var html = this.options.map(function(option, index) {
      // // @default first option. adds selection class
      var classes = (index === this.index) ? "RadioButtonView-selected" : "";
      return this.templates.button({
        label: option.label,
        index: index,
        classes: classes
      });
    }, this).join("");
    this.$el.html(html);
    // Cache the buttons for later
    this.$buttons = this.$el.find("button");
  }
});

module.exports = RadioButtonView;