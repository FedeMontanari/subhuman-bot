const mongoose = require("mongoose")

const WorldBoss = mongoose.model("WorldBoss", {
    name: String,
    killedAt: Date,
    respawnWindow: Date,
})

module.exports = WorldBoss;