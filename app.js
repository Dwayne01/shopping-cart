const express = require('express');
mongoose = require('mongoose');

const app = express();


const cors = require('cors');
const bodyParser = require('body-parser');

const { getCart, saveCart, authentication } = require('./controller');

app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send('Welcome to root server')
})


app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.get('/api/cart', getCart);

app.post('/api/cart', saveCart);

app.post('/api/auth', authentication);

const PORT = 8080;
const MONGO_URL = "mongodb+srv://username:fullstack@cluster0.ktsvn.mongodb.net/Cluster0?retryWrites=true&w=majority";

app.listen(PORT); 
console.log('api runnging on port ' + PORT + ': ');


const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    server.listen(port, () => {
      console.log(`Server is listening to port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()