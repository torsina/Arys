const Arys = require('../Arys');
const post = require('./post');
const config = require('../config/config');
const db = require('../util/rethinkdb');
const perms = require('../config/perm/perms');


let image = [];
for(let id=0; id<post.line; id++){
    image[id] = [];
}



module.exports = {
    help: 'Use this if some retard placed loli in my lists, usage : $report (id)',
    func: (client, msg, args, role) => {
        if(config.env === "dev") return;
        setTimeout(function() {
            msg.delete();
        }, config.discord.wait);
        if(perms.check("report.base", role, msg.author.id) !== true) {
            msg.channel.send("You don't have the permission `report.base`");
            return;
        }
        if(args[0] === undefined) {
            msg.channel.send("please enter the id of the image you want to report")
        }

        db.getPost(args[0], config.post.file, msg.guild.id).then(query => {
            let report = parseInt(query.report_count) + 1;
            if(perms.check("report.force", role, msg.author.id) === true && args[1]==='--force'){
                msg.channel.fetchMessage(query.message)
                    .then(m => {
                        m.delete();
                        db.deletePost(query.message, msg.guild.id);
                        msg.channel.send("id : "+args[0]+" was deleted")
                    })
                    .catch(console.error);
                return;

            }
            else if(perms.check("report.force", role, msg.author.id) !== true && args[1]==='--force') {
                msg.channel.send("You don't have the permission `report.force`");
                return;
            }
            else if(!image[args[0]].includes(msg.author.id)){
                image[args[0]][report-1] = msg.author.id;
            }
            else {msg.reply("you already reported this image you twat !").then(m => {
                setTimeout(function() {
                    m.delete();
                }, config.discord.wait);
            });
                return;
            }
            db.reportPost(query.message, msg.guild.id).catch(console.error);
            msg.channel.send("report count : " + report).then(m => {
                setTimeout(function() {
                    m.delete();
                }, config.discord.wait);
            });
            msg.channel.fetchMessage(query.message)
                .then(m => {
                    let edit = m.content.split("-");
                    edit[0] += "\n" + "-" + "\n" + "report count : " + report;
                    m.edit(edit[0])
                        .catch(console.error);
                })
                .catch(console.error);
            if(report > config.report.need){
                msg.channel.fetchMessage(query.message)
                    .then(m => {
                        m.delete();
                        db.deletePost(query.message, msg.guild.id);
                        msg.channel.send("id : "+args[0]+" was deleted")
                    })
                    .catch(console.error);
            }
        });

    }
};