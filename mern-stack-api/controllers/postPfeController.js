const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { PostPfe } = require('../models/postPfe')


router.get('/', (req, res) => {
    PostPfe.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new PostPfe({
        titre: req.body.titre,
        description: req.body.description,
        tech: req.body.tech,
        fiche: req.body.fiche,
        date: req.body.date,
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        titre: req.body.titre,
        description: req.body.description,
        tech: req.body.tech,
        fiche: req.body.fiche,
        date: req.body.date,
    }

    PostPfe.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    PostPfe.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})


module.exports = router