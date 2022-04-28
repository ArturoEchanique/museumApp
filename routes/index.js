module.exports = app => {
    const index = require("./index.routes");
    app.use("/", index);
    const auth = require("./auth.routes");
    app.use("/", auth);
    const user = require("./user.routes");
    app.use("/", user);
    const collections = require("./metropolitan.routes");
    app.use("/", collections);
    const test = require("./test.routes");
    app.use("/test", test);
    const panel = require("./control-panel.routes");
    app.use("/", panel);
    const places = require("./places.routes");
    app.use("/", places);
    const video = require("./video.routes");
    app.use("/", video);
}