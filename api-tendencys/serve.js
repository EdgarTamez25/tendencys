// IMPORTAR DEPENDENCIAS
const express    = require("express");
const bodyParser = require("body-parser");
var   cors       = require('cors');
// IMPORTAR EXPRESS
const app = express();
//Para servidor con ssl
const http = require('http');
const https = require('https');
const fs = require('fs');

// IMPORTAR PERMISOS
app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ----IMPORTAR RUTAS---------------------------------------->
var r_users          = require('./routes/users.routes');      r_users(app);

// CONEXION EN SERVER
https.createServer({
    key:  fs.readFileSync('/etc/letsencrypt/live/sofsolution.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/sofsolution.com/fullchain.pem'),
    passphrase: 'desarrollo'
}, app)
.listen(3010);
