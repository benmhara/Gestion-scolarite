const mongoose = require('mongoose')

var PostMessage = mongoose.model('PostMessage',
{
    nom : {type:String},
    message : {type:String},
    dateN : {type:Date},
    identifiant : {type:Number},
    specialite : {type:String},
    niveau : {type:Number},
    moy : {type:Number}
},'postMessages')

module.exports = { PostMessage}