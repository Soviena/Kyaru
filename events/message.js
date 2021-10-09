const { config } = require("process");

module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.includes(client.config.prefix) === false) return;
    // Our standard argument/command name definition.
    try {
      const content = message.content.match(/Kyaru\s*([A-Z,0-9,a-z]).+/g).toString();
      const args = content.slice(client.config.prefix.length).trim().split(/ +/g);
      var i;
      for (i = 0; i < args.length; i++) {
        const command = args[i].toLowerCase();
        const cmd = client.commands.get(command);
        if (cmd){ 
          cmd.run(client, message, args.slice(i+1));
          return;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };