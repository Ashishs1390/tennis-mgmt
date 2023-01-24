const router = require("express").Router();
const { getAllDates, getAllDatesParentCoach } = require("../../utils/datesUtils");
const basicInformation = require('./../../models/basicInformation');
const userCompetancySchema = require("./../../models/usercompetancy");

let getPlayerInfo = async (playerEmails) => {
    let finalQuery = playerEmails.reduce((acc, email) => {
        acc.push((async () => await basicInformation.find({ email: email }, { current_level: 1, email: 1, coach_email: 1, parent_email:1,_id:0 }))());
        return acc;
    }, []);
    let returnData = await Promise.all(finalQuery).catch((err) => {
        console.log(err);
    });
    returnData = JSON.parse(JSON.stringify(returnData));
    returnData = returnData.filter((item) => item[0].hasOwnProperty('current_level') == true)
    return returnData;
};

let getCompetancyBundleData = async (data) => {
    let result = data.reduce((acc, curr) => {
        acc.push((async () => await userCompetancySchema.aggregate([    
            {
                "$match": {
                    // "email": curr.email,
                    // "assessment_date": Array.isArray(curr.dates) ? '' : curr.dates    //"2022-01-22T17:03:14.305Z"
                    ...curr
                },
            },
            {
                "$group": {
                    "_id": {
                        "competency_bundle": "$competency_bundle",
                        "assessment_date": "$assessment_date",
                        "values": "$values",
                    },
                    email: { $first: "$email" },
                    current_level: { $first: "$current_level" },
                    role: { $first: "$role" }


                }
            },
            {
                "$project": {
                    "_id": 0,
                    "competency_bundle": "$_id.competency_bundle",
                    "assessment_date": "$_id.assessment_date",
                    "values": "$_id.values",
                    email: "$email",
                    current_level: "$current_level",
                    role: "$role"

                }

            },
            {
                "$group": {
                    "_id": {
                        "competency_bundle": "$competency_bundle",
                    },
                    email: { $first: "$email" },
                    current_level: { $first: "$current_level" },
                    role: { $first: "$role" },

                    "info": {
                        "$push": {
                            "values": "$values",
                            "assessment_date": "$assessment_date",
                        },
                    },
                }

            }, {
                "$project": {
                    "_id": 0,
                    "competency_bundle": "$_id.competency_bundle",
                    "info": "$info",
                    "email": "$email",
                    "current_level": "$current_level",
                    role: "$role"

                }
            }
        ]))());
        return acc;
    }, []);
    let returnData = await Promise.all(result).catch((err) => {
        console.log(err);
    });

    return returnData;
}

let dataCreation = (data) => {
    let dataProcess = data.reduce((acc, curr) => {
        let processedData = curr.reduce((acc, d) => {
            let total = d.info[0].values.length;
            let avg = d.info[0].values.reduce((acc, v) => {
                return acc = acc + v.assigned_weight;
            }, 0);
            if (!acc["data"][d.competency_bundle]) {
                acc["data"][d.competency_bundle] = {};
                acc["email"] = d.email;
                acc["current_level"] = d.current_level;
                acc["role"] = d.role;

            }
            acc["data"][d.competency_bundle] = avg / total;
            return acc;
        }, { data: {} });
        acc.push(processedData);
        return acc;
    }, []);
     dataProcess = dataProcess.reduce((acc, curr) => {
        if (!acc[curr.email]) {
            acc[curr.email] = [];
        } 
        // acc[curr.email].push(curr);
        curr.data = Object.keys(curr.data).sort().reduce((acc, key) => {
            acc[key] = curr.data[key];
            return acc;
        }, {});
        acc[curr.email].push({ [curr.role]:curr.data });

        return acc;
    }, {});
    return dataProcess;
}

const getEmailsForCoachParent = (data) => {
    data = data.reduce((acc, curr) => {
        let obj = {};
        obj.player = curr[0].email;
        obj.current_level = curr[0].current_level;
        if (curr[0].parent_email.length > 0) {
            obj.parent = curr[0].parent_email[0];
        }
        if (curr[0].coach_email.length > 0) {
            obj.coach = curr[0].coach_email[0];
        }
        acc.push(obj);  
        return acc;
    }, []);
    return data;
}

router.route('/').get(async (req, res, next) => {
    const { query: { selectedPlayers } } = req;
    let finalResponse = [];
    let withAssessments = [],
        withOutAssessments = [];
    if (selectedPlayers.length > 0) {
        let info = await getPlayerInfo(selectedPlayers);
        const getEmailsFromPlayers = getEmailsForCoachParent(info);
        let infoDates = [];
        for (const roles of getEmailsFromPlayers) {
            let email = roles['player'];
            const current_level = roles['current_level']
            for (let role in roles) {
                let pcmail = roles[role];
                if (role !== 'current_level') {
                    let result = await getAllDatesParentCoach(email, pcmail, role);
                    let obj = {
                        assessment_date: result.length !== 0 ? result[0] : result,
                        email: email,
                        current_level
                    }
                    if (role == 'parent') {
                        obj['parent_email'] = pcmail
                    }
                    if (role == 'coach') {
                        obj['coach_email'] = pcmail
                    }
                    infoDates.push(obj);
                }
            }
        }
        // for (let curr of info) {
        //     let result = await getAllDates(curr[0].email, null, "player");
        //     infoDates.push({
        //         dates: result.length !==0 ?result[0]:result,
        //         email: curr[0].email,
        //         current_level:curr[0].current_level
        //     });
        // }
        infoDates.forEach((value) => {
            if (!Array.isArray(value.assessment_date)) {
                withAssessments.push(value);
            } else {
                withOutAssessments.push(value);
            }
        });
        
        withOutAssessments = withOutAssessments.reduce((acc, curr) => {
            if (!acc[curr.email]) {
                acc[curr.email] = [];
            }
            // acc.push({ email: curr.email, data: {} });
            return acc;
        }, {});
        // console.log(withAssessments);
        const competancyBundleData = await getCompetancyBundleData(withAssessments);
        const finalData = dataCreation(competancyBundleData);
        finalResponse = { ...finalData };
        // console.log(finalResponse);
        res.send(finalResponse);
    } else {
        res.status(504).json({
            errMsg: "internal server error",
            status: 504
        })
    }


})

module.exports = router;