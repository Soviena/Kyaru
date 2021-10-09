const { VoiceChannel } = require("discord.js")
const musicDir = "../../../Song Music Lagu/Music/";
exports.run = async (client, message, args) => {
  const VoiceChannel = message.member.voice.channel;
  if (args == "") return message.channel.send('Pls give me the title');
  if(!VoiceChannel) return message.channel.send('You must be in a voice channel master');
  // if yt mode is on, run ytplay instead
  if (client.yt_mode){
    client.commands.get('ytplay').run(client, message, args);
    return;
  }
  // if yt mode is off, go play local files
  args.toString();
  args = args.join(' ').toLowerCase();
  const mp3l = client.mp3list;
  var found = [];
  var ifound = 0;

  for (var k in mp3l){
    if (mp3l[k]['title'] == 'None'){
      if (k.toLowerCase().includes(args)&&ifound<10){
        found[ifound] = k;
        ifound++;
      }
    }
    else {
      for (var v in mp3l[k]){
        if (mp3l[k][v].toLowerCase().includes(args)&&ifound<10){
          found[ifound] = k;
          ifound++;
        }
      }
    }
  }
  
  if (ifound != 0 && ifound > 1){
    let index = 0;
    let embed = new client.vembed()
      .setTitle(`Daftar Lagu :`)
      .setDescription(found.map(dir => `${++index} - ${mp3l[dir]['title']} by ${mp3l[dir]['artist'].substring(0,64)}`).join('\n'), true)
      .setFooter(`Balas pesan ini dengan pilih dari no 1 - 10..`)
      .setColor(0xff38c0);
    message.channel.send(embed);

//     message.channel.send(`
// __**Pilih Lagu:**__

// ${found.map(dir => `${++index} - ${mp3l[dir]['title']} by ${mp3l[dir]['artist'].substring(0,64)}`).join('\n')}

// Balas pesan ini dengan pilih dari no 1 - 10..
//         `);
    try {
      var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
        max: 1,
        time: 10000,
        errors: ['time']
      });
    } catch (err) {
      console.error(err);
      return message.channel.send('Padahal sudah ku siapkan.. tapi kamu gk memilih.. Dasar gk PEKA');
    }
    const audioIndex = parseInt(response.first().content);
    let audio = musicDir+found[audioIndex-1];
  
    VoiceChannel.join().then(connection =>{
      message.channel.send(`Playing : ${mp3l[found[audioIndex-1]]['title']} by ${mp3l[found[audioIndex-1]]['artist'].substring(0,64)}`)
      const dispatcher = connection.play(audio);
    });
  }else if (ifound == 1){
    let audio = musicDir+found[0];
    VoiceChannel.join().then(connection =>{
      connection.voice.setSelfDeaf(true);
      message.channel.send(`Playing : ${mp3l[found[0]]['title']} by ${mp3l[found[0]]['artist'].substring(0,64)}`)
      const dispatcher = connection.play(audio);
    });
  }else{
    return message.channel.send('Im sorry master, i cant found the audio');
  }

}