/*
  Runs something (use with caution)
 */

module.exports = bot => bot.registerCommand('eval', (msg, args) => {
  msg.delete();

  const expression = args.join(' ');
  let result;
  let status;
  const startTime = Date.now();

  try {
    result = eval(expression); // eslint-disable-line no-eval
    status = 'Success';
  } catch (err) {
    result = err;
    status = 'Failed';
  }

  const endTime = Date.now();
  const duration = endTime - startTime;

  msg.channel.createMessage({
    embed: {
      title: expression,
      description: `\`${result}\``,
      footer: {
        text: `${status} | ${duration} ms`,
      },
      color: status === 'Success' ? bot.selfConfig.successColor : bot.selfConfig.errorColor,
    },
  });
}, {
  description: 'Runs something',
  fullDescription: 'Evaluates an expression on the bot server',
  usage: '<expression>',
});
