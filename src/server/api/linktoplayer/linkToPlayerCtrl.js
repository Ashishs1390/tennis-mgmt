const router = require("express").Router();
const basicInformation = require("./../../models/basicInformation");

router.route('/').put(async (req, res, next) => {
    try {
        const { player_email, parent_email, coach_email } = req.body;
        const isExist = await basicInformation.find({ email: player_email }).catch((err) => {
            console.log(err);
        })
        let updatePlayerObj = {};
        let updatePCObj = {};
        console.log(isExist);
        if (isExist.length == 0) {
            res.status(404).send({
                errorMsg: "player not found",
                code: 404
            })
        }
        if (parent_email) {
            updatePlayerObj.parent_email = parent_email;
            updatePCObj.email = parent_email;
        }
        if (coach_email) {
            updatePlayerObj.coach_email = coach_email;
            updatePCObj.email = coach_email;
        }
        const updatedPlayerInfo = await basicInformation.updateOne(
            { email: player_email }, {
            $set: {
                ...updatePlayerObj
            }
        }, {
            upsert: true
        }).catch((err) => {
            console.log(err);
            res.status(504).json({
                errMsg: "internal server error",
                status: 504
            })
        })
        if (updatedPlayerInfo) {
            await basicInformation.updateOne(
                { ...updatePCObj }, {
                $set: {
                    children_email: player_email
                }
            }, {
                upsert: true
            }).catch((err) => {
                console.log(err);
                res.status(504).json({
                    errMsg: "internal server error",
                    status: 504
                })
            })

        }
        res.status(200).send({
            msg: "emails updated successfully",
            status: 200
        });
        res.send({ a: 10 });
    }
    catch (err) {
        console.log(err);
    }
});

router.route('/').get(async (req, res, next) => {
    console.log(req.user[0]);
    const { email } = req.user[0];
    let childList = await basicInformation.find({ email: email }, { children_email: 1, _id: 0 }).catch((err) => {
        console.log(err);
    })
    console.log(childList[0]);
    childList = JSON.parse(JSON.stringify(childList))
    childlist = childList[0]

    if (childList.length !== 0) {
        res.send(childList[0])
    } else {
        res.status(404).send({
            errorMsg: "player not found",
            code: 404
        })
    }
})

module.exports = router;