const Database = require("wow-classic-items");

const items = new Database.Items();
const professions = new Database.Professions();
const zones = new Database.Zones();
const classes = new Database.Classes();

module.exports = {
  items,
  professions,
  zones,
  classes,
};
