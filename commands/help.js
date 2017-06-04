/*
  How to use the bot
 */

const createTimedMessage = require('./../modules/timedMessage');

module.exports = bot => bot.registerCommand('help', (msg, args) => {
  msg.delete();

  if (args[0]) {
    const command = bot.commands[args[0]];
    if (command) {
      msg.channel.createMessage({
        embed: {
          title: `${bot.commandOptions.prefix}${command.label} ${command.usage}`,
          description: command.fullDescription,
        },
      });
    } else {
      createTimedMessage(bot, msg.channel.id, {
        embed: {
          title: args[0],
          description: 'Command not found',
          color: bot.selfConfig.errorColor,
        },
      });
    }
  } else {
    msg.channel.createMessage({
      embed: {
        fields: Object.entries(bot.commands).map(command => ({
          name: `${bot.commandOptions.prefix}${command[0]}`,
          value: command[1].description,
        })),
        footer: {
          text: `Thanks for using ${bot.commandOptions.name} :)`,
        },
      },
    });
  }
}, {
  description: 'This help text',
  fullDescription: 'Shows information about each command',
  usage: '[<command>]',
});
