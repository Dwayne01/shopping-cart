const express = require('express');
mongoose = require('mongoose');

const app = express();


const cors = require('cors');
const bodyParser = require('body-parser');

const { getCart, saveCart, authentication } = require('./controller');



app.use(express.json());

app.use(express.static("public"));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to root server')
})


app.get('/api/cart', getCart);

app.post('/api/cart', saveCart);

app.post('/api/auth', authentication);

const PORT = 8080;

app.listen(PORT); 
console.log('api runnging on port ' + PORT + ': ');

