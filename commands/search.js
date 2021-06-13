const axios = require('axios')

module.exports = {
    name: 'search',
    description: 'queries for a pokemon from the pokedex',
    async execute(client, message, Discord, config, pokedex, args, sqlite) {
        args = message.content.trim().split(/ +/g);

        if (!args[1]) return message.reply('What pokemon do you want to grab data for?')

        let i;
        for (i = 0; i < pokedex.length; i++) {
            if (args[1].toLowerCase() !== pokedex[i].name) continue
            else {
                console.log(pokedex[i].id)
                break;
            }
        }

        if (i >= 151) {
            for (i = 0; i < pokedex.length; i++) {
                if (args[1].toLowerCase() != pokedex[i].id) continue
                else {
                    console.log(pokedex[i].name)

                    break;
                }
            }

            if (i >= 151) {
                return message.reply('I couldn\'t Find that Pokemon in the database!')
            }
        }
        let resp = await axios.get(`${pokedex[i].url}`)
        let body = '\n'
        for(let i2 = 0; i2 < resp.data.stats.length; i2++) {
            body += `${resp.data.stats[i2].stat.name.toUpperCase()}: ${resp.data.stats[i2].base_stat}\n`
        }

        const embedToSend = new Discord.MessageEmbed()
            .setThumbnail(resp.data.sprites.front_default)
            .setTitle(`${pokedex[i].name.toUpperCase()}'s Info Card`)
            .setDescription(`
ID: ${pokedex[i].id}

__Base Stats__
${body}            
`)

        message.reply(embedToSend)




    }
}