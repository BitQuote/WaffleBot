/*
  Checks if the bot is alive
 */

module.exports = bot => bot.registerCommand('ping', (msg) => {
  msg.delete();

  msg.channel.createMessage({
    embed: {
      title: `${bot.commandOptions.name} by ${bot.commandOptions.owner}`,
      description: `Bot running for ${process.uptime()} seconds!`,
      color: bot.selfConfig.successColor,
    },
  });
}, {
  description: 'Checks status',
  fullDescription: 'Is the bot alive???',
});
