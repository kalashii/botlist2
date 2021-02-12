const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
var PREFIX = ayarlar.prefix
const db = require ('quick.db')
exports.run = async (client, message, args) => {
const merziki = new Discord.MessageEmbed()
.setColor('ORANGE')
.setTitle('Bot Nasıl Eklenir?')
.setTimestamp(30000)
.addField("• Botunuzu Eklemek İçin; \n\n `-botekle <botID> <prefix>`")
.setFooter('e')
message.channel.send(merziki)
};

 //youtube.com/linlords
//teşekkürler AloneDesign

//linlordscode.com

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['y','yardim','komutlar'], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'müzik'
};
