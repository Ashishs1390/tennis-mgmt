const router = require("express").Router();
const userCompetancySchema = require("./../../models/usercompetancy");
const competancymetadata = require("./../../models/competancymetadata");
const competancyBundleSchema = require("./../../models/competencybundledata");

router.route("/").get(async (req, res, next) => {
  console.log("-----------get-----------")
  getCompetency(req, res);
});

function addProperties(data) {
  return data.forEach((element) => {
    element.current_level = current_level;
    element.email = email;
  });
}

router.route("/").post(async (req, res, next) => {
  try {
    const {
      user,
      body: { data },
    } = req;
    const { email, selected_child, role } = req.user[0];// jwt token
    console.log("---------------------email----------------------------")
    console.log(email)
    let { current_level } = req.params;
    current_level = current_level || "u12boys";
    if (role == "parent" || role == "coach") {
      // data = addProperties(data)
      data.forEach((element) => {
        element.current_level = current_level;
        element[`${role}_email`] = email;
        element.email = selected_child;
        element.role = role;
      });
    } else {
      data.forEach((element) => {
        element.current_level = current_level;
        element.email = email;
        element.role = role;
      });
      // data = addProperties(data)
    }
    console.log(data);
    const insertIntoUserCollection = await userCompetancySchema.insertMany([
      ...data,
    ]);
    res.status(200).send({
      message: "Competancy added successfully",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      message: "internal server error",
      status: 404,
    });
  }
});
const getAllDates = async (email, selected_child, role) => {
  let filterObj = {};

  filterObj = {
    // [`${role}_email`]: email,
    email: role == "player" ? email : selected_child,
    role: role
  }



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

const getDates = async (email, selected_child, role) => {
  let filterObj = {};

  filterObj = {
    email: role == "player" ? email : selected_child,
  }
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
        role: {
          "$first": "$role"
        }

      },
    },
    {
      $project: {
        _id: 0,
        assessment_date: "$_id.assessment_date",
        role: "$role"

      },
    },
    {
      $sort: {
        assessment_date: -1,
      },
    },
  ]);

  assessmentDates = JSON.parse(JSON.stringify(assessmentDates))
  return assessmentDates;

}

