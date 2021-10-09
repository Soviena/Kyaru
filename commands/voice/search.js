const { VoiceChannel } = require("discord.js")
const musicDir = "../../../Song Music Lagu/Music/";
exports.run = (client, message, args) => {
    if (args == "") return message.channel.send('Pls give me something to search');
    const mp3l = client.mp3list;
    var max = 150;
    args.toString();
    args = args.join(' ').toLowerCase();
    var found = [];
    var ifound = 0;
    for (var k in mp3l){
        if (k.toLowerCase().includes(args)&&ifound<max){
            if (mp3l[k]['title'] == "None"){
                found[ifound] = ifound+1+". "+k;
            }else {
                found[ifound] = ifound+1+". "+mp3l[k]['title']+" by "+mp3l[k]['artist'].substring(0,64);
            }
            ifound = ifound + 1;
        } else {
            for (var v in mp3l[k]){
                if (mp3l[k][v].toLowerCase().includes(args)&&ifound<max){
                    found[ifound] = ifound+1+". "+mp3l[k]['title']+" by "+mp3l[k]['artist'].substring(0,64);
                    ifound = ifound + 1;
                }
            }
        }
    }
    if (ifound == 0) return message.channel.send('Nothing!');
    found.toString();
    found = found.join(`\n`);
    const split = found.match(/[\s\S]{1,2048}/g);
    for (let i = 0; i < split.length; i++) {
        let embed = new client.vembed()
        .setTitle(`Daftar Lagu :`)
        .setDescription(split[i], true)
        .setColor(0xff38c0);
    message.channel.send(embed);
    }
}