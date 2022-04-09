const jwt = require('jsonwebtoken');
const data = require('./data');


const state = {
  cart: [],
} 

const getCart = (req, res) => {
  return res.status(200).json({ data: state.cart});       
}

 const saveCart = (req, res) => {
  state.cart = req.body        

  return res.status(200).json({ data: state.cart}); 
}


 const authentication = (req,res) => {
  let user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length){
      // create a token using user name and password vaild for 2 hours
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', token: token };

      // return the information including token as JSON
      return res.status(200).json(response);

  } else {
      return res.status("409").json("Authentication failed. admin not found.");
  }
}


module.exports = {getCart, saveCart, authentication}