const mongoose = require('mongoose')

var PostEnseignant = mongoose.model('PostEnseignant',
{
    nom : {type:String},
    message : {type:String},
    dateN : {type:Date},
    identifiant : {type:Number},
    specialite : {type:String},
    module : {type:String}
},'postEnseignants')

module.exports = { PostEnseignant}