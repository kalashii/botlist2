const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

let prefix = ayarlar.prefix;

module.exports = client => {
  client.user.setStatus("online");
  client.user.setActivity(`!botekle`)
console.log('Botcase Aktif');
};