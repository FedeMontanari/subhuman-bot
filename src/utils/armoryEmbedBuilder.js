const { EmbedBuilder } = require("discord.js");

module.exports = {
  async ArmoryEmbedBuilder(data) {
    // Can't deconstruct class due to declaration conflict
    const {
      name,
      realm,
      online,
      level,
      faction,
      race,
      honorablekills,
      guild,
      equipment,
      talents,
      professions,
      gender,
    } = data;

    let talentsString = talents.map((tt) => tt.tree);
    talentsString = talentsString.join("\n");
    let profsString = professions.map((p) => `${p.name} - ${p.skill}`);
    profsString = profsString.join("\n");

    const newEmbed = new EmbedBuilder()
      .setColor("DarkRed")
      .setAuthor({
        name: `${name} - lv ${level}`,
        iconURL: `https://wow.zamimg.com/images/wow/icons/large/classicon_${data.class.toLowerCase()}.jpg`,
      })
      .setTitle(`${gender} ${race}`)
      .addFields(
        {
          name: "Guild",
          value: guild,
        },
        {
          name: "HKs",
          value: honorablekills,
        },
        {
          name: "Talents",
          value: talentsString,
        },
        {
          name: "Professions",
          value: profsString,
        }
      );
    return newEmbed;
  },
};
