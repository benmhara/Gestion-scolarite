const mongoose = require('mongoose')

var PostCour = mongoose.model('PostCour',
{
    module : {type:String},
    cour : {type:String},
    enseignant : {type:String},
},'postCours')

module.exports = { PostCour}