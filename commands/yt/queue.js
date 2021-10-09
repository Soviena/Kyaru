exports.run = async (client, message, args) => {
    const VoiceChannel = message.member.voice.channel;
    let queue = await client.distube.getQueue(message);
    let embed = new client.vembed;
    if(queue) {
        let q = (queue.songs.map((song, id) =>
        `${id+1}. [${song.name}] - \`${song.formattedDuration}\``
        ).join("\n"));
        const split = q.match(/[\s\S]{1,2048}/g);
        for (let i = 0; i < split.length; i++) {
            let embed = new client.vembed()
            .setTitle(`Current queue :`)
            .setDescription(split[i], true)
            .setColor(0xff38c0);
        message.channel.send(embed);
        }
    } else if (!queue) {
        return message.channel.send("Not playing anything!");
    };
}