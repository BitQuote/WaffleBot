/*
  Shows info about a user
 */

const createTimedMessage = require('./../modules/timedMessage');

module.exports = bot => bot.registerCommand('profile', (msg, args) => {
  msg.delete();

  const query = args.join(' ');
  if (query) {
    let user;
    if (!isNaN(query)) {
      user = bot.users.get(query);
    } else {
      const separator = query.lastIndexOf('#');
      if (separator === -1) {
        user = bot.users.find(usr => usr.username === query);
      } else {
        const usernameQuery = query.slice(0, separator);
        const discriminatorQuery = query.slice(separator + 1);
        user = bot.users.find(usr => usr.username === usernameQuery &&
          user.discriminator === discriminatorQuery);
      }
    }

    if (user) {
      const sendProfileMessage = (profileFields = []) => msg.channel.createMessage({
        embed: {
          author: {
            name: 'User Profile',
            icon_url: user.defaultAvatarURL,
          },
          image: {
            url: user.staticAvatarURL,
            width: 300,
            height: 300,
          },
          fields: [
            {
              name: 'Username',
              value: user.username,
            },
            {
              name: 'Discriminator',
              value: user.discriminator,
            },
            {
              name: 'ID',
              value: user.id,
            },
            {
              name: 'Created At',
              value: new Date(user.createdAt).toString(),
            },
            ...profileFields,
          ],
        },
      });

      user.getProfile().then((userProfile) => {
        sendProfileMessage([
          {
            name: 'Mutual Servers',
            value: userProfile.mutual_guilds.length,
          },
          {
            name: 'Nitro?',
            value: userProfile.premium_since ? `Since ${new Date(userProfile.premium_since).toString()}` : 'No',
          },
          {
            name: 'Connected Accounts',
            value: userProfile.connected_accounts.map(acct =>
              acct.type.charAt(0).toUpperCase() + acct.type.slice(1)).join('\n') || 'None',
          },
        ]);
      }).catch(() => sendProfileMessage());
    } else {
      createTimedMessage(bot, msg.channel.id, {
        embed: {
          title: 'Search for user',
          description: 'User not found',
          color: bot.selfConfig.errorColor,
        },
      });
    }
  } else {
    createTimedMessage(bot, msg.channel.id, {
      embed: {
        title: 'User profile',
        description: 'Provide a username query',
        color: bot.selfConfig.errorColor,
      },
    });
  }
}, {
  description: 'Info about users',
  fullDescription: 'Shows name, avatar, and more',
  usage: '<user>',
});
