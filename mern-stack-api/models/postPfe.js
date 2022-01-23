const mongoose = require('mongoose')

var PostPfe = mongoose.model('PostPfe',
{
    titre : {type:String},
    description : {type:String},
    tech : {type:String},
    fiche : {type:String},
    date : {type:Date},
},'postPfes')

module.exports = { PostPfe}