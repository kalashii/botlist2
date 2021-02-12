const Discord = require("discord.js");
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};
let renk = ayarlar.renk
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(ayarlar.token);


client.on("ready", () => {
  client.user.setPresence({
    game: { name: `!botekle`, type: "WATCHING" },
    status: "online"
  });
});


client.on("message", message => {
  if(message.author.id === client.user.id) return
  if (message.channel.id == ayarlar.log) {

    message.delete();
    
  }
});
client.on("message", message => {
  if(message.author.id === client.user.id) return
  if (message.channel.id == ayarlar.onayLOG) {

    message.delete();
    
  }
});
client.on("message", message => {
   if(message.author.id === client.user.id) return
  if (message.channel.id == ayarlar.redLOG) {

    message.delete();
    
  }
});

client.on("message", message => {
   if(message.author.id === client.user.id) return
  if (message.channel.id == ayarlar.eklekanal) {

    message.delete();
    
  }
});


const db = require('quick.db')
client.on("guildMemberRemove", async member => {
let bot1 = db.fetch(`sahip_${member.user.id}`)
const kanal = member.guild.channels.cache.get(ayarlar.kickLOG)
let bot = member.guild.members.cache.get(bot1) 
let members = member;
if(members = bot1) {
let sebeb = `${member.user.tag} Adlı Sahip Kullanıcı Sunucudan Ayrıldı İçin.`
const embed = new Discord.MessageEmbed()
.setColor(renk)
.setAuthor(message.author.username)
.setDescription(`\`${member.user.tag}\` Adlı Kullanıcı Sunucudan Ayrdıldı!
${bot} Adlı Botu Sunucudan Engelendi.`)
const embed2 = new Discord.MessageEmbed()
.setColor(renk)
.setAuthor(message.author.username)
.setDescription(`\`${member.user.tag}\` Adlı Kullanıcı Sunucudan Ayrdıldın
${bot} Adlı Botu Sunucudan Engelendi.
Geri Gelerek Botunu Ekletmen Gerek 
https://discord.gg/Jy3BYrQYz5`)
member.send(embed2)
kanal.send(embed)
if(bot.user.bot) {
   bot.kick()
}  
db.delete(`sahip_${member.user.id}`)
}})
