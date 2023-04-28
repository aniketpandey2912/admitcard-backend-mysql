const express = require("express");
const { db } = require("../config/db");
const admitcardRouter = express.Router();

admitcardRouter.get("/", (req, res) => {
  res.send("All cards");
});

admitcardRouter.post("/getadmitcard", (req, res) => {
  const { name, phone, school, _class, roll_no, address } = req.body;
  const postQuery =
    "INSERT INTO admitcard(name, phone, school, class, roll_no, address) VALUES (?,?,?,?,?,?)";

  db.query(
    postQuery,
    [name, phone, school, _class, roll_no, address],
    (err, result) => {
      if (err) {
        res.send({ status: false, error: err.sqlMessage });
      } else {
        // console.log(result);
        let getQuery = `SELECT * FROM admitcard WHERE roll_no=?`;
        db.query(getQuery, roll_no, (err1, result1) => {
          if (err1) {
            res.send({ status: false, error: err.sqlMessage });
          } else {
            res.send({
              status: true,
              mssg: "Information added sucessfully",
              admitcardInfo: result1[0],
            });
          }
        });
      }
    }
  );
});

module.exports = {
  admitcardRouter,
};
