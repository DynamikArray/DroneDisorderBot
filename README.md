## ENV FILE

ADMIN_ID=(guild admin ids)
DISCORD_BOT_TOKEN=(get it when you create the bot at https://discordapp.com/developers/applications/me)
WEB_URL=The heroku deployment url, so teh bot can keep itself alive

## SQLLite

```
create table guild_config (guild_id string, prefix string );
delete from guild_config where guild_id <> 0;
```

During testing those can be usefull ;)
