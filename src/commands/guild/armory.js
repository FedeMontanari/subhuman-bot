const { default: axios } = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const { ArmoryEmbedBuilder } = require("../../utils/armoryEmbedBuilder");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("armory")
    .setDescription("Get a character's armory for Onyxia realm")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Enter the character's name")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    let name = interaction.options.getString("name");
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      try {
        const apiRes = await axios.get(
          `http://armory.warmane.com/api/character/${name}/Onyxia/`
        );
        return await interaction.editReply({
          embeds: [await ArmoryEmbedBuilder(apiRes.data)],
        });
      } catch (error) {
        console.error(error);
        return await interaction.editReply(
          "An error occurred, please try again!"
        );
      }
    }
  },
};
