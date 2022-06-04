const router = require("express").Router();
const basicInformation = require("./../../models/basicInformation");
const { sign } = require("jsonwebtoken");
var cors = require('cors')
// var headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
var corsOptions = {
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    mode: 'same-origin',
    credentials: true,
    redirect: 'follow',
    // credentials: 'include',
    "preflightContinue": true,
    // headers: headers,
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost",
    "optionsSuccessStatus": 204
}

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
        res.status(200).send([player_email]);
    }
    catch (err) {
        console.log(err);
        res.status(504).json({
            errMsg: "internal server error",
            status: 504
        })
    }
});
const getChildrenList = async (email) => {
    let childList = await basicInformation.find({ email: email }, { children_email: 1, _id: 0 }).catch((err) => {
        console.log(err);
    })
    childList = JSON.parse(JSON.stringify(childList))
    childlist = childList[0];


    if (childList.length !== 0) {
        return (childList[0].children_email)
    }
}
const getSearchedChild = async ({ email }) => {
    let output = await basicInformation.find({ email: email,role:"player" }, { email: 1, _id: 0 })
    return output;
}

router.route('/').get(async (req, res, next) => {
    try {
        const { email } = req.user[0];


        if (req.query && Object.keys(req.query).length === 0
            && Object.getPrototypeOf(req.query) === Object.prototype) {
            const resp = await getChildrenList(email);
            res.status(200).send(resp)

        } else {
            const resp = await getSearchedChild(req.query);
            if (resp.length != 0) {
                res.status(200).send(resp)
            } else {
                res.status(404).json({
                    errMsg: "No player found",
                    status: 404
                })
            }

        }
    } catch (err) {
        console.log(err);
    }

})
router.route('/itn_level').get(async (req, res, next) => {
    try {
        console.log(req.user[0].email)
        res.cookie("token", "");
        const { email } = req.query;

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