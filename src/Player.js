var Backbone = require("Backbone");
var $ = require("jquery");
var _ = require("lodash");

var jsesc = require("jsesc");

/*
 * Player
 * Wrapper for Cordova's Media plugin to play sounds and update with events.
 */
var Player = function() {};

Player.prototype.play = function(options) {
  var language = options.language;
  var key = options.key;
  var filename = Player.BASE_DIRECTORY + Player.convertBasename([language, key].join("_")) + ".mp3";
  var self = this;
  var boundStatus = function(code) {
    return self.status(code);
  };
  this.media = new Media(filename, $.noop, this.onError, boundStatus);
  this.media.play();
};

Player.prototype.status = function(code) {
  if (code === 4) {
    this.media.release();
    this.trigger("free");
  } else if (code === 1 || code === 2) {
    this.trigger("busy");
  }
};

Player.prototype.onError = function() {
  alert(JSON.stringify(arguments));
};

_.extend(Player.prototype, Backbone.Events);

Object.defineProperty(Player, "convertBasename", {
  value: function(s) {
    return jsesc(s, {
      escapeEverything: true
    }).toLowerCase().replace(/\\/g, "");
  }
});

Object.defineProperty(Player, "BASE_DIRECTORY", {
  value: "/android_asset/www/assets/sounds/"
});


module.exports = Player;