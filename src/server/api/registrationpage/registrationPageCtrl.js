const router = require("express").Router();
const test = require("./../../models/testCollection");
const { genSaltSync, hashSync } = require("bcryptjs");
const basicInformation = require("./../../models/basicInformation");
const competancymetadata = require("./../../models/competancymetadata");

router.route("/").get(async (req, res, next) => {
    const { email } = req.query;
    let emailObj = {};
    if (email) {
        emailObj["email"] = email;
    } else {
        emailObj["email"] = req.user[0].email;
    }
    const data = await basicInformation.find(
        { ...emailObj },
        {
            first_name: 1, last_name: 1, email: 1, role: 1, user_name: 1, current_level: 1, _id: 0,
            parent_email: 1, coach_email: 1, children_email: 1, order_id: 1, isPayment:1
        
        }
    ).catch((err) => {
        console.log(err);
        res.status(504).send({
            errMsg: "internal server error!!!",
            status: 504
        })

    });

    if (data.length == 0) {
        res.status(404).send({
            errMsg: "user not found!!!",
            status: 404
        })
    } else {
        const resObj = data["0"];
        res.send(resObj);
    }
});

router.route("/").put(async (req, res, next) => {
    const { first_name, last_name, email } = req.body;
    let userObj = { first_name, last_name };
    if (req.body["email"] !== undefined) {
        let userDetails = await basicInformation.find({ email }, { email: 1, _id: 0 });
        if (userDetails.length == 0) {
            userObj = { ...userObj, email }
        } else {
            res.status(404).send({ msg: "user exist", status: 403 });
        }
    }
    const updatedData = await basicInformation.updateOne(
        { email: req.user[0].email }, {
            $set: {
                ...userObj
            }
    }, {
        upsert: false
    }).catch((err) => {
        console.log(err);
        res.status(504).json({
            errMsg: "internal server error",
            status: 504
        })
    })
    if (updatedData.length != 0) {
        console.log(updatedData);
        res.send(updatedData);
    }
});

module.exports = router;
