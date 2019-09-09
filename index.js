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

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

// returns random key from Set or Map
function getRandomKey(collection) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}


const emojis = [':eggplant:', ':middle_finger:', ':poop:', ':joy_cat:', ':joy:', ':ok_hand:', ':call_me:', ':put_litter_in_its_place:', ':sweat_smile:', ':laughing:' ];


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
            message.channel.send(emojis.randomElement());
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});