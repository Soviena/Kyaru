const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");
const fs = require("fs");
//Require
const lyricsFinder = require('lyrics-finder');
const translitro = require("translitro").default;
const config = require("./config.json");
const vembed = require("./structure/vembed.js");
const { error } = require("console");
const DisTube = require('distube');
//Make it accesible
client.translitro = translitro;
client.lyrics = lyricsFinder;
client.config = config;
client.vembed = vembed;
client.yt_mode = true;
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing : \`${song.name}\` - \`${song.formattedDuration}\`\n`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added : \`${song.name}\` - \`${song.formattedDuration}\` to the queue`
    ))

//INIT EVENT & COMMANDS

// This loop reads the /events/ folder and attaches each event file to the appropriate event and command.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      // If the file is not a JS file, ignore it (thanks, Apple)
      if (!file.endsWith(".js")) return;
      // Load the event file itself
      const event = require(`./events/${file}`);
      // Get just the event name from the file name
      let eventName = file.split(".")[0];
      // super-secret recipe to call events with all their proper arguments *after* the `client` var.
      // without going into too many details, this means each event will be called with the client argument,
      // followed by its "normal" arguments, like message, member, etc etc.
      // This line is awesome by the way. Just sayin'.
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });
  
client.commands = new Enmap();
/*
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});
*/

function getCommand(filename,subdir){
  let props;
  if(subdir === undefined){
  props = require(`./commands/${filename}`);
  } else {
  props = require(`./commands/${subdir}/${filename}`);
  };
  return props;
}

function readSubDir(mainDir,subDir){
  fs.readdir(`./${mainDir}/${subDir}/`, (err,files) => {
    files.forEach(file => {
      if(file.endsWith(".js")){
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ./commands/${subDir}/${commandName}`);
        client.commands.set(commandName,getCommand(file,subDir));
      } else {
        return console.log("Trying to read sub sub dir");
      };
    });
  });
}

fs.readdir("./commands/", (err,files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(file.endsWith(".js")){
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ./commands/${commandName}`);
      client.commands.set(commandName,getCommand(file));
    } else {
      let subdir = file;
      console.log(`Attempting to read subDirectory ${subdir}`);
      readSubDir("commands",subdir);
    };
  });
});

fs.readFile('./data/index.json', (err, data) => {
  if (err) { throw err; }
  const mp3list = JSON.parse(data);
  client.mp3list = mp3list;
});

// function readSubDirmp3(mainDir,subDir){
//   fs.readdir(`${mainDir}/${subDir}/`, (err,files) => {
//     console.log(files)
//     files.forEach(file => {
//       if(file.endsWith(".mp3")||file.endsWith(".MP3")){
//         let mp3name = file.split(".")[0];
//         console.log(`Attempting to load mp3 ./${mainDir}/${subDir}/${mp3name}`);
//         //client.commands.set(commandName,getCommand(file,subDir));
//       } else if(!((file.endsWith(".jpg"))||(file.endsWith(".png"))||(file.endsWith(".html"))||(file.endsWith(".bmp"))||(file.endsWith(".url")))){
//         let subsubdir = file;
//         console.log(`Attempting to read subDirectory ${subsubdir}`);
//         readSubDirmp3(mainDir+"/"+subDir,subsubdir);
//       };
//     });
//   });
// }

// fs.readdir(musicDir, (err,files) => {
//   if(err) return console.error(err);
//   files.forEach(file => {
//     if(file.endsWith(".mp3")||file.endsWith(".MP3")){
//       let mp3name = file.split(".")[0];
//       console.log(`Attempting to load mp3 ${musicDir}/${mp3name}`);
//       //client.commands.set(commandName,getCommand(file));
//     } else if(!((file.endsWith(".jpg"))||(file.endsWith(".png"))||(file.endsWith(".html"))||(file.endsWith(".bmp"))||(file.endsWith(".url")))){
//       let subdir = file;
//       console.log(`Attempting to read subDirectory ${subdir}`);
//       readSubDirmp3(musicDir,subdir);
//       console.log("selesai.")
//     }
//   });
// });

client.login(config.token);