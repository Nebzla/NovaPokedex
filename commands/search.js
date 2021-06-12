

module.exports = {
    name: 'search',
    description: 'queries for a pokemon from the pokedex',
    async execute(client, message, Discord, config, pokedex, args, sqlite) {
        args = message.content.trim().split(/ +/g);

        if(!args[1]) message.reply('What pokemon do you want to grab data for?')
    

        let found = false
        for(let i = 0; i < pokedex.length; i++) {
            if(pokedex[i].name.toLowerCase() !== args[1].toLowerCase()) continue
            else {
                message.reply(`Found It! ID: ${pokedex[i].id}`)
                found = true
            }
        }


        setTimeout(function() {
             if(found === false) {
                for(i = 0; i < pokedex.length; i++) {
                    if(pokedex[i].id.toLowerCase() !== args[1].toLowerCase()) continue
                    else {
                        message.reply(`Found It! Name: ${pokedex[i].name}`)
                        found = true
                    }
                } 
            }
            setTimeout(function() {
                if(found === false) {
                    message.reply(`I couldn\'t find ${args[1].toLowerCase()} in my Pokédex!`) 
                }
            }, 1000)

        }, 1000)
    
    }
}