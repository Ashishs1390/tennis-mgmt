const router = require("express").Router();
const test = require("./../../models/testCollection");
const { genSaltSync, hashSync } = require("bcrypt");
const basicInformation = require("./../../models/basicInformation");

router.route("/").get(async (req, res, next) => {
  const data = await basicInformation.find(
    { email: req.user[0].email },
    { first_name: 1, last_name: 1, email: 1, role: 1, user_name: 1, _id: 0 }
  );
  res.send({ data });
});

module.exports = router;
