const router = require("express").Router();
const { getAllDates } = require("../../utils/datesUtils");
const basicInformation = require('./../../models/basicInformation');
const userCompetancySchema = require("./../../models/usercompetancy");

let getPlayerInfo = async (playerEmails) => {
    console.log(playerEmails)
    let finalQuery = playerEmails.reduce((acc, email) => {
        acc.push((async () => await basicInformation.find({ email: email }, { current_level: 1,email:1,_id:0 }))());
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
    console.log("-------data--------")
    console.log(data);
    let result = data.reduce((acc, curr) => {
        acc.push((async () => await userCompetancySchema.aggregate([
            {
                "$match": {
                    "email": curr.email,
                    "assessment_date": Array.isArray(curr.dates) ? '' : curr.dates    //"2022-01-22T17:03:14.305Z"

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
                    role: { $first: "$role" },

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
                    role:"$role"

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
    console.log(returnData);

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

            }
            acc["data"][d.competency_bundle] = avg / total;
            return acc;
        }, { data: {} });
        acc.push(processedData);
        return acc;
    }, []);
    return dataProcess;
}

router.route('/').get(async (req, res, next) => {
    const { query: { selectedPlayers } } = req;
    let finalResponse = [];
    let withAssessments = [],
        withOutAssessments = [];
    if (selectedPlayers.length > 0) {
        let info = await getPlayerInfo(selectedPlayers);
        let infoDates = [];
        for (let curr of info) {
            let result = await getAllDates(curr[0].email, null, "player");
            infoDates.push({
                dates: result.length !==0 ?result[0]:result,
                email: curr[0].email,
                current_level:curr[0].current_level
            });
        }
        infoDates.forEach((value) => {
            if (!Array.isArray(value.dates)) {
                withAssessments.push(value);
            } else {
                withOutAssessments.push(value);
            }
        });
        withOutAssessments = withOutAssessments.reduce((acc, curr) => {
            acc.push({ email: curr.email, data: {} });
            return acc;
        }, []);

        const competancyBundleData = await getCompetancyBundleData(withAssessments);
        const finalData = dataCreation(competancyBundleData);
        finalResponse = [...finalData, ...withOutAssessments];
        res.send(finalResponse);
    }


})

module.exports = router;