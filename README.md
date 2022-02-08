# DiscordBot: Chef-Wildcat

## Bot Setup

### NodeJS Dependencies To Install with NPM
Can be installed with `npm install <package>`
 - Discord.js
 - @discordjs/rest
 - pg
 - sequelize

### PostgreSQL
`pgAdmin` can be downloaded from [postgreSQL](https://www.postgresql.org/ftp/pgadmin/pgadmin4/v6.4/windows/).

### `config.json` Format
Create a `config.json` file with the following format.
```json
{
    "token": "bot token here",
    "clientId": "oath2 client id here",
    "guildId": "testing server id here",
    "adminRole": "role name here, for running certain commands"
}
```

### Slash commands
These slash commands can be uploaded to a testing server using the `deploy-commands.js` script, given that the server `guildId` is saved in the config file and that the bot has been invited to the server with the slash command permission. Run using `node deploy-commands.js <flag>` with up to one flag at a time. The commands uploaded to a test server will all have "dev" added to the end of their descriptions, to distinguish between previously uploaded global commands. 

##### Flags
- None: Default, uploads commands to a guild for testing
- `-g`: Uploads commands globally (may take an hour to reflect on Discord)
- `-ct`: Clears testing commands from the test guild (does not remove global commands)
- `-cg`: Clears global commands (may take an hour)
