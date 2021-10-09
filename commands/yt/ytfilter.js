exports.run = async (client, message, args) => {
    if (!client.yt_mode) return
    let queue = await client.distube.getQueue(message);
    if (!queue) return message.channel.send("Not playing music")
    distube = client.distube;
    args.forEach(flt => {
        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `tremolo`, `surround`, `earwax`].includes(flt)){
            let filter = distube.setFilter(message, flt);
            message.channel.send("Current queue filter: " + (filter || "Off"));
            return
        }
    });
}