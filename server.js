console.log('May Node be with you')
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const User = require("./User");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }))
mongoose
  .connect("mongodb://localhost:27017/crud", {
    useNewUrlParser: true
  })
  .then(() => console.log("connection to database"))
  .catch((e) => console.log("database error: " + e.message));



//create a user
app.post("/", (req, res) => {
  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  var user = new User(newUser);

  user
    .save()
    .then(() => {
      console.log("New user created!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  res.send(" A new user created with success!");
});

app.get("/", (req, res) => {
  //console.log("heu");
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/:id", (req, res) => {
  User.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("User removed with success!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/", (req, res) => {
  User.deleteMany()
    .then(() => {
      res.send("users removed with success!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});


app.listen(3000, function() {
    console.log('listening on 3000')
  })
