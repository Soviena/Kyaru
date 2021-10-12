exports.run = async (client, message, args) => {
    const embed = new client.vembed();
    if(message.author.id !== client.config.ownerID) {
    message.reply("Kamu Bukan Master Ku!");
    return;
  }else {    
  try {
    if(args === undefined || args.length == 0) return message.reply("Perlu Syntax cth:'message.author.id'");
    let codein = args.join(' ');
    let code = eval(codein);      
    if (!codein) return;
    if (codein.includes(`token`)) {
      code = warningTokenMessage[Math.floor(Math.random() * warningTokenMessage.length)];
      console.log(`${message.author.tag} use this eval to against the tokens and privacy.`)
    } else {
      code = eval(code);
    }
      if (typeof code !== 'string')

          code = require('util').inspect(code, { depth: 0 });
      //embed.setAuthor('Evaluate')
      //embed.setColor('RANDOM')
      //embed.addField('📥 Input', `\`\`\`js\n${codein}\`\`\``)
      //embed.addField('📤 Output', `\`\`\`js\n${code}\n\`\`\``)
      //message.channel.send(embed)

      const description = `\`\`\`js\n${code}\n\`\`\``;
      const split = description.match(/[\s\S]{1,2048}/g);
      embedTitle = `\`\`\`js\n${codein}\`\`\``;
      if(embedTitle.length >= 256) embedTitle = "Some long code";
      for (let i = 0; i < split.length; i++) {
        let embed = new client.vembed()
      .setTitle(embedTitle)
      .setDescription(split[i], true)
      .setColor(0xff38c0);
      message.channel.send(embed);
      }

  } catch(e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
  }
}
}