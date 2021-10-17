const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();

bot.on("message", (message) => {
    if(config.restrictToID == true && message.author.id != config.id) return;

    if(message.channel.type == "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "dm") {
        let dmGuild = message.guild;
        let msg = args.join(' ');

        if(!msg || msg.length <= 0) return message.author.send("No message specified!");

        console.log(`Started sending DM's\nMessage:\n${msg}`)

        dmGuild.members.forEach(member => {
            setTimeout(function(){
                if(member.id == bot.user.id) return;
                console.log(member.user.username);
                member.send(`${msg}  ${Math.floor(Math.random() * 9999)}`);
            }, 3000);
        });
    }
});

bot.on("ready", () => {
    console.log("Bot Started!")
});

bot.login(config.token);