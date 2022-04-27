require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

const projectName = "metApp_";
app.locals.appTitle = `Museum`;

require('./routes')(app)
require("./error-handling")(app);

module.exports = app;