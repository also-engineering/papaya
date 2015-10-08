var $ = require("jquery");
var Backbone = require("Backbone");
var Recorder = require("Recorder");

var _ = require("lodash");

var RecorderView = Backbone.View.extend({

  events: {
    "touchstart button.RecorderView-play": "touchPlay",
    "touchstart button.RecorderView-stop-play": "touchStopPlay",
    "touchstart button.RecorderView-record": "touchRecord",
    "touchstart button.RecorderView-stop-record": "touchStopRecord",
  },
  initialize: function() {

    // Make a new recorder object and listen for events
    this.recorder = new Recorder();
    this.listenTo(this.recorder, "free", this.enable);
    this.listenTo(this.recorder, "busy", this.disable);

    this.template = _($("#RecorderView").html()).template();

  },
  render: function() {
    this.$el.html(this.template());
  },

  // returns true if there passed event should not be responded to
  invalidEvent: function(event) {

    // No event passed, method was called directly
    var noEvent = typeof event === "undefined";

    if (noEvent) {
      return false;
    }

    // The button is disabled
    var buttonIsDisabled = $(event.target).prop("disabled");

    if (buttonIsDisabled) {
      return true;
    }

  },
  touchPlay: function(e) {
    if (this.invalidEvent(e)) {
      return;
    }
    this.recorder.play();
    this.disable();
    this.enable("button.RecorderView-stop-play");
  },
  touchStopPlay: function(e) {
    if (this.invalidEvent(e)) {
      return;
    }
    this.recorder.stopPlay();
    this.disable("button.RecorderView-stop-play");
    this.enable();
  },
  touchRecord: function(e) {
    if (this.invalidEvent(e)) {
      return;
    }
    this.recorder.record();
    this.disable();
    this.enable("button.RecorderView-stop-record");
  },
  touchStopRecord: function(e) {
    if (this.invalidEvent(e)) {
      return;
    }
    this.recorder.stopRecord();
    this.disable("button.RecorderView-stop-record");
    this.enable();
  },
  disable: function(selectors) {
    if (typeof selectors === "undefined") {
      selectors = "button.RecorderView-play, button.RecorderView-record";
    }
    this.$el.find(selectors).prop("disabled", true);
  },
  enable: function(selectors) {
    if (typeof selectors === "undefined") {
      selectors = "button.RecorderView-play, button.RecorderView-record";
    }
    this.$el.find(selectors).prop("disabled", false);
  }
});

module.exports = RecorderView;