exports.run = (client, message, args) => {
    if (args == "") return
    message.channel.startTyping();
    let text = args.join(" ");
    message.channel.send(text);
    message.channel.stopTyping();
    message.delete();

}