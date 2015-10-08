/*
 * This class records and playsback sounds using cordova's plugin: org.apache.cordova.media.
 */

var $ = require("jquery");
var _ = require("lodash");
var Backbone = require("Backbone");

var Recorder = function() {
  this.timer = null;
};

Recorder.prototype = {

  record: function() {
    var self = this;
    this.media = new Media(Recorder.FILENAME, $.noop, $.noop, function(code) {
      return self.status(code);
    });
    this.media.startRecord();
  },

  stopRecord: function() {
    this.media.stopRecord();
  },

  play: function() {
    var self = this;
    this.media = new Media(Recorder.FILENAME, $.noop, $.noop, function(code) {
      return self.status(code);
    });
    this.media.play();
  },

  stopPlay: function() {
    this.media.stop();
  },


  freeHook: function() {
    this.media.release();
    if (typeof this.timer !== "undefined") {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  busyHook: function() {
    var self = this;
    this.timer = setTimeout(function() {
      return self.stop();
    }, Recorder.MAX_TIME);
  },
  status: function(code) {
    if (code === 4) {
      this.freeHook();
      this.trigger("free");
    } else if (code === 1 || code === 2) {
      this.busyHook();
      this.trigger("busy");
    }
  }
};

_.extend(Recorder.prototype, Backbone.Events);

// Constant pool

/*
 * The name of the temporary-ish file that we use for recording.
 * Each recording will use the same filename and overwrite the previous recording.
 */
Object.defineProperty(Recorder, "FILENAME", {
  value: "recording.wav"
});

/*
 * A setTimeout method is called to stop the recording after this many milliseconds has passed.
 */
Object.defineProperty(Recorder, "MAX_TIME", {
  value: 10000
});

module.exports = Recorder;