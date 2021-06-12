

module.exports = {
    name: 'favorite',
    description: 'favourite a certain pokemon',
    async execute(client, message, Discord, config, pokedex, args, sqlite) {
        args = message.content.trim().split(/ +/g);

        if(!args[1]) message.reply('What pokemon do you want to favourite?')
    
        let pokemon
        let pokemonId
        let found = false
        for(let i = 0; i < pokedex.length; i++) {
            if(pokedex[i].name.toLowerCase() !== args[1].toLowerCase()) continue
            else {
                pokemon = pokedex[i].name
                pokemonId = pokedex[i].id
                found = true
            }
        }
        const db = new sqlite.Database('./databases/preferences.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
        setTimeout(function() { 
            if(found === false) return message.reply(`I couldn\'t find ${args[1].toLowerCase()} in my Pokédex!`) 

            const query = 'SELECT * FROM userPreferences WHERE userid = ?'

            db.get(query, [message.author.id], (err, row) => {
                if(row === undefined) {
                    const insertdata = db.prepare(`INSERT INTO userPreferences VALUES(?,?,?,?)`)
                    insertdata.run(message.author.id, message.author.tag, pokemon, pokemonId)
                    insertdata.finalize()
                    message.reply(`I went ahead and added ${pokemon} (ID: ${pokemonId}) as your favourite Pokémon!`)
                    const role = message.guild.roles.cache.find(role => role.name === `${pokemon}`);
                    message.member.roles.add(role)
                    message.member.setNickname(`${message.author.username} [${pokemon}]`)
                    
                }
                else if(row !== undefined) {

                    if(row.favoritePokemon === pokemon) return message.reply('You already have that Pokémon favourited!')
                    db.run(`UPDATE userPreferences SET userid = ?, usertag = ?, favoritePokemon = ?, pokemonId = ? WHERE userid = ?`, [message.author.id, message.author.tag, pokemon, pokemonId, message.author.id])
                    const role = message.guild.roles.cache.find(role => role.name === `${pokemon}`);
                    const role2 = message.guild.roles.cache.find(role => role.name === `${row.favoritePokemon}`);
                    message.member.roles.add(role.id)
                    message.member.roles.remove(role2.id)
                    message.member.setNickname(`${message.author.username} [${pokemon}]`)
                    message.reply(`I went ahead and changed your favourite Pokémon from ${row.favoritePokemon} To: ${pokemon} (ID: ${pokemonId}) as your favourite Pokémon!`)
                
                }
            })
        }, 2000)
    
    }
}