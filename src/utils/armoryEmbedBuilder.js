const { EmbedBuilder } = require("discord.js");

const { items } = require("./wowDatabase");

module.exports = {
  async ArmoryEmbedBuilder(data) {
    // Can't deconstruct *class* due to declaration conflict
    const {
      name,
      realm,
      online,
      level,
      faction,
      race,
      honorablekills,
      guild,
      talents,
      professions,
      gender,
      equipment,
    } = data;

    // Stringifying talents array
    let talentsString = talents.map((tt) => tt.tree);
    talentsString = talentsString.join("\n");

    // Stringifying professions array
    let profsString = professions.map((p) => `${p.name} - ${p.skill}`);
    profsString = profsString.join("\n");

    // Parsing gear data
    let gear = [];
    equipment.map((eq) => {
      gear.push({
        name: eq.name,
        id: eq.item,
      });
    });
    gear = gear.map((eq) => {
      let item = items.find((it) => it.itemId == eq.id);
      return {
        name: item.slot,
        value: item.name,
        inline: true,
      };
    });

    const newEmbed = new EmbedBuilder()
      .setColor("DarkRed")
      .setAuthor({
        name: `Warmane Armory - Onyxia`,
        iconURL: `https://wow.zamimg.com/images/wow/icons/large/classicon_${data.class.toLowerCase()}.jpg`,
        url: "https://armory.warmane.com",
      })
      .setTitle(`${name}\n${level}-${gender} ${race}`)
      .setURL(`http://armory.warmane.com/character/${name}/Onyxia/`)
      .addFields(
        {
          name: "Guild",
          value: (guild.length > 1 && guild) || "None",
          inline: true,
        },
        {
          name: "HKs",
          value: (honorablekills > 1 && honorablekills) || "None",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        },
        {
          name: "Talents*",
          value: (talentsString.length > 1 && talentsString) || "None",
          inline: true,
        },
        {
          name: "Professions",
          value: (profsString.length > 1 && profsString) || "None",
          inline: true,
        },
        {
          name: "\u200B",
          value: "\u200B",
        }
      )
      .addFields(gear)
      .addFields({
        name: "\u200B",
        value: "\u200B",
      })
      .setFooter({
        text: "* Talent tree detection is NOT working as intended until WOTLK",
      });
    return newEmbed;
  },
};
