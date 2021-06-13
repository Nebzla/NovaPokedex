const axios = require('axios')

module.exports = {
    name: 'moves',
    description: 'queries for a pokemon\'s moves from the pokedex',
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

        if (i >= pokedex.length) {
            for (i = 0; i < pokedex.length; i++) {
                if (args[1].toLowerCase() != pokedex[i].id) continue
                else {
                    console.log(pokedex[i].name)

                    break;
                }
            }

            if (i >= pokedex.length) {
                return message.reply('I couldn\'t Find that Pokemon in the database!')
            }
        }
        let resp2
        if (args[2]) {
            resp2 = await axios.get(pokedex[i].url)
            let args2 = args.slice(2).join(' ');
            for (let i2 = 0; i2 < resp2.data.moves.length; i2++) {

                args2 = args2.replace(/-/g, ' ')
                resp2.data.moves[i2].move.name = resp2.data.moves[i2].move.name.replace(/-/g, ' ')
                console.log(resp2.data.moves[i2].move.name)
                if(args2.toLowerCase() !== resp2.data.moves[i2].move.name) continue;
                else {
                    resp = await axios.get(resp2.data.moves[i2].move.url)
                    console.log(resp.data)
                    let info =`
Power: ${resp.data.power}
Power Points: ${resp.data.pp}                    
Accuracy: ${resp.data.accuracy}
Damage Type: ${resp.data.damage_class.name.toUpperCase()}


Effect Chance: ${resp.data.effect_chance}
Crit Rate: ${resp.data.meta.crit_rate}
Drain: ${resp.data.meta.drain}
Flinch Chance: ${resp.data.meta.flinch_chance}
Healing: ${resp.data.meta.healing}
                    
                    `

                    info = info.replace(/null/g, 'N/A')
                    const embedToSend = new Discord.MessageEmbed()
                    .setTitle(`${args2.toUpperCase()} Info`)
                    .setColor('#FF0000')
                    .setDescription(`${info}`)
    
                    return message.reply(embedToSend)
                }
            }
            message.reply(`I couldn\'t find that move! Type %moves ${args[1]} to get a list of all the pokemon\'s moves!`)

        } else {
            let resp = await axios.get(`${pokedex[i].url}`)
            let moves = '\n'
            resp2 = await axios.get(resp.data.moves[0].move.url)
            console.log(resp2.data)
            for (let i2 = 0; i2 < resp.data.moves.length; i2++) {
                moves += `${resp.data.moves[i2].move.name} || `
            }

            const embedToSend = new Discord.MessageEmbed()
                .setThumbnail(resp.data.sprites.front_default)
                .setColor('#FF0000')
                .setTitle(`${pokedex[i].name.toUpperCase()}'s Moves`)
                .setDescription(`Amount: ${resp.data.moves.length}`)
                .setFooter(`${moves}`)

            message.reply(embedToSend)

        }


    }
}