const express = require("express");
const app = express();

app.get("/", (req, res) => {  
  console.log(getTimestampLog() + " procesando peticion...");
  res.send("Hola Comunidad!");
});

app.get("/health", (req, res) => {
  res.status(200);
  res.send("UP");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

function getTimestampLog() {
  return new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000).toISOString().replace(/(.*)T(.*)\..*/,'$1 $2');
}