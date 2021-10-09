const { RichEmbed, MessageEmbed } = require('discord.js')

module.exports = class vembed extends MessageEmbed {
  constructor (user, data = {}) {
    super(data)
    if (user) this.setFooter(user.tag)
  }
}
