const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const sendData = require('./api');
const fs = require('fs');
const usersFile = fs.readFileSync('users.json');


const corsOptions = {
  origin: '*'
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

const users = JSON.parse(usersFile);

app.use(basicAuth({
    users
}))

app.post('/translated-text', async (req, res) => {
  console.log(req.body);
 
  const response = await sendData('/translated-text',req.body);
  console.log(response);
  res.json(response);
});

app.post('/optimized-text', async (req, res) => {
  console.log(req.body);
 
  const response = await sendData('/optimized-text',req.body);
  console.log(response);
  res.json(response);
});

app.post('/autocorrected-text', async (req, res) => {
  console.log(req.body);
 
  const response = await sendData('/autocorrected-text',req.body);
  console.log(response);
  res.json(response);
});

app.post('/final-text', async (req, res) => {
  console.log(req.body);
 
  const response = await sendData('/final-text',req.body);
  console.log(response);
  res.json(response);
});

const server = app.listen(2223, () => {
  console.log(`Server listening on port 2223`);
});

server.on('connection', () => {
  console.log('A client has connected to the server.');
});

module.exports = app;
