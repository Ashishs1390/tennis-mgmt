const router = require("express").Router();
const basicInformation = require("./../../models/basicInformation");
const { sign,verify } = require("jsonwebtoken");
const checkToken = require("./../../utils/tokenValidation");
console.log("--------------itn_level---------------------")
router.route('/').post(async (req, res, next) => {
    checkToken(req, res, next)
    console.log("--------------itn_level1123243---------------------")
    // res.send({ a: "a" });
    try {
        // token = req.get("authorization");
        // token = token.slice(7);
        // console.log(token);
        console.log(req.user[0].email)
        res.cookie("token", "");
        const { email } = req.body;

        let userDetails = await basicInformation.find(
            { email: req.user[0].email },
            { current_level: 1, email: 1, _id: 0, role: 1, first_name: 1, last_name: 1 }
        );
        let itn_level = await basicInformation.find({ email: email }, { current_level: 1, _id: 0 });
        itn_level = JSON.parse(JSON.stringify(itn_level));
        userDetails = JSON.parse(JSON.stringify(userDetails))
        console.log(userDetails)
        userDetails[0].selected_child = email;
        // userDetails[0].current_level = itn_level[0];
        userDetails = { ...userDetails[0], ...itn_level[0] };
        console.log("-----------11111111-----------------")
        console.log(userDetails)
        const jsontoken = sign({ result: [userDetails] }, "Asdfkgr456Edlflg", {
            expiresIn: "24h",
        });
        res.cookie("token", jsontoken);

        console.log(itn_level);
        if (itn_level.length !== 0) {
            res.status(200).send(itn_level[0])
        } else {
            res.status(404).send({
                errMsg: "No player found",
                status: 404
            })
        }
    } catch (err) {
        console.log(err)
        res.status(504).send({
            errMsg: "Internal server error",
            status: 504
        })
    }

})


module.exports = router;