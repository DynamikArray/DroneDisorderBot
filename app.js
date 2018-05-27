require("dotenv").config();
var debug = require("debug");
var env = process.env.NODE_ENV || "dev";

//Discord Bot
const Client = require("./lib/Client.js");
const client = new Client();

client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
  //do we have a startMessageAlready???
  console.log("Discord Started!");
});

//Express App
var express = require("express");
var app = express();

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost: " + app.get("port"));
});

var http = require("http");
setInterval(function() {
  http.get(process.env.WEB_URL);
}, 300000); // every 5 minutes (300000)