const getdatesbyRole = async (email, selected_child,role) => {
  try {
    let filterObj = {};
    filterObj = {
      email: role == "player" ? email : selected_child,
    }
    // const finalQuery = [];
    let match = {
      "$match": { ...filterObj }
    };
    let group = {
      "$group": {
        "_id": {
          "role": "$role"
        },

        "assessment_date": { "$last": "$assessment_date" }
      }
    };
    let project = {
      "$project": {
        "_id": 0,
        "role": "$_id.role",
        "assessment_date": "$assessment_date"

      }
    };

    let finalQuery = [
      { ...match },
      { ...group },
      { ...project }

    ]
    let assessmentDates = await userCompetancySchema.aggregate(finalQuery);
    console.log(assessmentDates);
    assessmentDates = JSON.parse(JSON.stringify(assessmentDates));
    return assessmentDates;
  }
  catch (err) {
    console.log(err);
  }
}
["asas","asdas","sada"]
router.route("/assessment").get(async (req, res, next) => {
  try {
    const { email, selected_child, role } = req.user[0]; //jwt token
    const { current_level } = req.query;
    const {dates_arr } = req.params
    // console.log();
    const gdr = getdatesbyRole(email, selected_child, role);
    let datesArr = (await gdr).reduce((acc, curr) => {
      if (acc) {
        acc.push(curr.assessment_date)
      }
      return acc;
    }, []);
    if (dates_arr && dates_arr.length !== 0) {
      datesArr = dates_arr;
    } else {
      datesArr = datesArr
    }

    console.log(datesArr);
    let filterObj = {};
    if (role == "parent" || role == "coach") {
      filterObj = {
        // [`${role}_email`]: email,
        email: selected_child,
        current_level: current_level,
        assessment_date: { $in: [...datesArr] }
      }
    } else {
      filterObj = {
        email: email,
        current_level: current_level,
        assessment_date: { $in: [...datesArr] }

      }
    }


    let resObj = {};
    const itnWeights = `${current_level}_weight`;
    let gd = await getDates(email, selected_child, role);
    let assessmentDates = await getAllDates(email, selected_child, role);
    console.log(JSON.stringify([
      {
        $match: {
          ...filterObj
        },
      },
      {
        $unwind: "$values",
      },
      {
        $group: {
          _id: {
            competency_bundle: "$competency_bundle",
            current_level: "$current_level",
            values: "$values",
            assessment_date: "$assessment_date",
            role: "$role"
          },
        },
      },
      {
        $project: {
          _id: 0,
          competency_bundle: "$_id.competency_bundle",
          current_level: "$_id.current_level",
          values: "$_id.values",
          assessment_date: "$_id.assessment_date",
          role: "$_id.role"
        },
      },

      {
        $group: {
          _id: {
            competency_bundle: "$competency_bundle",
          },
          info: {
            $push: {
              values: "$values",
              role: "$role",
              assessment_date: "$assessment_date",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          competency_bundle: "$_id.competency_bundle",
          info: "$info",
        },
      },
    ]))
    let assessmentData = await userCompetancySchema.aggregate([
      {
        $match: {
          ...filterObj
          // email: email,
          // current_level: current_level,
        },
      },
      {
        $unwind: "$values",
      },
      {
        $group: {
          _id: {
            competency_bundle: "$competency_bundle",
            current_level: "$current_level",
            values: "$values",
            assessment_date: "$assessment_date",
            role: "$role"
          },
        },
      },
      {
        $project: {
          _id: 0,
          competency_bundle: "$_id.competency_bundle",
          current_level: "$_id.current_level",
          values: "$_id.values",
          assessment_date: "$_id.assessment_date",
          role: "$_id.role"
        },
      },

      {
        $group: {
          _id: {
            competency_bundle: "$competency_bundle",
          },
          info: {
            $push: {
              values: "$values",
              role: "$role",
              assessment_date: "$assessment_date",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          competency_bundle: "$_id.competency_bundle",
          info: "$info",
        },
      },
    ]);
    assessmentData = JSON.parse(JSON.stringify(assessmentData));
    assessmentData = assessmentData.reduce((acc, items) => {
      let { competency_bundle, info } = items;
      const competencyGroup = info.reduce(
        (acc, curr) => {
          // console.log(curr)
          let { assessment_date, role, values } = curr;
          const key = values.competency;
          if (!acc["competencies"][key]) {
            acc["competencies"][key] = {
              weights: [],
            };
          }
          values.assessment_date = assessment_date;
          values.role = role;
          acc["competencies"][key]["competency"] = values.competency;
          acc["competencies"][key]["u12boys_weight"] = values.u12boys_weight;
          acc["competencies"][key]["weights"].push(values);
          return acc;
        },
        {
          competencies: {},
        }
      );
      acc.push({
        competency_bundle: competency_bundle,
        ...competencyGroup,
      });

      return acc;
    }, []);

    let metaObj = await competancymetadata.find({}, { _id: 0 }).catch((err) => {
      console.log(err);
      res.status(504).send({
        status: 504,
        errMsg: "metadata for competancy collection is not ready",
      });
    });
    metaObj = JSON.parse(JSON.stringify(metaObj));
    const { itn_competancy_mapping } = metaObj[0];
    const sortingArr = itn_competancy_mapping["u12boys"];
    assessmentData = assessmentData.reduce((acc, data) => {
      let obj = {};
      const { competency_bundle, competencies } = data;
      if (!acc[competency_bundle]) {
        obj = {
          competency_bundle: competency_bundle,
          competencies: [],
        };
        for (competancy in competencies) {
          obj.competencies.push(competencies[competancy]);
        }
        acc.push(obj);
      }
      return acc;
    }, []);
    assessmentData = assessmentData
      .map((item) => {
        item.competencies.sort((a, b) => {
          var x = a[itnWeights];
          var y = b[itnWeights];
          return x < y ? -1 : x > y ? 1 : 0;
        });
        item.competencies.forEach((i, index) => {
          //   console.log(i);
          i.weights.sort((a, b) => {
            return b.assessment_date < a.assessment_date
              ? -1
              : b.assessment_date > a.assessment_date
                ? 1
                : 0;
          });
        });
        var n = sortingArr.indexOf(item.competency_bundle);
        return [n, item];
      })
      .sort((a, b) => {
        return a[0] - b[0];
      })
      .map(function (j) {
        return j[1];
      });
    resObj = {
      progressBarData: assessmentData,
      assessmentDates,
      assessmentTestDates: gd
    };


    res.status(200).send(resObj);
  } catch (err) {
    console.log(err);
    res.status(504).send({
      message: "internal server error",
      status: 404,
      err: err,
    });
  }
});

router.route("/latestassessment").get(async (req, res, next) => { });

async function getCompetency(req, res) {
  const { email, selected_child, role } = req.user[0];
  const competancyData = await getAllDates(email, selected_child, role);
  if (competancyData && competancyData.length > 0) {
    return await getCompetencyLatest(req, res);
  } else {
    return await getCompetencyNew(req, res);
  }
}

async function getCompetencyNew(req, res) {
  try {
    let { current_level } = req.query;
    current_level = current_level;
    const userEmail = req.user[0].email;
    const itnWeights = `${current_level}_weight`;
    const match = {
      [itnWeights]: { $gt: 0 },
    };
    const group = {
      _id: {
        competency_bundle: "$competency_bundle",
      },
      values: {
        $push: {
          competency: "$competency",
          assigned_weight: "$assigned_weight",
          [itnWeights]: `$${itnWeights}`,
        },
      },
    };
    const project = {
      _id: 0,
      competency_bundle: "$_id.competency_bundle",

      values: "$values",
    };

    let compentancyData = await competancyBundleSchema
      .aggregate([
        { $match: { ...match } },
        { $group: { ...group } },
        { $project: { ...project } },
      ])
      .catch((err) => {
        console.log(err);
      });
    if (compentancyData.length !== 0) {
      compentancyData = JSON.parse(JSON.stringify(compentancyData));
      let metaObj = await competancymetadata
        .find({}, { _id: 0 })
        .catch((err) => {
          console.log(err);
          res.status(504).send({
            status: 504,
            errMsg: "metadata for competancy collection is not ready",
          });
        });
      metaObj = JSON.parse(JSON.stringify(metaObj));
      const { itn_competancy_mapping } = metaObj[0];
      const sortingArr = itn_competancy_mapping[current_level];
      compentancyData = compentancyData
        .map((item) => {
          item.values.sort(
            (a, b) => {
              var x = a[itnWeights];
              var y = b[itnWeights];
              return x < y ? -1 : x > y ? 1 : 0;
            }
          );
          var n = sortingArr.indexOf(item.competency_bundle);
          return [n, item];
        })
        .sort((a, b) => {
          return a[0] - b[0];
        })
        .map(function (j) {
          return j[1];
        });

      res.status(200).send([...compentancyData]);
    } else {
      res.status(404).send({
        message: "no data",
        status: 404,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function getCompetencyLatest(req, res) {
  try {
    const { email, selected_child, role } = req.user[0];
    let assessmentDates = await getAllDates(email, selected_child, role);
    let maxDate = new Date(
      Math.max(...assessmentDates.map((e) => new Date(e)))
    );
    maxDate = maxDate.toISOString();
    let filterObj = {};
    filterObj = {
      // [`${role}_email`]: email,
      email: role == "player" ? email : selected_child,
      role: role,
      assessment_date: maxDate
    }

    // console.log(JSON.stringify([
    //   {
    //     $match: {
    //       ...filterObj
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         email: "$email",
    //         assessment_date: "$assessment_date",
    //       },
    //       compentancyArr: {
    //         $push: {
    //           competency_bundle: "$competency_bundle",
    //           values: "$values",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       compentancyArr: 1,
    //     },
    //   },
    // ]))
    let assessmentDataLatest = await userCompetancySchema.aggregate([
      {
        $match: {
          ...filterObj
        },
      },
      {
        $group: {
          _id: {
            email: "$email",
            assessment_date: "$assessment_date",
          },
          compentancyArr: {
            $push: {
              competency_bundle: "$competency_bundle",
              values: "$values",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          compentancyArr: 1,
        },
      },
    ]);

    if (assessmentDataLatest.length !== 0) {
      res.status(200).send([...assessmentDataLatest[0].compentancyArr]);

    } else {
      res.status(404).send({
        message
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
