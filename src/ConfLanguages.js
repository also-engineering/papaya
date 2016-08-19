/*
 * This keeps the language configuration data separate from the Conf helper.
 * Useful for testing.
 */

var Conf = require("Conf");

Conf.add([
  require("ConfOR"), // Afan Oromo
  require("ConfAM"), // Amhara
  require("ConfHY"), // Hadiyya
  require("ConfSD"), // Sidaamu Afoo
  require("ConfSO"), // Somali
  require("ConfTG"), // Tigrigna
  require("ConfWT"), // Wlayittatto
]);

module.exports = Conf;