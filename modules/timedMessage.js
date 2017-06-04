/*
  Sends a message and deletes it after the timeout
 */

module.exports = (bot, channelID, content, file) => bot.createMessage(channelID, content, file)
.then(message => setTimeout(() => message.delete(), bot.selfConfig.msgTimeout));
