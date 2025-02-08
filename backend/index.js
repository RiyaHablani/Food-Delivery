const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();


global.foodData = require("./db")(function call(err, data, CatData) {
  if (err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

const app = express();
const port = 5000;


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());


app.use("/api/auth", require("./Routes/Auth"));
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

//-----------------Deployment------------------
const __dirname1 = path.resolve();
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});