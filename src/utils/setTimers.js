const WorldBoss = require("../models/worldBosses");

module.exports = async function setTimers(input) {
  // Kill Time and Date
  let date = new Date(Date.now());
  date.setUTCDate(input.date);
  let timeInput = input.time.split(":");
  date.setUTCHours(timeInput.shift());
  date.setUTCMinutes(timeInput.shift());

  // Respawn Timers
  let respawnCd = new Date(date);
  respawnCd.setUTCHours(date.getUTCHours() + 30);
  let respawnWindow = new Date(date);
  respawnWindow.setUTCHours(date.getUTCHours() + 70);

  return {
    date,
    respawnCd,
    respawnWindow,
  };

  //   switch (mode) {
  //     case "edit":
  //       try {
  //         const editBoss = await WorldBoss.findOneAndUpdate(
  //           {
  //             slug: boss.slug,
  //           },
  //           {
  //             killedAt: date,
  //             respawnCd,
  //             respawnWindow,
  //             hasTimer: false,
  //           }
  //         );
  //         return editBoss;
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error(error);
  //       }
  //       break;
  //     case "create":
  //       try {
  //         const newBoss = await WorldBoss.create({
  //           name: boss.slug.charAt(0).toUpperCase() + boss.value.slice(1),
  //           slug: boss.slug,
  //           killedAt,
  //           respawnWindow,
  //           hasTimer: false,
  //         });
  //         return newBoss;
  //       } catch (error) {
  //         console.error(error);
  //         throw new Error(error);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
};
