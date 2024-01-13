const { SlashCommandBuilder } = require("discord.js");
const WorldBoss = require("../../models/worldBosses");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wboss")
    .setDescription("Worldboss timers")
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
        .addNumberOption((option) =>
          option
            .setName("time")
            .setDescription(
              "Enter the SERVER TIME (24 hours format) of the kill. FORMAT: hh / hh.mm"
            )
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();

    // Get the user input
    let value = interaction.options.getString("name");
    let dateInput = interaction.options.getNumber("date");
    let timeInput = interaction.options.getNumber("time");
    let boss;

    // INSERT the entry on the DB according to the command input
    if (interaction.options.getSubcommand() == "create") {
      let date = new Date(Date.now());
      date.setUTCDate(dateInput);
      if (!Number.isInteger(timeInput)) {
        timeInput = timeInput.toString().split(".");
        date.setUTCHours(timeInput.shift());
        date.setUTCMinutes(timeInput.shift());
      } else {
        date.setUTCHours(timeInput);
      }
      const newBoss = await WorldBoss.create({
        name: value.charAt(0).toUpperCase() + value.slice(1),
        slug: value,
        killedAt: date,
      });
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
        return await interaction.reply("An error occurred, please try again!");
      }
    }

    // Switch for GET and EDIT commands
    if (boss) {
      let { name, killedAt } = boss;
      // killedAt = killedAt.toUTCString();
      // let arr = killedAt.split(" ");
      // arr.pop();
      // arr.shift();
      // arr.push("Server Time");
      // killedAt = arr.join(" ");
      switch (interaction.options.getSubcommand()) {
        case "get":
          return await interaction.editReply(
            `${name} killed at ${killedAt.getUTCHours()}:${killedAt.getUTCMinutes()} - ${killedAt.getUTCDate()}.${killedAt.getUTCMonth()}`
          );

        case "edit":
          return await interaction.editReply(`Requested a EDIT for ${boss}`);

        case "delete":
          await WorldBoss.deleteOne({
            slug: value,
          });
          return await interaction.editReply(`Requested DELETE for ${boss}`);

        default:
          break;
      }
    } else {
      return await interaction.editReply("Boss entry not found");
    }
  },
};
