const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
app.use(morgan("dev"));
const PORT = 1337;
const { db, Page, User } = require("./models");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (request, response) => {
  response.send(layout());
});

// Where your server and express app are being defined:

// ... other stuff

const init = async () => {
  await db.sync({});
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
