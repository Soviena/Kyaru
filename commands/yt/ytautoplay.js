exports.run = (client, message, args) => {
    const distube = client.distube;
    let mode = distube.toggleAutoplay(message);
    message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
}