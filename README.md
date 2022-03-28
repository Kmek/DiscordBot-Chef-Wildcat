# DiscordBot: Chef-Wildcat

## Bot Setup

### `/ChefWildcat-bot` NodeJS Dependencies To Install with NPM
Can be installed with `npm install <package>`
 - Discord.js
 - @discordjs/rest
 - pg
 - sequelize
 - axios
 - cheerio

<!-- ### `/WebPage` NodeJS Dependencies To Install with NPM
Can be installed with `npm install <package>`
 - pg
 - sequelize
 - express -->
 <!-- - fs? -->

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

### Docker
This application is containerized, so `Docker` must be started before running `docker-compose up -d`. The application runs in a `NodeJS` container named `chefwildcat`, and the `Postgres` database is in a container named `pgdb`. For testing, the `docker-compose up --build` can be used to follow the outputs of the containers.

## Commands
The following commands are implemented in this bot:

#### `/ping`
A simple ping-pong command for testing if the bot is running.

#### `/philly`
Displays the given menus for the day for Philbrook dining hall.

#### `/hoco`
Displays the given menus for the day for Holloway Commons dining hall.

#### `/stillings`
Displays the given menus for the day for Stillings dining hall.

#### `/breakfast`
Displays the given menus for the day for breakfast.

#### `/lunch`
Displays the given menus for the day for lunch.

#### `/dinner`
Displays the given menus for the day for dinner.

#### `/favorite`
Marks a menu item as a favorite. Only available in DMs.

#### `/unfavorite`
Unmarks a menu item as a favorite. Only available in DMs.

#### `/favorites`
Displays the favorited items list. Only available in DMs.

#### `/test`
A command for testing

#### `/halltoggle`
Toggles the daily subscription for a given hall in a given channel or direct message.
<!-- todo -->

#### `/refresh`
Refreshes the subscribed menus for the subscriptions in the given channel or direct message.
<!-- todo -->

<!-- 
- search for a menu items
- favorite, removefavorite
- dislike, removedislike
- showsubs
 -->

 <!-- idea
 Count how many queries of everything there is, how many users, etc.
 New database table for this stuff
 Make an express webserver that reads from this
 Maybe make a new container for this webserver so it can run separately from chef wildcat, but still access pgdb -->

 <!-- todo
 idea CI-CD Pipeline:
 - Commit to git repo (main branch only)
 - Run deploy-commands.js globally
 - Build dockerfile
 - Send dockerfile to PaaS (to be determined)
 - Start up discordbot and db from dockerfile
 - Discordbot can be used then
 -->

 <!-- idea
 Should the diningHall info be imported as a global object once into the js program, then it can be constantly accessed with ease?
 is this faster/better than fetching from the db all the time?
 Should there be a diningHall object that is just returned from the db and passed around per interaction?
 -->