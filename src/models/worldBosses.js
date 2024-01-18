const mongoose = require("mongoose");

const WorldBoss = mongoose.model("WorldBoss", {
  name: String,
  slug: String,
  killedAt: Date,
  respawnCd: Date,
  respawnWindow: Date,
  hasSchedule: Boolean,
});

module.exports = WorldBoss;
