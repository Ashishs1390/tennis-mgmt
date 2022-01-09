const router = require("express").Router();
const test = require("./../../models/testCollection");
const { genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const basicInformation = require("./../../models/basicInformation");

router.route("/logout").post(async (req, res, next) => {
  res.cookie("token", "");
  res.json({
    message: "Logout successfully",
  });
});

router.route("/:role").post(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const { role } = req.params;
  const userDetails = await basicInformation.find(
    { email: email, role: role },
    { current_level: 1, email: 1, password: 1, _id: 0 }
  );
  console.log(userDetails);

  if (userDetails.length == 0) {
    res.status(404).send({ message: "user does not exist", status: 404 });
  } else {
    const passwordCheck = compareSync(password, userDetails[0].password);
    console.log(passwordCheck);
    if (passwordCheck) {
      userDetails[0].password = undefined;
      const jsontoken = sign({ result: userDetails }, "Asdfkgr456Edlflg", {
        expiresIn: "24h",
      });
      console.log(jsontoken);
      res.cookie("token", jsontoken);
      // res.cookie('itn_level',)
      res.json({
        message: "login successfully",
        token: jsontoken,
        current_level: userDetails[0].current_level,
      });
    } else {
      res.status(404).send({
        message: "Invalid username or password",
        status: 404,
      });
    }
  }
});

module.exports = router;
