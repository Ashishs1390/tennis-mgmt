const router = require("express").Router();
const videoanalysis = require("./../../models/videoInformation");
const videoHistoryInfoSchema = require("./../../models/videohistoryinformation");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


router.route('/').post(async (req, res, next) => {

    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;
    let respObj = {};

    const obj = {
        ...req.body,
        user_name: matchkey

    }
    respObj = { ...obj };
    const { date } = req.body;
    let frameArr = [];
    for (let o in obj) {
        if (o.includes('frame')) {
            frameArr.push(obj[o]);
        }
    }
    frameArr = [...new Set(frameArr)];
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
    const getHistoryData = await videoHistoryInfoSchema.find({ email: matchkey }).catch((err) => {
        console.log(err);
        res.status(504).send({
            errMsg: "internal server error", status: 504
        })
    });
    console.log(getHistoryData);

    let historyFrames = getHistoryData[0]?.frames ? getHistoryData[0].frames : [];
    let srcArr = [];
    if (frameArr.length>0) {
        for (let s of frameArr) {
            let bool = historyFrames.some(item => {
                return item.src == s
            });
            if (!bool) {
                // if (s.includes("frame") && respObj[s] !== undefined) {
                    let urlForMetaInfo = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${s}`;
                    let metaInfo = await axios.get(urlForMetaInfo).catch((err) => {
                        console.log(err)
                        return err;
                    });
                    const metaData = metaInfo.data;
                    srcArr.push({ src: s, ...metaData });
                // }
            }

        };    
        let pushObj = srcArr.reduce((acc, val) => {
            if (acc) {
                acc["$push"]["frames"]["$each"].push({ date: date, id: uuidv4(), ...val });
            }
            return acc;
        }, { "$push": { "frames": { "$each": [] } } });
        // pushObj = await pushObj;
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
        // const resObj = data._doc;
        // res.send({
        //     ...resObj
        // });


    } else {
        res.status(404).send({
            msg: "no data", status: 404
        })
    }
    if (data) {
        res.send({
            ...respObj
        });
    } else {
        res.status(404).send({
            msg: "no data", status: 404
        })
    }






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
    try {
        const { email, role, selected_child } = req.user[0];
        let pcData = [];
        let matchkey = (role == "player") ? email : selected_child;
        if (role == "parent" || role == "coach") {
            pcData = await videoHistoryInfoSchema.find({ email: email }, { _v: 0, _id: 0 }).catch((err) => {
                console.log(err);
                res.status(504).send({
                    errMsg: "internal server error", status: 504
                })
            });
            pcData = JSON.parse(JSON.stringify(pcData));
        } else {
            pcData = [
                {
                    frames: []
                }
            ];
        }
        if (pcData.length == 0) {
            pcData = [
                {
                    frames: []
                }
            ];
        }

        let data = await videoHistoryInfoSchema.find({ email: matchkey }, { _v: 0, _id: 0 }).catch((err) => {
            console.log(err);
            res.status(504).send({
                errMsg: "internal server error", status: 504
            })
        });
        data = JSON.parse(JSON.stringify(data));
        if (data.length !== 0 || pcData.length !== 0) {
            const frames = [...data[0].frames, ...pcData[0].frames];
            res.send({ frames: frames });
        } else {
            res.status(404).send({
                errMsg: "no data", status: 404
            })
        }
    } catch (error) {
        console.log(error);
        res.status(504).send({
            errMsg: `internal server error ${error}`, status: 504
        })
    }
   
});

router.route('/history').delete(async (req, res, next) => {
    const { videos } = req.body;
    const { email, role, selected_child } = req.user[0];
    let matchkey = (role == "player") ? email : selected_child;
    let query = videos.reduce((acc, curr) => {
        acc.push(curr.src);
        return acc;
    }, []);
    query = new Set([...query]);
    query = [...query];
    // db.getCollection('video_history_info').updateMany({ "email": "player27@gmail.com" },
    //     { "$pull": { 'frames': { src: { '$in': ['6VJBBUqr1wM'] } } } })
   
    let data = await videoHistoryInfoSchema.updateMany({ 'email': matchkey },
        { '$pull': { 'frames': { 'src': { '$in': query } } } }
    ).catch((err) => {
        console.log(err);
        res.status(504).send({
            errMsg: "internal server error", status: 504
        })
    });
    data = JSON.parse(JSON.stringify(data));
    if (data) {
        res.send(data);

    }
});
module.exports = router;