const sql = require("./db.js");

// constructor
const Users = function(user) {
  this.name = user.name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.country     = user.country;
  this.phone   = user.phone;
  this.password   = user.password;
};
// validaEmail
// VARIABLES PARA QUERYS

Users.login = (loger,result) =>{
  sql.query("SELECT * FROM users WHERE email = ? AND password = ?"
    ,[loger.email, loger.password],(err, res) => {
    if (err) { 
      console.log("error: ", err); 
      result(err, null);
      return 
    }
    console.log('log',res)
    result(null, res)
  });
};

Users.validaEmail = (usuario, result) =>{
  sql.query("SELECT * FROM users WHERE email = ?",[usuario.email],(err, res) => {
    if (err) { 
      result(err, null);  return;
    }
    result(null, res)
  });
};

Users.createUser = (u, result) => {
  sql.query("INSERT INTO users(name, last_name, email, country, phone, password)VALUES(?,?,?,?,?,?)",
  [u.name, u.last_name, u.email, u.country, u.phone, u.password] ,(err, res) => {
    if (err) { 
      result(err, null); 
      return; 
    }
    console.log("creando usuario: ", { id: res.insertId, ...u });
    result(null, { id: res.insertId, ...u });
  });
};


module.exports = Users;