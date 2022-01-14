const router = require("express").Router();
const basicInformation = require("./../../models/basicInformation");

router.route('/').put(async (req, res, next) => {
    try {
        const { player_email, parent_email, coach_email } = req.body;
        const isExist = await basicInformation.find({ email: player_email }).catch((err) => {
            console.log(err);
        })
        let updatedInfo;
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
        console.log(updatePlayerObj)
        const updatedPlayerInfo = await basicInformation.findOneAndUpdate(
            { email: player_email }, {
            $addToSet: {
                ...updatePlayerObj
            }
        }, {
            upsert: true,
            returnOriginal: false
        }).catch((err) => {
            console.log(err);
            res.status(504).json({
                errMsg: "internal server error",
                status: 504
            })
        })
        if (updatedPlayerInfo) {
            updatedInfo = await basicInformation.findOneAndUpdate(
                { ...updatePCObj }, {
                $addToSet: {
                    children_email: player_email
                }
            }, {
                upsert: true,
                returnOriginal: false
            }).catch((err) => {
                console.log(err);
                res.status(504).json({
                    errMsg: "internal server error",
                    status: 504
                })
            })

        }
        console.log("----------------updatedInfo--------updatedPlayerInfo----------------------")
        console.log(updatedInfo);
        console.log(updatedPlayerInfo);
        res.status(200).send({
            msg: "emails updated successfully",
            children_email: updatedInfo.children_email,
            status: 200
        });
    }
    catch (err) {
        console.log(err);
        res.status(504).json({
            errMsg: "internal server error",
            status: 504
        })
    }
});
const getChildrenList = async(email) => {
    let childList = await basicInformation.find({ email: email }, { children_email: 1, _id: 0 }).catch((err) => {
        console.log(err);
    })
    console.log(childList[0]);
    childList = JSON.parse(JSON.stringify(childList))
    childlist = childList[0]

    if (childList.length !== 0) {
        return (childList[0])
    }
}
const getSearchedChild = async ({email }) => {
    let output = await basicInformation.find({ email: email }, { email:1,_id:0})
    return output;
}

router.route('/').get(async (req, res, next) => {
    console.log(req.query)
    try {
        console.log(req.user[0]);
        const { email } = req.user[0];


        if (req.query && Object.keys(req.query).length === 0
            && Object.getPrototypeOf(req.query) === Object.prototype) {
            console.log("0000")
            const resp = await getChildrenList(email);
            res.status(200).send(resp)

        } else {
            const resp = await getSearchedChild(req.query);
            console.log(resp)
            res.status(200).send(resp)
        }
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;