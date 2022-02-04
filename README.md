# DiscordBot: Chef-Wildcat

## Bot Setup

### NodeJS Dependencies To Install with NPM
Can be installed with `npm install <package>`
 - Discord.js
 - @discordjs/rest
 - pg

### Install PostgreSQL
Can be downloaded from [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

### `config.json` Format
Create a `config.json` file with the following format.
```json
{
    "token": "bot token here",
    "clientId": "oath2 client id here",
    "guildId": "testing server id here",
    "adminRole": "role name here"
}
```

### Slash commands
These slash commands can be uploaded to a testing server using the `deploy-commands.js` script, given that the server `guildId` is saved in the config file and that the bot has been invited to the server with the slash command permission.

```powershell
# For uploading to a guild for testing
node deploy-commands.js
# For uploading globally
node deploy-commands.js -g
```

The commands uploaded to a test server will all have "dev" added to the end of them, to distinguish between previously uploaded global commands. 
