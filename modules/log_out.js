const config = require('../config/config');
module.exports = {
    help: 'Disconect the bot',
    func: (client, msg, args) => {
        if(msg.author.id!==config.discord.owner) {
            msg.channel.sendMessage('Papi <@' + config.discord.owner + '> (づ⍜⍘⍜)づ, <@' + msg.author.id + '> tried to abuse me, ban him pls!');
            return;
        }

        else{
            msg.reply(' has shut me down');
            client.destroy((err) => {console.log(err);});
        }
    }
};