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

client.on('message', message => {
    if(message.author.bot) return;
    http.get('http://xinga-me.appspot.com/api', (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            message.channel.send(`${message.author}, ${JSON.parse(data).xingamento}! `, {
                tts: true
            });
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    // if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    // const args = message.content.slice(prefix.length).split(' ');
    // const command = args.shift().toLowerCase();

    // console.log(command);

    // if(command === 'spin'){

    //     users = message.channel.members;
    //     users.delete(message.author.id);
        
    //     message.channel.send(`${message.author} spinned the bottle. The bottle is poiting towards ${users.get(getRandomKey(users))}`)
    // }
    
});