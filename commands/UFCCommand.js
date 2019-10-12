const { Command } = require("discord-akairo");
const rp = require("request-promise");
const { format } = require("date-fns");

const ESPN = "http://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard";
const { fightTypes } = require("./ufc/ufcCodes.js");

class UFCCommand extends Command {
  constructor() {
    super("ufc", {
      aliases: ["ufc"],
      category: "ufc",
      cooldown: 10000,
      ratelimit: 3
    });

    let eventName = false;
  }

  exec(message, args) {
    return rp({ uri: ESPN, json: true }).then(resp => {
      const { events } = resp;
      if (!events.length > 0) message.channel.send(`No Events Found from api`);

      const event = events[0];
      //get first event as that is all we care about
      const strTitle = this.getTitleInfo(event);
      const strSpacer = this.createSpacer("-", 55);
      const strFights = this.getFightCards(event);

      const messageResponse = `${strTitle}\n${strSpacer}${strSpacer}\n${strFights}`;
      return message.channel.send(`${messageResponse}`);
    });
  }

  getFightStatus(status) {
    if (!status.type.completed) {
      if (status.displayClock && status.period) {
        return `**LIVE:** *${status.displayClock} in Rd ${status.period}* | `;
      }
    }
    return "";
  }

  getFightCard(fight) {
    const status = this.getFightStatus(fight.status);
    const fightType = this.getFightType(fight.type.id);
    const fighters = this.getFighterInfo(fight.competitors);

    const strFight = `${status}${fighters} in *${fightType.trim()}* `;
    return strFight;
  }

  getFightCards(event) {
    //reverse the order we get them
    const comps = event.competitions.reverse();
    //map over each one
    const fights = comps.map(fight => {
      return this.getFightCard(fight);
    });
    return fights.join("\n");
  }

  getFighterInfo(fighters) {
    const info = fighters
      .sort((a, b) => {
        return a.order - b.order;
      })
      .map(fighter => {
        return `${fighter.winner ? "🥇" : ""} **${
          fighter.athlete.displayName
        }** (${fighter.records[0].summary})`;
      });

    return info.join("   vs   ");
  }

  getTitleInfo(event) {
    const title = [];
    //Name
    title.push(`🛑 **${event.name}** `);

    //Time
    const startTime = format(new Date(event.date), "E, MMM do @h:mm a z");
    title.push(` ⏰ ${startTime}`);

    //send it back
    return title.join(" | ");
  }

  getFightType(typeId) {
    const fType = fightTypes[typeId];
    if (!fType) return `-${typeId}-`;
    return fType.name;
  }

  createSpacer(char, xTimes) {
    let x;
    let str = "";
    for (x = 0; x < xTimes; x++) {
      str = `${str}${char}`;
    }
    return str;
  }

  /*
  getCornerColor(fighter) {
    let cornerColor = "";
    if (fighter.order == 1) cornerColor = "🔴";
    if (fighter.order == 2) cornerColor = "🔵";
    return cornerColor;
  }*/
}

module.exports = UFCCommand;
