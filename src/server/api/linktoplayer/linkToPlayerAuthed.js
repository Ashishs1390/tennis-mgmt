const router = require("express").Router();
const basicInformation = require("./../../models/basicInformation");
const { sign, verify } = require("jsonwebtoken");
const { JWT_KEY } = require('./../../utils/constants');
router.route('/').post(async (req, res, next) => {
    try {
        let emailFromToken;
        let token = req.get("authorization");
        if (token) {
            token = req.get("authorization");
            token = token.slice(7);
            verify(token, JWT_KEY, (err, decoded) => {
                req.user = decoded.result; // email, current_level
            });
        } 
        res.cookie("token", "");
        const { email } = req.body;

        let userDetails = await basicInformation.find(
            { email: req.user[0].email },
            { current_level: 1, email: 1, _id: 0, role: 1, first_name: 1, last_name: 1 }
        )

        userDetails = JSON.parse(JSON.stringify(userDetails))
        userDetails[0].selected_child = email;
        let itn_level = await basicInformation.find({ email: email }, { current_level: 1, _id: 0 });
        itn_level = JSON.parse(JSON.stringify(itn_level));
        userDetails[0].current_level = itn_level[0];
        userDetails = { ...userDetails[0], ...itn_level[0] };
        const jsontoken = sign({ result: [userDetails] }, "Asdfkgr456Edlflg", {
            expiresIn: "24h",
        });
        res.cookie("token", jsontoken);

        if (itn_level.length !== 0) {
            res.status(200).send(itn_level[0]);
        }
        else {
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
        });
    }

})


module.exports = router;