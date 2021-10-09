exports.run = (client, message, args) => {
    if(!args || args.length < 2) return message.reply("Please provide subDirectory and command name");
    const commandName = args[1];
    const subDirName = args[0]
    // Check if the command exists and is valid
    if(!client.commands.has(commandName)) {
      return message.reply("That command does not exist");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${subDirName}/${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${subDirName}/${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded master`);
  };