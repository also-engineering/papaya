/*
 * Inserts a quick modal/overlay. .click destroys the DOM representation but another
 * call to render will create it again.
 */

var Backbone = require("Backbone");
var $ = require("jquery");
var _ = require("lodash");

var OverlayView = Backbone.View.extend({
  events: {
    "touchstart img": "render",
  },
  initialize: function() {
    this.templates = {
      container: _.template($("#OverlayView-container").html()),
      body: _.template($("#OverlayView-body").html())
    };
  },
  render: function(event) {

    event.stopPropagation();
    event.preventDefault();
    $(this.templates.container({}))
      .prependTo($("body"))
      .css({
        "height": $(document).height()
      })
      .click(function() {
        $(this).remove();
      })
      .append(this.templates.body({}));
  }
});

module.exports = OverlayView;