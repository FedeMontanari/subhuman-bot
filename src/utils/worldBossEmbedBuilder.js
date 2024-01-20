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

      case "Emeriss":
        image =
          "https://cdn.discordapp.com/attachments/1137083131355201556/1198402517923540992/iu.png?ex=65bec651&is=65ac5151&hm=b88855aaea952cfdad6d11059cdf512fded097a00b94236a2f706f3aa2f63241&";
        break;

      case "Lethon":
        image =
          "https://cdn.discordapp.com/attachments/1137083131355201556/1198404293670219916/iu.png?ex=65bec7f8&is=65ac52f8&hm=893ab5dabaef37cb0a0a8c809a4a27b8decbcf46607590f1260cb905accb4f6e&";
        break;

      case "Taerar":
        image =
          "https://cdn.discordapp.com/attachments/1137083131355201556/1198404704967860284/iu.png?ex=65bec85a&is=65ac535a&hm=bdbd90a892464195acaf4861ed1b6a46a39de0cfea088af4e65cbfbd6132ceee&";
        break;

      case "Ysondre":
        image =
          "https://cdn.discordapp.com/attachments/1137083131355201556/1198404962770751608/iu.png?ex=65bec898&is=65ac5398&hm=0e1621687478cef6be2e6f0552cc30bb70b0d4741caab2f82cc020f60a8a5f80&";
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
