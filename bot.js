// Import Eris, winston for logging, and require-dir to get commands later
const Eris = require('eris');
const winston = require('winston');
const requireDir = require('require-dir');

// Import configs
const config = require('./config.json');

// Initialize client
const bot = new Eris.CommandClient(config.self_token, {}, {
  ignoreSelf: false,
  description: 'An Eris-based Discord self bot with simple, useful commands',
  name: config.bot_name,
  owner: config.owner_name,
  prefix: config.prefix,
  defaultHelpCommand: false,
  defaultCommandOptions: {
    caseInsensitive: true,
    deleteCommand: true,
    requirements: {
      userIDs: [
        config.user_id,
      ],
    },
  },
});

// Import commands
const commands = requireDir('./commands');

// Set some configs as bot prop
bot.selfConfig = {
  msgTimeout: config.msg_timeout,
  errorColor: config.error_color,
  successColor: config.success_color,
};

// Register commands
Object.values(commands).forEach(command => command(bot));

// Discord login
bot.connect();

// Ready event
bot.on('ready', () => winston.info(`Connected with ${bot.guilds.size} guilds and ${Object.keys(commands).length} commands`));
