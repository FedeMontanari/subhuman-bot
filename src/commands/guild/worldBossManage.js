const { SlashCommandBuilder } = require("discord.js");
const WorldBoss = require("../../models/worldBosses");
const { WorldBossEmbedBuilder } = require("../../utils/worldBossEmbedBuilder");
const setTimers = require("../../utils/setTimers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wboss")
    .setDescription("World Boss timers")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("get")
        .setDescription("Get the respawn window")
        .addStringOption((option) =>
          option
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
              }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("edit")
        .setDescription("Edit the kill timer of the boss")
        .addStringOption((option) =>
          option
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
              }
            )
        )
        .addNumberOption((option) =>
          option
            .setName("date")
            .setDescription("Enter the day of the kill")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("time")
            .setDescription(
              "Enter the SERVER TIME (24 hours format) of the kill. FORMAT: 12:50 / 23:34"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Remove a boss kill timer")
        .addStringOption((option) =>
          option
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
              }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create a boss kill timer")
        .addStringOption((option) =>
          option
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
              }
            )
        )
        .addNumberOption((option) =>
          option
            .setName("date")
            .setDescription("Enter the day of the kill")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("time")
            .setDescription(
              "Enter the SERVER TIME (24 hours format) of the kill. FORMAT: 12:50 / 23:34"
            )
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/g;

    // Get the user input
    let value = interaction.options.getString("name");
    let dateInput = interaction.options.getNumber("date");
    let timeInput = interaction.options.getString("time");
    let boss;

    // Validate user input for time
    if (
      (interaction.options.getSubcommand() == "create" ||
        interaction.options.getSubcommand() == "edit") &&
      !timeRegex.test(timeInput)
    ) {
      return interaction.editReply(
        "Please enter a valid time format. Colons(:) are required & 24 hours format only. Example: 23:50, 10:23, 05:15"
      );
    }

    // INSERT the entry on the DB according to the command input
    if (interaction.options.getSubcommand() == "create") {
      // Create the boss entry
      let { date, respawnCd, respawnWindow } = await setTimers({
        time: timeInput,
        date: dateInput,
      });

      const newBoss = await WorldBoss.create({
        name: value.charAt(0).toUpperCase() + value.slice(1),
        slug: value,
        killedAt: date,
        respawnCd,
        respawnWindow,
        hasTimer: false,
      });

      // Return the response
      return await interaction.editReply(
        `New boss entry created. Name: ${newBoss.name}`
      );
    } else {
      // Find the entry on the DB
      try {
        boss = await WorldBoss.findOne({
          slug: value,
        });
      } catch (err) {
        console.error(err);
        return await interaction.editReply(
          "An error occurred, please try again!"
        );
      }
    }

    // Switch for GET and EDIT commands
    if (boss) {
      switch (interaction.options.getSubcommand()) {
        case "get":
          return await interaction.editReply({
            embeds: [await WorldBossEmbedBuilder(boss)],
          });

        case "edit":
          let { date, respawnCd, respawnWindow } = await setTimers({
            time: timeInput,
            date: dateInput,
          });
          try {
            await WorldBoss.findOneAndUpdate(
              {
                slug: boss.slug,
              },
              {
                killedAt: date,
                respawnCd,
                respawnWindow,
              }
            );
          } catch (error) {
            console.error(error);
            return await interaction.editReply(
              "An error occured while trying to edit this entry, please try again!"
            );
          }
          return await interaction.editReply(
            `Last saved entry for ${boss.name} edited successfully`
          );

        case "delete":
          try {
            await WorldBoss.deleteOne({
              slug: value,
            });
            return await interaction.editReply(
              `Last saved entry for ${boss.name} removed successfully`
            );
          } catch (err) {
            console.error(err);
            return await interaction.editReply(
              "An error occurred while deleting this entry, please try again!"
            );
          }

        default:
          break;
      }
    } else {
      return await interaction.editReply("Boss entry not found");
    }
  },
};
