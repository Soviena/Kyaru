exports.run = (client, message, args) => {
    const cat = require('nekos.life');
    const neko = new cat();
    const embed = new client.vembed();

    // SFW

    async function baka() {
        const { url }  = await neko.sfw.baka();
        embed.setImage(url);
        message.channel.send(embed);
    }

    async function meow() {
        const { url }  = await neko.sfw.meow();
        embed.setImage(url);
        message.channel.send(embed);
    }

    async function waifu() {
        const { url }  = await neko.sfw.waifu();
        embed.setImage(url);
        message.channel.send(embed);
    }

    async function pat() {
        const { url }  = await neko.sfw.pat();
        embed.setImage(url);
        message.channel.send(embed);
    }

    async function smug() {
        const { url }  = await neko.sfw.smug();
        embed.setImage(url);
        message.channel.send(embed);
    }

    async function wallpaper() {
        const { url }  = await neko.sfw.wallpaper();
        embed.setImage(url);
        message.channel.send(embed);
    }

    async function goose() {
        const { url }  = await neko.sfw.goose();
        embed.setImage(url);
        message.channel.send(embed);
    }

    // DYNAMIC

    async function nekos() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.neko();
            embed.setImage(url);
        } else {
            const { url }  = await neko.sfw.neko();
            embed.setImage(url);
        };
        message.channel.send(embed);
    }

    async function nekoGif() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.nekoGif();
            embed.setImage(url);
        } else {
            const { url }  = await neko.sfw.nekoGif();
            embed.setImage(url);
        };
        message.channel.send(embed);
    }

    async function kitsune() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.kitsune();
            embed.setImage(url);
        } else {
            const { url }  = await neko.sfw.foxGirl();
            embed.setImage(url);
        };
        message.channel.send(embed);
    }

    async function mimi() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.kemonomimi();
            embed.setImage(url);
        } else {
            const { url }  = await neko.sfw.kemonomimi();
            embed.setImage(url);
        };
        message.channel.send(embed);
    }
    
    async function holo() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.holo();
            embed.setImage(url);
        } else {
            const { url }  = await neko.sfw.holo();
            embed.setImage(url);
        };
        message.channel.send(embed);
    }

    // NSFW

    async function rnh() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.randomHentaiGif();
            embed.setImage(url);
            message.channel.send(embed);
        };
        
    }

    async function erokitsune() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.eroKitsune();
            embed.setImage(url);
            message.channel.send(embed);
        };
        
    }
    
    async function ero() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.ero();
            embed.setImage(url);
            message.channel.send(embed);
        };
        
    }

    async function eromimi() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.eroKemonomimi();
            embed.setImage(url);
            message.channel.send(embed);
        };
        
    }

    async function eroneko() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.eroNeko();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function eroyuri() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.eroYuri();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function yuri() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.yuri();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function ca() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.cumArts();
            embed.setImage(url);
            message.channel.send(embed);
        };
        
    }

    async function h() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.hentai();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function p() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.pussyArt();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function pw() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.pussyWankGif();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function eroholo() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.holoEro();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function gasm() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.gasm();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function blow() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.blowJob();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    async function futa() {
        if (message.channel.nsfw === true) {
            const { url } = await neko.nsfw.futanari();
            embed.setImage(url);
            message.channel.send(embed);
        };
    }

    switch(args[0]) {
        case "meow":
            meow();
            break;
        case "baka":
            baka();
            break;
        case "waifu":
            waifu();
            break;
        case "pat":
            pat();
            break;
        case "smug":
            smug();
            break;
        case "wallpaper":
            wallpaper();
            break;
        case "goose":
            goose();
            break;
        case "neko":
            nekos();
            break;
        case "kitsune":
            kitsune();
            break;
        case "nekogif":
            nekoGif();
            break;
        case "mimi":
            mimi();
            break;
        case "waifu":
            waifu();
            break;
        case "holo":
            holo();
            break;
        case "rnh":
            rnh();
            break;
        case "erokitsune":
            erokitsune();
            break;
        case "ero":
            ero();
            break;
        case "eromimi":
            eromimi();
            break;
        case "eroneko":
            eroneko();
            break;
        case "eroyuri":
            eroyuri();
            break;
        case "yuri":
            yuri();
            break;
        case "ca":
            ca();
            break;
        case "h":
            h();
            break;
        case "p":
            p();
            break;
        case "pw":
            pw();
            break;
        case "eroholo":
            eroholo();
            break;
        case "gasm":
            gasm();
            break;
        case "blow":
            blow();
            break;
        case "futa":
            futa();
            break;
        default:
          message.channel.send("Sorry, not found :(");
    }
}
    