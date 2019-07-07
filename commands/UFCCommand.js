const { Command } = require("discord-akairo");
const rp = require("request-promise");
const cheerio = require("cheerio");

const BASE_URL = "https://www.ufc.com";
const EVENTS_URL = "/events";

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
    this.fetchEventListing(EVENTS_URL)
      .then(eventData => {
        this.fetchCardDetails(eventData.link).then(fightCard => {
          const messageResponse = `**${this.eventName}\n${eventData.date} - ${
            eventData.headline
          }** \n`;

          const events = fightCard.map(fight => {
            return `${fight.weightClass} - ${fight.red.givenName} ${
              fight.red.familyName
            } *VS*  ${fight.blue.givenName} ${fight.blue.familyName} \n`;
          });

          message.channel.send(`${messageResponse} ${events.join("")}`);
        });
      })
      .catch(err => {
        message.channel.send(`Ooops, I didnt get event data ${err.message}`);
      });
  }

  fetchEventListing(path) {
    return rp(BASE_URL + path)
      .then(html => {
        const $ = cheerio.load(html);
        const headline = $(".c-card-event--result__headline a")
          .first()
          .text();
        const date = $(".c-card-event--result__date a")
          .first()
          .text();
        const link = $(".c-card-event--result__date a")
          .first()
          .attr("href");
        return { headline, date, link };
      })
      .catch(err => {
        console.error("Error in fetchEventListing:", err);
      });
  }

  fetchCardDetails(path) {
    return rp(BASE_URL + path)
      .then(html => {
        const matchups = [];
        const $ = cheerio.load(html);

        this.eventName = $("title")
          .first()
          .text();

        $(".c-listing-fight__content").each((i, ele) => {
          const fightData = {};
          fightData.red = {};
          fightData.blue = {};

          fightData.weightClass = $(ele)
            .find(".c-listing-fight__class")
            .text();

          fightData.red.givenName = $(ele)
            .find(
              ".c-listing-fight__corner--red .c-listing-fight__corner-given-name"
            )
            .text();

          fightData.red.familyName = $(ele)
            .find(
              ".c-listing-fight__corner--red .c-listing-fight__corner-family-name"
            )
            .text();

          fightData.blue.givenName = $(ele)
            .find(
              ".c-listing-fight__corner--blue .c-listing-fight__corner-given-name"
            )
            .text();

          fightData.blue.familyName = $(ele)
            .find(
              ".c-listing-fight__corner--blue .c-listing-fight__corner-family-name"
            )
            .text();

          matchups.push(fightData);
        });
        return matchups;
      })
      .catch(err => {
        console.error("Error in fetchCardDetails:", err);
      });
  }
}

module.exports = UFCCommand;
