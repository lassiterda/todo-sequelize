//main module requires
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require('handlebars');
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;

//static assets middleware
app.use(express.static(__dirname + "/public"));
//mounting body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

const db = require("./models");

//Mounting express-handlebars as template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
