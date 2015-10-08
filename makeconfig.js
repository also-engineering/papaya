#!/usr/bin/env node


var fs       = require("fs");
var beautify = require('js-beautify').js_beautify;

var PATH = "./newsounds/";

// only used for string replacement, not filtering  
var EXTENSION = ".mp3";

fs.readdir( PATH, function(err, dir) {

  if (err) {
    return console.log("couldn't read directory " + PATH);
  }

  var configs = {};

  dir.forEach(function(file) {

    file = file.replace(EXTENSION, "");

    // Get the language name, and then the rest of the phoneme name
    var parts = file.split("_");
    var language = parts.shift();

    // Join again in case the phoneme name has underscores
    var phoneme  = parts.join("_");

    if (typeof configs[language] === "undefined") {
      configs[language] = {
        label: "",
        code: language,
        layout : {
          style : "table"
        },
        phonemes: []
      };
    }

    var phonemeObject = {
      id    : configs[language].phonemes.length,
      label : phoneme,
      key   : phoneme,
    };

    configs[language].phonemes.push(phonemeObject);

  });


  // Go through each configuration object 
  Object.keys(configs).forEach(function(language){

    // make a config file body
    var fileBody = "/* Generated config file */\n\n" +
                   "module.exports = {{json}};";

    fileBody = fileBody.replace("{{json}}", JSON.stringify(configs[language]));
    fileBody = beautify(fileBody, { indent_size: 2 } );

    // use the filename convention
    var fileName = "./src/Conf" + language.toUpperCase() + ".js";

    // Write the file and log any errors
    fs.writeFile(fileName, fileBody, function(err) {
      if(err) {
        console.log('\u0007');
        return console.log(err);
      }
    });

  });

});