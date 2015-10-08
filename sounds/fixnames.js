var fs = require('fs');
console.log("testing");

function unicodeEscape(str) {
  return str.replace(/[\w]/g, function(character) {
    var escape = character.charCodeAt().toString(16),
        longhand = escape.length > 2;
    return '\\' + (longhand ? 'u' : 'x') + ('0000' + escape).slice(longhand ? -4 : -2);
  });
}

var r = new RegExp("[^a-z0-9_.]","g");
fs.readdir(".", function(err, files){
  files.forEach(function(file){
    if (r.test(file)) {
      var name = unicodeEscape(file.split(".")[0]);
      console.log(name);
    }
  });
});