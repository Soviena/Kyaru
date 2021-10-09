exports.run = (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if(!VoiceChannel) return message.channel.send('You must be in a voice channel master');
    channelID = message.member.voice.channelID;
    vc = message.guild.channels.cache.get(channelID);
    vc.leave();
}