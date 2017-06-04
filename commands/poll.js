/*
  Creates reaction-based polls
 */

const createTimedMessage = require('./../modules/timedMessage');

module.exports = bot => bot.registerCommand('poll', (msg, args) => {
  msg.delete();

  const title = args.join(' ');
  if (title) {
    msg.channel.createMessage({
      embed: {
        title: 'Poll',
        description: title,
        footer: {
          text: 'Use 👍 or 👎 reactions to vote',
        },
      },
    }).then((message) => {
      message.addReaction('👍');
      message.addReaction('👎');
    });
  } else {
    createTimedMessage(bot, msg.channel.id, {
      embed: {
        title: 'Create a poll',
        description: 'Provide a poll title',
        color: bot.selfConfig.errorColor,
      },
    });
  }
}, {
  description: 'Creates polls',
  fullDescription: 'Makes a poll with thumbs-up/down reactions',
  usage: '<title>',
});
