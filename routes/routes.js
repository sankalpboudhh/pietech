const express = require("express");
const UserModel = require("../model/model");

const router = express.Router();

router.get("/user", async (req, res) => {
  const nameQuery = req.query.name;
  const sortOrder = req.query.sortOrder || "ASC";
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  if (sortOrder != "ASC" && sortOrder != "DESC") {
    return res
      .status(400)
      .send({ message: "Incorrect sortOrder:" + sortOrder });
  }
  // if (!Number.isInteger(offset) || !Number.isInteger(limit)) {
  //   return res
  //     .status(400)
  //     .send({ message: "Limit and offset should be integers" });
  // }
  if (offset < 0) {
    return res.status(400).send({ message: "Offset should be non-negative" });
  }
  if (limit > 100) {
    return res.status(400).send({ message: "Limit allowed upto 100" });
  }

  let query;
  if (nameQuery) {
    query = UserModel.find({ name: { $regex: nameQuery, $options: "i" } });
  } else {
    query = UserModel.find();
  }

  query = query.sort({ age: sortOrder });
  query = query.skip(offset).limit(limit);

  query.exec((err, users) => {
    if (err) {
      console.log("query.exec: err:", err);
      res.status(500).send({ message: err });
    }
    return res.json(users);
  });
});

module.exports = router;
