require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var postMessageRoutes = require('./controllers/postMessageController')
var postEnseignantRoutes = require('./controllers/postEnseignantController')
var postCourRoutes = require('./controllers/postCourController')
var postPfeRoutes = require('./controllers/postPfeController')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:3000'}))
app.listen(4000,()=>console.log('Server started at : 3000'))


app.use('/postMessages',postMessageRoutes)
app.use('/postEnseignants',postEnseignantRoutes)
app.use('/postCours',postCourRoutes)
app.use('/postPfes',postPfeRoutes)
