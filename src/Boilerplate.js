/*
 * This file should only be used for the most basic configuration. Things that will not change.
 */

var _ = require("lodash");

// Backbone fix. Give backbone the jQuery it wants but doesn't know how to ask for.
var Backbone = require("Backbone");
var $ = require("jquery");
Backbone.$ = $;

// Change templates to {{}} style, instead of default erb style.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};


// This is required to add the languages to the Conf object.
require("ConfLanguages");