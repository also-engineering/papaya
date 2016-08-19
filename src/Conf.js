/*
 * This tells the program what languages to display.
 * Additional language specific configurations are required separately.
 * The `update` function is run once to provide easy lookup indexes.
 * If the `Conf` object is changed manually, `update` should be run again to refresh the indexes.
 * @TODO An individual language should probably be its own object.
 */

var Conf = {
  languages : [],


  add : function(newLanguages) {

  // sanitize argument
  var argIsntArray = !(newLanguages instanceof Array);
  if (argIsntArray) {
    newLanguages = [newLanguages];
  }

  // add languages and update
  this.languages = this.languages.concat(newLanguages);

  // quick sanity check
  var uniqueLanguagesByCode = Object.keys(this.languages.reduce(function(obj, el) {
    obj[el.code] = true;
    return obj;
  }, {})).length;
  var languageCount = this.languages.length;
  if (uniqueLanguagesByCode !== languageCount) {
    alert("Configruation error. Duplicate language codes.");
  }

  this.update();

},

  update : function() {
  this.languageByCode = this.languages.reduce(function(obj, el) {
    obj[el.code] = el;
    return obj;
  }, {});

  // build a phoneme hash for each language
  this.languages.forEach(function(language) {
    language.phonemesById = language.phonemes.reduce(function(obj, el) {
      obj[el.id] = el;
      return obj;
    }, {});
  });

  this.updateLayouts();

},


  updateLayouts : function() {

  // Build a layout for each laguage for easy templating
  this.languages.forEach(function(language) {

    // For a "table" layout build an array of arrays
    if (language.layout.style == "table") {

      language.layout.table = {
        rows: []
      };

      // If it has specified indexes in a table, then use those
      if (typeof language.layout.indexes != "undefined") {
        language.layout.indexes.forEach(function(row) {
          language.layout.table.rows.push({
            cells: row.map(function(cell) {
              return language.phonemesById[cell];
            })
          });
        });
      } else { // Otherwise, make the indexes up, based on DEFAULT_TABLE_WIDTH
        var c = 0;
        while (c < language.phonemes.length) {
          var row = {
            cells: []
          };
          var z = Conf.DEFAULT_TABLE_WIDTH;
          while (z--) {
            row.cells.push(language.phonemes[c++]);
          }
          language.layout.table.rows.push(row);
        }
      }

    } // language.layout.style == "table"

  });
  }
};

Object.defineProperty(Conf, "DEFAULT_TABLE_WIDTH", {
  value: 6
});

module.exports = Conf;