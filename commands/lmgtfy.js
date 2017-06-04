/*
  Posts a link to Let Me Google That For You
 */

const createTimedMessage = require('./../modules/timedMessage');

const searchEngineMap = {
  google: {
    name: 'Google',
    abbr: 'g',
    icon: 'https://lh3.googleusercontent.com/DKoidc0T3T1KvYC2stChcX9zwmjKj1pgmg3hXzGBDQXM8RG_7JjgiuS0CLOh8DUa7as=w300',
  },
  bing: {
    name: 'Bing',
    abbr: 'b',
    icon: 'http://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Bing-icon.png',
  },
  yahoo: {
    name: 'Yahoo!',
    abbr: 'y',
    icon: 'http://icons.veryicon.com/png/System/Flat%20Gradient%20Social/Yahoo.png',
  },
  aol: {
    name: 'AOL',
    abbr: 'a',
    icon: 'https://lh3.ggpht.com/oJx9HgvyyM6Gk1B2wh8_S1drVBgToEn1KH5WIgX6r4l_lrDLZPY935YgeLGO67qxSh8=w300',
  },
  ask: {
    name: 'Ask.com',
    abbr: 'k',
    icon: 'http://www.shegerianlaw.com/wp-content/uploads/logo-ask-com.png',
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    abbr: 'd',
    icon: 'https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png',
  },
};
const defaultSearchEngine = 'google';

module.exports = bot => bot.registerCommand('lmgtfy', (msg, args) => {
  msg.delete();

  let type = defaultSearchEngine;
  let query;

  if (args[1]) {
    type = args[0];
    query = args.slice(1).join(' ');
  } else {
    query = args.join(' ');
  }

  if (!query) {
    createTimedMessage(bot, msg.channel.id, {
      embed: {
        title: 'LMGTFY',
        description: 'Provide a search query',
        color: bot.selfConfig.errorColor,
      },
    });
  } else {
    query = encodeURIComponent(query);
    const engine = searchEngineMap[type.toLowerCase()];

    msg.channel.createMessage({
      embed: {
        author: {
          name: engine.name,
          icon_url: engine.icon,
        },
        description: `https://lmgtfy.com/?q=${query}&s=${engine.abbr}`,
      },
    });
  }
}, {
  description: 'Search engine link',
  fullDescription: 'Posts a link to LMGTFY for idiots to use',
  usage: '[<type>] <query>',
});
