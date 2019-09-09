const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix} = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN;
const http = require('http');

client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);


client.on('message', message => {
    if(message.author.bot) return;
    http.get('http://xinga-me.appspot.com/api', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            message.channel.send(`${message.author}, ${JSON.parse(data).xingamento}! `, {
                tts: true
            });
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});