const mongoose = require("mongoose")

const WorldBoss = mongoose.model("WorldBoss", {
    name: String,
    slug: String,
    killedAt: Date,
})

module.exports = WorldBoss;