exports.run = (client, message, args) => {
    if (!client.yt_mode) return
    const VoiceChannel = message.member.voice.channel;
    const distube = client.distube;
    VoiceChannel.join().then(connection =>{
        connection.voice.setSelfDeaf(true);
      });
    args = args.join(" ");
    distube.play(message, args);
}