var Router = require("Router");
var $ = require("jquery");
var Backbone = require("Backbone");

// Most basic configuration and set up.
require("Boilerplate");

var boot = function() {
  $(function() {
    new Router();
    Backbone.history.start();
  });
};

// Add this for basic testing. Won't support recording or playback.
if (typeof window.cordova === "undefined") {
  boot();
} else {
  document.addEventListener("deviceready", boot, false);
}