<h1>NovaPokedex</h1>
An Open Source Discord Bot For A Pokemon Style Game!


<h2>Terms Of Service</h2>
- You may not use this bot for financial gain.<br>
- You may not claim the bot as your own.
  
  
<h1>Setup</h1>

  
To connect the code to your bot, head to the config.json and fill in the token and prefix option with the appropiate data, here's an example below:

Unsure on where to get the token? https://discord.com/developers/applications
```json
{
    "token": "eUzMjc0gY2ODyEweyMzcz.YqS_9Q.307ekqvMjRz7efHkmeJs", 
    "prefix": "%"
}
```
(That token is not valid so don't try and use it)
 
  
Node.js is required for the application to work. Don't have node.js? Install it here: https://nodejs.org/en/
The DB used is SQLite but feel free to change this as you please!
  
If you would like to change the pokemon you can in pokedex.json. Please keep in mind the max amount of roles in a server is 200. I would recommend staying below 160 pokemon
  
Currently the bot is extremely lackluster but will be developed further in future, enjoy what i've got so far!

Discord: Nebzla#5032



<h1>Commands (Currently)</h1>

favorite <pokemon> - Favourite a pokemon from the pokedex, <pokemon> accepts name or id
 
search <pokemon> - Search a pokemon by their id or name (searching id returns name, searching name returns id)

