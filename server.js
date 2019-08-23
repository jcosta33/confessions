const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const users = require('./api/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://localhost:27017/beamian";
const port = process.env.PORT || 5000;

mongoose.connect(url).then(() => {
  console.log("Mongoose is running");
}).catch(err => console.log(err));

app.use('/api/users', users);

app.get('/files/:user_id/:name', (req, res) => {

  res.download(`${__dirname}/files/${req.params.user_id}/${req.params.name}`);

});

app.listen(port, () => {
  console.log("Server started on port " + port);
});