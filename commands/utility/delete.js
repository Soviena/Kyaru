exports.run = (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Who are you !?, not my master");
    var messagesToDelete = args[0];
    if (!args || args == null || args == "") return message.channel.send("Sorry master, but i need a number");
    if (args > 99) return message.channel.send("Im sorry i don't have the power to delete 99 or more message");
    message.channel.messages.fetch({limit: messagesToDelete})
    .then(messages => message.channel.bulkDelete(messages.size + 1))
    .catch(error => message.channel.send(`Sorry master ${message.author}, i fail because *${error}*.`));
}