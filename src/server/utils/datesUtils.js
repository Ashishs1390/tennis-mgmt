const userCompetancySchema = require("./../models/usercompetancy");

const getAllDates = async (email, selected_child, role) => {
    let filterObj = {};

    filterObj = {
        email: role == "player" ? email : selected_child,
        role: role

    }


    console.log(JSON.stringify([
        {
            $match: {
                ...filterObj
            },
        },
        {
            $group: {
                _id: {
                    assessment_date: "$assessment_date",
                },
            },
        },
        {
            $project: {
                _id: 0,
                assessment_date: "$_id.assessment_date",
            },
        },
        {
            $sort: {
                assessment_date: -1,
            },
        },
    ]))
    console.log()
    let assessmentDates = await userCompetancySchema.aggregate([
        {
            $match: {
                ...filterObj
            },
        },
        {
            $group: {
                _id: {
                    assessment_date: "$assessment_date",
                },
            },
        },
        {
            $project: {
                _id: 0,
                assessment_date: "$_id.assessment_date",
            },
        },
        {
            $sort: {
                assessment_date: -1,
            },
        },
    ]);
    assessmentDates = assessmentDates.reduce((acc, curr) => {
        if (acc) {
            acc.push(curr.assessment_date);
        }
        return acc;
    }, []);
    return assessmentDates;
};


module.exports = {
    getAllDates
}