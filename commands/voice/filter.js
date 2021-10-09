exports.run = (client, message, args) => {
    if (client.yt_mode && args != ""){
        client.commands.get('ytfilter').run(client, message, args);
        return;
    } else if (args == ""){
        message.channel.send("Filter list : `3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `tremolo`, `surround`, `earwax` ");
    }
}