// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require('./config/session.config')(app)

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "metApp_";

app.locals.appTitle = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);
const auth = require("./routes/auth.routes");
app.use("/", auth);

const user = require("./routes/user.routes");
app.use("/", user);

const collections = require("./routes/metropolitan.routes");
app.use("/", collections);
//RUTAS SIMPLEMENTE PARA TESTEAR
const test = require("./routes/test.routes");
app.use("/test", test);
const panel = require("./routes/control-panel.routes");
app.use("/", panel);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;