const { EmbedBuilder } = require("discord.js");

module.exports = {
  async WorldBossEmbedBuilder(data) {
    let { name, killedAt, respawnCd, respawnWindow } = data;

    let image;

    switch (name) {
      case "Kazzak":
        image =
          "https://cdn.discordapp.com/attachments/1137083131355201556/1195945164028526683/kazzak.jpg?ex=65b5d5ba&is=65a360ba&hm=4b32479a3338b4600e4e1ee38dffe6637692e03a7e1dab7bad3c893c363c6bd6&";
        break;

      case "Azuregos":
        image =
          "https://cdn.discordapp.com/attachments/1137083131355201556/1195945861759389766/iu.png?ex=65b5d661&is=65a36161&hm=60b820466b5847bf020a76a8e3d30a17fb8b4d16f1913a874c06190dbcba66bd&";
        break;

      default:
        break;
    }
    const newEmbed = new EmbedBuilder()
      .setColor("DarkPurple")
      .setAuthor({
        name: "World Boss Tracker",
        iconURL:
          "https://is2-ssl.mzstatic.com/image/thumb/Purple127/v4/e3/f9/85/e3f9859e-ac14-4f9b-65af-585cc3001520/mzl.uiewpckz.png/512x512bb.jpg",
      })
      .setTitle(`${name}`)
      .addFields(
        {
          name: "Killed at",
          value: `${killedAt.getUTCHours()}:${killedAt.getUTCMinutes()} ST\n${killedAt.getUTCDate()}/${
            killedAt.getUTCMonth() + 1
          }/${killedAt.getUTCFullYear()}`,
          inline: true,
        },
        {
          name: "Respawn CD",
          value: `${respawnCd.getUTCHours()}:${respawnCd.getUTCMinutes()} ST\n${respawnCd.getUTCDate()}/${
            respawnCd.getUTCMonth() + 1
          }/${respawnCd.getUTCFullYear()}`,
          inline: true,
        },
        {
          name: "Window ends",
          value: `${respawnWindow.getUTCHours()}:${respawnWindow.getUTCMinutes()} ST\n${respawnWindow.getUTCDate()}/${
            respawnWindow.getUTCMonth() + 1
          }/${respawnWindow.getUTCFullYear()}`,
          inline: true,
        }
      )
      .setImage(
        image ||
          "https://discord.com/assets/e4ec7c5d7af5342f57347c9ada429fba.gif"
      );

    return newEmbed;
  },
};
