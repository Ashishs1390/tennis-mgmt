const router = require("express").Router();
const videoanalysis = require("./../../models/videoInformation");
const videoHistoryInfoSchema = require("./../../models/videohistoryinformation");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


router.route('/').post(async (req, res, next) => {

    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;


    const obj = {
        ...req.body,
        //user_name:req.user[0].email
        user_name: matchkey

    }
    const { date } = req.body;
    const data = await videoanalysis.findOneAndUpdate({ email: matchkey }, {
        $set: { ...obj }
    }, {
        upsert: true,
        returnOriginal: false
    }).catch((err) => {
        console.log(err);
        res.status(504).send({
            errMsg: "internal server error", status: 504
        })
    });
    let srcArr = [];
    if (data) {
        for (let d in data) {
            if (d.includes("frame") && data[d] !== undefined) {
                let urlForMetaInfo = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${data[d]}`;
                let metaInfo = await axios.get(urlForMetaInfo).catch((err) => {
                    console.log(err)
                    return err;
                });
                const metaData = metaInfo.data;
                srcArr.push({ src: data[d], ...metaData });
            }
        }

        let pushObj = srcArr.reduce((acc, val) => {
            if (acc) {
                acc["$push"]["frames"]["$each"].push({ date: date, id: uuidv4(),...val });
            }
            return acc;
        }, { "$push": { "frames": { "$each": [] } } })
        pushObj = await pushObj;
        videoHistoryInfoSchema.updateOne({ email: req.user[0].email },
            {
                ...pushObj,
                "$set": { email: req.matchkey }
            }, {
            upsert: true,
            returnNewDocument: false
        }
        ).then((output) => {
            console.log(output);
        })
        const resObj = data._doc;
        res.send({
            ...resObj
        });


    } else {
        res.status(404).send({
            msg: "no data", status: 404
        })
    }

    // if (data && data.length > 0) {
    //     const resObj = data._doc;
    //     res.send({
    //         ...resObj
    //     });
    // } else {
    //     res.status(404).send({
    //         msg: "no data", status: 404
    //     })
    // }






});

router.route('/').get(async (req, res, next) => {
    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;
    const data = await videoanalysis.find({ email: matchkey }, { _v: 0, _id: 0 }).catch((err) => {
        console.log(err);
        res.status(504).send({
            errMsg: "internal server error", status: 504
        })
    });
    let resObj;
    if (data.length != 0) {
        resObj = data[0]._doc;
        res.send({ ...resObj })

    } else {
        res.status(404).send({
            errMsg: "no data", status: 404
        })
    }


});

router.route('/history').get(async (req, res, next) => {
    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;
    const data = await videoHistoryInfoSchema.find({ email: matchkey }, { _v: 0, _id: 0 }).catch((err) => {
        console.log(err);
        res.status(504).send({
            errMsg: "internal server error", status: 504
        })
    });
    if (data.length != 0) {
        const resObj = data[0]._doc;
        res.send({ ...resObj })
    } else {
        res.status(404).send({
            errMsg: "no data", status: 404
        })
    }


});






module.exports = router;