/*
  Saves and retrieves text snippets
 */

const createTimedMessage = require('./../modules/timedMessage');
const tags = require('./../modules/tagEditor');

module.exports = (bot) => {
  const tagCommand = bot.registerCommand('tag', (msg, args) => {
    msg.delete();

    const name = args[0];
    if (name) {
      const value = tags.get(name);
      if (value) {
        msg.channel.createMessage(value);
      } else {
        createTimedMessage(bot, msg.channel.id, {
          embed: {
            title: 'Retrieve tag',
            description: 'Tag not found',
            color: bot.selfConfig.errorColor,
          },
        });
      }
    } else {
      const tagList = tags.get();
      msg.channel.createMessage({
        embed: {
          fields: Object.entries(tagList).map(tag => ({
            name: tag[0],
            value: tag[1],
          })),
          description: Object.keys(tagList).length === 0 ? 'Nothing to see here' : '',
          footer: {
            text: `${bot.commandOptions.prefix}tag set`,
          },
        },
      });
    }
  }, {
    description: 'Text snippets',
    fullDescription: 'Saves and retrieves short text snippets',
    usage: '[<name or "set"> <value>]',
  });
  tagCommand.registerSubcommand('set', (msg, args) => {
    const name = args[0];
    const value = args.slice(1).join(' ');
    if (name && value) {
      tags.set(name, value);
      createTimedMessage(bot, msg.channel.id, {
        embed: {
          fields: [
            {
              name,
              value,
            },
          ],
          footer: {
            text: `${bot.commandOptions.prefix}tag ${name}`,
          },
          color: bot.selfConfig.successColor,
        },
      });
    } else {
      createTimedMessage(bot, msg.channel.id, {
        embed: {
          title: 'Set tag',
          description: 'Provide a name and value',
          color: bot.selfConfig.errorColor,
        },
      });
    }
  });
  tagCommand.registerSubcommand('delete', (msg, args) => {
    const name = args[0];
    const value = tags.get(name);
    if (value) {
      tags.delete(name);
      createTimedMessage(bot, msg.channel.id, {
        embed: {
          title: 'Tag deleted',
          description: name,
          color: bot.selfConfig.successColor,
        },
      });
    } else {
      createTimedMessage(bot, msg.channel.id, {
        embed: {
          title: 'Delete tag',
          description: 'Tag not found',
          color: bot.selfConfig.errorColor,
        },
      });
    }
  });
};
