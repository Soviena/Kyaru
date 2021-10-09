
exports.run = (client, message, args) => {
    const ytdl = require("ytdl-core");
    const YouTubeAPI = require("simple-youtube-api");
    const youtube = new YouTubeAPI(client.config.ytToken);

    function canModifyQueue(member) {
        const { channel } = member.voice;
        const botChannel = member.guild.me.voice.channel;
    
        if (channel !== botChannel) {
          member.send("You need to join the voice channel first!").catch(console.error);
          return false;
        }
    
        return true;
    };

    async function play() {
        const queue = message.client.queue.get(message.guild.id);
    
        if (!song) {
          queue.channel.leave();
          message.client.queue.delete(message.guild.id);
          return queue.textChannel.send("🚫 Music queue ended.").catch(console.error);
        }
    
        let stream = null;
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
    
        try {
          if (song.url.includes("youtube.com")) {
            stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
          };
        } catch (error) {
          if (queue) {
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          }
    
          console.error(error);
          return message.channel.send(`Error: ${error.message ? error.message : error}`);
        }
    
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
    
        const dispatcher = queue.connection
          .play(stream, { type: streamType })
          .on("finish", () => {
            if (collector && !collector.ended) collector.stop();
    
            if (queue.loop) {
              // if loop is on, push the song back at the end of the queue
              // so it can repeat endlessly
              let lastSong = queue.songs.shift();
              queue.songs.push(lastSong);
              module.exports.play(queue.songs[0], message);
            } else {
              // Recursively play the next song
              queue.songs.shift();
              module.exports.play(queue.songs[0], message);
            }
          })
          .on("error", (err) => {
            console.error(err);
            queue.songs.shift();
            module.exports.play(queue.songs[0], message);
          });
        dispatcher.setVolumeLogarithmic(queue.volume / 100);
    
        try {
          var playingMessage = await queue.textChannel.send(`🎶 Started playing: **${song.title}** ${song.url}`);
          await playingMessage.react("⏭");
          await playingMessage.react("⏯");
          await playingMessage.react("🔁");
          await playingMessage.react("⏹");
        } catch (error) {
          console.error(error);
        }
    
        const filter = (reaction, user) => user.id !== message.client.user.id;
        var collector = playingMessage.createReactionCollector(filter, {
          time: song.duration > 0 ? song.duration * 1000 : 600000
        });
    
        collector.on("collect", (reaction, user) => {
          if (!queue) return;
          const member = message.guild.member(user);
    
          switch (reaction.emoji.name) {
            case "⏭":
              queue.playing = true;
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member)) return;
              queue.connection.dispatcher.end();
              queue.textChannel.send(`${user} ⏩ skipped the song`).catch(console.error);
              collector.stop();
              break;
    
            case "⏯":
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member)) return;
              if (queue.playing) {
                queue.playing = !queue.playing;
                queue.connection.dispatcher.pause(true);
                queue.textChannel.send(`${user} ⏸ paused the music.`).catch(console.error);
              } else {
                queue.playing = !queue.playing;
                queue.connection.dispatcher.resume();
                queue.textChannel.send(`${user} ▶ resumed the music!`).catch(console.error);
              }
              break;
    
            case "🔁":
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member)) return;
              queue.loop = !queue.loop;
              queue.textChannel.send(`Loop is now ${queue.loop ? "**on**" : "**off**"}`).catch(console.error);
              break;
    
            case "⏹":
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member)) return;
              queue.songs = [];
              queue.textChannel.send(`${user} ⏹ stopped the music!`).catch(console.error);
              try {
                queue.connection.dispatcher.end();
              } catch (error) {
                console.error(error);
                queue.connection.disconnect();
              }
              collector.stop();
              break;
    
            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });
    
        collector.on("end", () => {
          playingMessage.reactions.removeAll().catch(console.error);
        });
    }
    
    async function execute() {
        const { channel } = message.member.voice;
    
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);
        if (serverQueue && channel !== message.guild.me.voice.channel)
          return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);
    
        if (!args.length)
          return message
            .reply(`Usage: ${message.client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`)
            .catch(console.error);
    
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))
          return message.reply("Cannot connect to voice channel, missing permissions");
        if (!permissions.has("SPEAK"))
          return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");
    
        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);
    
        // Start the playlist if playlist url was provided
        if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
          return message.client.commands.get("playlist").execute(message, args);
        }
    
        const queueConstruct = {
          textChannel: message.channel,
          channel,
          connection: null,
          songs: [],
          loop: false,
          volume: 100,
          playing: true
        };
    
        let songInfo = null;
        let song = null;
    
        if (urlValid) {
          try {
            songInfo = await ytdl.getInfo(url);
            song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
              duration: songInfo.videoDetails.lengthSeconds
            };
          } catch (error) {
            console.error(error);
            return message.reply(error.message).catch(console.error);
          }
        } else {
          try {
            const results = await youtube.searchVideos(search, 1);
            songInfo = await ytdl.getInfo(results[0].url);
            song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
              duration: songInfo.videoDetails.lengthSeconds
            };
          } catch (error) {
            console.error(error);
            return message.reply("No video was found with a matching title").catch(console.error);
          }
        }
    
        if (serverQueue) {
          serverQueue.songs.push(song);
          return serverQueue.textChannel
            .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
            .catch(console.error);
        }
    
        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);
    
        try {
          queueConstruct.connection = await channel.join();
          await queueConstruct.connection.voice.setSelfDeaf(true);
          play(queueConstruct.songs[0], message);
        } catch (error) {
          console.error(error);
          message.client.queue.delete(message.guild.id);
          await channel.leave();
          return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }
    };
    execute();
}