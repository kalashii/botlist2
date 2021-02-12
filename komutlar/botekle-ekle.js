const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require('quick.db')
exports.run = function(client, message, args) {
let botID = args[0];
  let prefix = args[1];
  let renk = ayarlar.renk
  let basvuru = ayarlar.basvurulog;
  let eklekanal = ayarlar.eklekanal;
  let log = ayarlar.log;
  let sira = ayarlar.sıraLOG;
  let uye = client.users.cache.get(message.author)
  let bots = client.users.cache.get(botID)
  let sıra = db.fetch(`sıra_${message.guild.id}`)
  let emb = new Discord.MessageEmbed()
  .setDescription(`<:tr:780484679227932704> Sadece 1 bot ekleyebilirsin.
<:en:780485586535448616> You can add only one bot.`)
//if(db.has(`botsayi_${message.author.id}`)) return message.author.send(emb)
  if (message.channel.id !== eklekanal)
    return message.channel
      .send(`Bu komutu sadece <#${eklekanal}> kanalında kullanabilirsin.`)
      .then(msg => msg.delete({timeout : '3000'}));
  if (message.channel.id == eklekanal) {
if(!botID) return message.channel.send(`Lütfen eksik kısımları doldurun.\n**Doğru Kullanım**; \`\`${ayarlar.prefix}botekle <bot-id> <bot-prefix>\`\``).then(a => a.delete(5000))
if(!prefix) return message.channel.send(`Lütfen eksik kısımları doldurun.\n**Doğru Kullanım**; \`\`${ayarlar.prefix}botekle <bot-id> <bot-prefix>\`\``).then(a => a.delete(5000))


   
        let embed2 = new Discord.MessageEmbed()
    .setColor(renk)
    .setDescription(`
    ** 🤖 Bir bot başvurusu gönderildi**

    **・** ${message.author} **adlı kullanıcının botu** [<@!${botID}>] **sıraya eklendi**
    
    🤷‍♂️ **Sahip Bilgi |${message.author} \`[ ${message.author.id} ]\`**
   ₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
   **🎓 Bot Bilgi | <@!${botID}> \`[${botID}]\`**
   **🙌 Bot Öneki | \`[ ${prefix} ]\`**
    
  **[0 Perm Ekle](https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=0) | ` + ` [8 Perm Ekle](https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=8)**`)
    
    client.channels.cache.get(log).send(embed2)
    client.channels.cache.get(sira).send(message.author)
    let embed3 = new Discord.MessageEmbed()
    .setColor(renk)
    .setAuthor(message.author.username)
    .setDescription(`
    Sisteme Bir Bot Eklendi, Bu Bot İle Sırada Toplam ${sıra} Bot Mevcut!`)
    .addField("**Sahip Bilgi**",`${message.author} **(\`${message.author.tag}\`)**`)
    .addField("**Bot Hakkında**",`${bots.username}#${bots.discriminator} **(\`${botID}\`)**`)
    .setFooter(client.user.username, client.user.avatarURL({dynamic: true}))
    .setTimestamp()
    client.channels.cache.get(sira).send(embed3)
     let emba = new Discord.MessageEmbed()
     .setColor(renk)
    .setDescription(`
    **Botunuz başarıyla sıraya eklendi,en yakın zamanda test edilecektir** 
    `)
    message.author.send(emba)
    db.set(`sahip_${message.author.id}`, botID)
    db.add(`sıra_${message.guild.id}`,1)
    db.add(`botsayi_${message.author.id}`,1)

  }
    


     

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["add"],
  permLevel: 0
};

exports.help = {
  name: "botekle",
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: "botekle <botid> <prefix>"
};
