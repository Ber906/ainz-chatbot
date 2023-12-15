module.exports.config = {
  name: "up",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Mirai Team",
  usePrefix: false,
  description: "",
  commandCategory: "no prefix",
  cooldowns: 5,
  dependencies: {
    "pidusage": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.languages = {
  "en": {
    "returnResult": "𝖠𝖨 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗐𝗈𝗋𝗄𝗂𝗇𝗀 𝖿𝗈𝗋 %1 𝗁𝗈𝗎𝗋𝗌 %2 𝗆𝗂𝗇𝗎𝗍𝖾𝗌 %3 𝗌𝖾𝖼𝗈𝗇𝖽𝗌.\n\n❖ 𝖳𝗈𝗍𝖺𝗅-𝗎𝗌𝖾𝗋𝗌: %4\n❖ Total Threads: %5\n❖ 𝖢𝖯𝖴-𝗎𝗌𝖺𝗀𝖾: %6%\n❖ 𝖱𝖠𝖬-𝗎𝗌𝖺𝗀𝖾: %7\n❖ 𝖯𝗂𝗇𝗀/𝗆𝗌: %8ms\n"
  }
}

module.exports.run = async ({ api, event, getText }) => {
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);

  const pidusage = await global.nodemodule["pidusage"](process.pid);

  const timeStart = Date.now();
  return api.sendMessage("", event.threadID, () => api.sendMessage(getText("returnResult", hours, minutes, seconds, global.data.allUserID.length, global.data.allThreadID.length, pidusage.cpu.toFixed(1), byte2mb(pidusage.memory), Date.now() - timeStart), event.threadID, event.messageID));
}