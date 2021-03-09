module.exports = app => {
  const users = require('../controllers/users.controllers') // --> ADDED THIS
  // Iniciar Sesion 
  app.post("/login", users.session);
  app.post("/register.user", users.register);
}