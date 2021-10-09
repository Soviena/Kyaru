exports.run = (client, message, args) => {
    if(message.author.id === client.config.ownerID){
        message.channel.send("What do you mean master ?, you are my master <3");    
    } else {
        message.channel.send(`My master is the one and only <@${client.config.ownerID}>`);
    }
    
}