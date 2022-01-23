const mongoose = require('mongoose')


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
var postMessageRoutes = require('./controllers/postMessageController')
var postEnseignantRoutes = require('./controllers/postEnseignantController')
var postCourRoutes = require('./controllers/postCourController')
var postPfeRoutes = require('./controllers/postPfeController')

//app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/postMessages',postMessageRoutes)
app.use('/postEnseignants',postEnseignantRoutes)
app.use('/postCours',postCourRoutes)
app.use('/postPfes',postPfeRoutes)

const db = require("./app/models");
const Role = db.role;


mongoose.connect('mongodb://localhost:27017/postManagerDB',{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connection succeeded.')
        else
            console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    })

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
  });
  
  // routes
  require("./app/routes/auth.routes")(app);
  require("./app/routes/user.routes")(app);
  
  // set port, listen for requests
  const PORT = process.env.PORT || /* 8082*/ 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        /*new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });*/
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }