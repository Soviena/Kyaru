exports.run = (client, message) => {
    const { waifuR } = require('waifur');
    let name;
    let url;
    let src;
    let detail;
    async function waifu() {
        await waifuR(res => {
            name = res.name;
            url = res.background_image;
            src = res.appears_in;
            detail = res.description;
        });
        let embed = new client.vembed()
        .setTitle(name)
        .setDescription(`**${src}**\n\n${detail.substring(0,2048)}`, true)
        .setImage(url)
        .setColor(Math.floor(Math.random()*16777215).toString(16));
        message.channel.send(embed)
    }
    waifu();
}