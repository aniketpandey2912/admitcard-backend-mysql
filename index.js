require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { admitcardRouter } = require("./controllers/admitcard.routes");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("WELCOME TO HOME PAGE");
});

app.use("/admitcard", admitcardRouter);

app.listen(process.env.PORT || 4500, () => {
  console.log("Server running at port", process.env.PORT || 4500);
});
