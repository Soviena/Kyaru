exports.run = async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    if(!VoiceChannel) return message.channel.send('You must be in a voice channel master');
    let queue = await client.distube.getQueue(message);
    if(queue) {
        client.distube.shuffle(message)
        message.channel.send('Queue Shuffled')
    } else if (!queue) {
        return
    };
}