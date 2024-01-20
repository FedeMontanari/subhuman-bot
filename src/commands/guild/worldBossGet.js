const { SlashCommandBuilder } = require("discord.js");
const WorldBoss = require("../../models/worldBosses");
const { WorldBossEmbedBuilder } = require("../../utils/worldBossEmbedBuilder");

const stringOptions = new SlashCommandStringOption()
  .setName("name")
  .setDescription("Select the name of the boss")
  .setRequired(true)
  .addChoices(
    {
      name: "Kazzak",
      value: "kazzak",
    },
    {
      name: "Azuregos",
      value: "azuregos",
    },
    {
      name: "Emeriss",
      value: "emeriss",
    },
    {
      name: "Lethon",
      value: "lethon",
    },
    {
      name: "Taerar",
      value: "taerar",
    },
    {
      name: "Ysondre",
      value: "ysondre",
    }
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showboss")
    .setDescription("Show World Boss timers")
    .addStringOption(stringOptions),
  async execute(interaction) {
    await interaction.deferReply();

    let boss;
    let value = interaction.options.getString("name");

    try {
      boss = await WorldBoss.findOne({
        slug: value,
      });
      if (boss) {
        return await interaction.editReply({
          embeds: [await WorldBossEmbedBuilder(boss)],
        });
      } else {
        return await interaction.editReply("Entry for that bsos not found");
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply(
        "An error occurred, please try again!"
      );
    }
  },
};
