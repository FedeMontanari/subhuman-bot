const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wboss")
    .setDescription("Get the respawn window for a world boss")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Select the boss")
        .setRequired(true)
        .addChoices(
          { name: "Kazzak", value: "kazzak" },
          { name: "Azuregos", value: "azuregos" }
        )
    ),
  async execute(interaction) {
    let value = interaction.options.getString("name")

    await interaction.reply(`The timer for ${value} is *time*`)
  },
};
