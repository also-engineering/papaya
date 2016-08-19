
var Conf = require("Conf");

var phonemes = [{
  "id": 0,
  "label": "a",
  "key": "a"
}, {
  "id": 11,
  "label": "ሁ",
  "key": "ሁ"
}, {
  "id": 22,
  "label": "g",
  "key": "g"
}, {
  "id": 33,
  "label": "∂",
  "key": "∂"
}];

var language = {
  "label": "English",
  "code": "en",
  "layout": {
    "style": "table",
    "indexes": [
      [0, 11],
      [22, 33],
    ]
  },
  "phonemes": phonemes
};

var languageNoIndex = {
  "label": "English",
  "code": "en",
  "layout": {
    "style": "table"
  },
  "phonemes": phonemes
};

describe("Configuration", function() {

  it("Initialized with no languages", function() {
    var c = Conf;
    expect(c.languages).to.have.length(0);
  });

  it("Adding a language", function() {
    var c = Conf;
    c.add(language);
    expect(c.languages).to.have.length(1);
  });

  it("Indexing languages by code", function() {
    var c = Conf;
    c.add(language);
    expect(c.languageByCode["en"]).to.not.be.null;
  });

  it("Indexing phonemes by id", function() {
    var c = Conf;
    c.add(language);
    var firstLanguage = c.languages[0];
    expect(firstLanguage.phonemesById[0]).to.not.be.null;
    expect(firstLanguage.phonemesById[11]).to.not.be.null;
    expect(firstLanguage.phonemesById[22]).to.not.be.null;
    expect(firstLanguage.phonemesById[33]).to.not.be.null;
  });

  it("Table layout with indexes", function() {
    var c = Conf;
    c.add(language);
    var firstLanguage = c.languages[0];
    expect(firstLanguage.layout.table.rows[0].cells[0].key).to.equal(phonemes[0].key);
    expect(firstLanguage.layout.table.rows[0].cells[1].key).to.equal(phonemes[1].key);
    expect(firstLanguage.layout.table.rows[1].cells[0].key).to.equal(phonemes[2].key);
    expect(firstLanguage.layout.table.rows[1].cells[1].key).to.equal(phonemes[3].key);
  });

  it("Table layout without indexes", function() {
    var c = Conf;
    c.add(languageNoIndex);
    var firstLanguage = c.languages[0];
    expect(firstLanguage.layout.table.rows[0].cells[0].key).to.equal(phonemes[0].key);
    expect(firstLanguage.layout.table.rows[0].cells[1].key).to.equal(phonemes[1].key);
    expect(firstLanguage.layout.table.rows[0].cells[2].key).to.equal(phonemes[2].key);
    expect(firstLanguage.layout.table.rows[0].cells[3].key).to.equal(phonemes[3].key);
  });

});