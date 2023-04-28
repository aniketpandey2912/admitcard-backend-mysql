const express = require("express");
const { db } = require("../config/db");
const admitcardRouter = express.Router();

admitcardRouter.get("/", (req, res) => {
  res.send("All cards");
});

admitcardRouter.post("/getadmitcard", (req, res) => {
  const { name, phone, school, _class, roll_no, address } = req.body;

  const getQuery1 = `SELECT * FROM admitcard WHERE roll_no=?`;
  db.query(getQuery1, roll_no, (err, result) => {
    // if already existing
    if (result.length > 0) {
      res.send({
        status: true,
        mssg: "Admitcard generated sucessfully",
        admitcardInfo: result[0],
      });
    }
    // If non existing
    else {
      const postQuery =
        "INSERT INTO admitcard(name, phone, school, class, roll_no, address) VALUES (?,?,?,?,?,?)";
      let queryArr = [name, phone, school, _class, roll_no, address];
      db.query(postQuery, queryArr, (err, result) => {
        if (err) {
          res.send({ status: false, error: err.sqlMessage });
        } else {
          let getQuery2 = `SELECT * FROM admitcard WHERE roll_no=?`;
          db.query(getQuery2, roll_no, (err1, result1) => {
            if (err1) {
              res.send({ status: false, error: err.sqlMessage });
            } else {
              res.send({
                status: true,
                mssg: "Information added and genrated admitcard sucessfully",
                admitcardInfo: result1[0],
              });
            }
          });
        }
      });
    }
  });
});

module.exports = {
  admitcardRouter,
};