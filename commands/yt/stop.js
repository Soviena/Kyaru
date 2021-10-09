exports.run = async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if(!VoiceChannel) return message.channel.send('You must be in a voice channel master');
    let queue = await client.distube.getQueue(message);
    if(queue) {
        client.distube.stop(message)
        message.channel.send('Music stopped!')
    } else if (!queue) {
        return
    };
}