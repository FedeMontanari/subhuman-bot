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
  let respawnWindow = new Date(respawnCd);
  respawnWindow.setUTCHours(respawnCd.getUTCHours() + 70);

  return {
    date,
    respawnCd,
    respawnWindow,
  };
};
