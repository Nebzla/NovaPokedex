const config = require('./config.json')
const pokedex = require('./pokedex.json')
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION", "USER",]
});

const sqlite = require('sqlite3').verbose()
client.login(config.token)


const fs = require('fs');
const prefix = config.prefix

client.commands = new Discord.Collection();
client.prefix = prefix

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log(`Nova Pokédex Is Online!`)
    const db = new sqlite.Database('./databases/preferences.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
    db.run('CREATE TABLE IF NOT EXISTS userPreferences(userid TEXT NOT NULL, usertag TEXT NOT NULL, favoritePokemon TEXT NOT NULL, pokemonId TEXT NOT NULL)');
    await client.user.setActivity(`151 Pokemon`, {
        type: `WATCHING`
       
    })

})

let newRole
client.on('message', async message => {

    for (let i = 0; i < pokedex.length; i++) {

        setTimeout(async function() {
            if(!message.member.guild.roles.cache.find(role => role.name == pokedex[i].name)) {
                console.log(pokedex[i].name)
                newRole = await message.guild.roles.create({
                    data:{
                        name: pokedex[i].name,
                        color: "gray",
                    },
                    reason: "Adding pokemon roles",
                })
            }
        }, 1000)
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
        
    let args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

   if (!command) return;
    try {
        args = message.content.trim().split(/ +/g);
        client.commands.get(command).execute(client, message, args, config, pokedex, Discord, sqlite);
    } catch (error) {
       console.error(error);
        message.reply('There was an error trying to execute that command');
        }
    })

