
const Users = require("../models/users.model.js");

exports.session = (req, res)=>{
  Users.login(req.body,(err, data)=>{
    if (err) {
      res.status(500).send({
        message: "Error searching for user" 
      });
      
    } else {
      if(!data.length){
        res.status(404).send({ message: `This user is not registered`})
      }else{
        console.log('data',data);
       res.status(200).send(data);
      }
    }
   
  });
};

exports.register = (req, res)=>{
  Users.validaEmail(req.body,(err,data)=>{
    if(data.length){ 
      res.status(500).send({
        message: `This email is registered`
      });
    }else{
      Users.createUser(req.body,(err,data)=>{ 
        if(err) 
          res.status(500).send({ message: err.message || "An error occurred in creating the user"
        })
         else res.status(200).send({ message: "Successfully registered user"})
      })
    }
  });
}

