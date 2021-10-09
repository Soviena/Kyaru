const { default: translitro } = require("translitro");

exports.run = async (client, message, args) => {
    if (args == "") return message.channel.send("Give me the artist and the title pls.")
    lyricsFinder = client.lyrics;
    let translitro = client.translitro;
    let artist = args[0];
    var title = "";
    let jp = -1;
    for (let i = 1; i < args.length; i++){
        if (args[i] == "-jp"){
            jp = i;
        } else {
            title = title +" "+ args[i];
        }
    }
    let lyrics = await lyricsFinder(artist, title) || "Not Found!";
    if (jp != -1){
        lyrics = await translitro(lyrics,{from: "ja"});
    }
    const split = lyrics.match(/[\s\S]{1,2048}/g);
    for (let i = 0; i < split.length; i++) {
        let embed = new client.vembed()
        .setTitle(`Lyrics :`)
        .setDescription(split[i], true)
        .setColor(0xff38c0);
        message.channel.send(embed);
    }
}