exports.run = (client, message, args) => {
    if(message.author.id != client.config.ownerID) return message.channel.send(`Only master <@${client.config.ownerID}> can change this.`);
    if (client.yt_mode){
        client.yt_mode = false;
        message.channel.send("Set youtube mode to `" + (client.yt_mode ? "On" : "Off") + "`");
    } else{
        client.yt_mode = true;
        message.channel.send("Set youtube mode to `" + (client.yt_mode ? "On" : "Off") + "`");
    }
    
}