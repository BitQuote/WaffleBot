/*
  Uses an embed to quote a message
 */

const createTimedMessage = require('./../modules/timedMessage');

module.exports = bot => bot.registerCommand('quote', (msg, args) => {
  msg.delete();

  if (args.length > 0) {
    const messageID = args[0];
    let channel = msg.channel;
    if (msg.channel.guild && args[1]) {
      channel = msg.channel.guild.channels.get(args[1]);
      if (!channel) {
        createTimedMessage(bot, msg.channel.id, {
          embed: {
            title: 'Quote a message',
            description: 'Channel not found',
            color: bot.selfConfig.errorColor,
          },
        });
        return;
      }
    }

    channel.getMessages(2, null, null, messageID).then((messages) => {
      const quotedMessage = messages.find(message => message.id === messageID);
      if (quotedMessage) {
        let color;
        if (msg.channel.guild && quotedMessage.member.roles.length > 0) {
          const coloredRoleID = quotedMessage.member.roles.find(roleID =>
            msg.channel.guild.roles.get(roleID).color !== 0);
          if (coloredRoleID) {
            color = msg.channel.guild.roles.get(coloredRoleID).color;
          }
        }
        msg.channel.createMessage({
          embed: {
            author: {
              name: `${quotedMessage.author.username}#${quotedMessage.author.discriminator}`,
              icon_url: quotedMessage.author.staticAvatarURL,
            },
            description: quotedMessage.content,
            footer: {
              text: (quotedMessage.editedTimestamp ? 'Edited' : 'Sent') + (quotedMessage.channel.id === msg.channel.id ? '' : ` in #${quotedMessage.channel.name}`),
            },
            color,
            timestamp: new Date(quotedMessage.timestamp),
          },
        });
      } else {
        createTimedMessage(bot, msg.channel.id, {
          embed: {
            title: 'Quote a message',
            description: 'Message not found',
            color: bot.selfConfig.errorColor,
          },
        });
      }
    });
  } else {
    createTimedMessage(bot, msg.channel.id, {
      embed: {
        title: 'Quote a message',
        description: 'Provide a message ID to quote',
        color: bot.selfConfig.errorColor,
      },
    });
  }
}, {
  description: 'Reprints a message',
  fullDescription: 'Uses an embed to display a sent message in this channel or another',
  usage: '<message ID> [<channel ID>]',
});
