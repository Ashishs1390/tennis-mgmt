const router = require("express").Router();
const userCompetancySchema = require("./../../models/usercompetancy");
const competancymetadata = require("./../../models/competancymetadata");
const competancyBundleSchema = require("./../../models/competencybundledata");

router.route("/").get(async (req, res, next) => {
  getCompetency(req, res);
});

router.route("/").post(async (req, res, next) => {
  try {
    const {
      user,
      body: { data },
    } = req;
    const { current_level, email } = req.user[0];// jwt token

    data.forEach((element) => {
      element.current_level = current_level;
      element.email = email;
    });
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
const getAllDates = async (email) => {
  let assessmentDates = await userCompetancySchema.aggregate([
    {
      $match: {
        email: email,
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
  console.log(assessmentDates);
  assessmentDates = assessmentDates.reduce((acc, curr) => {
    if (acc) {
      acc.push(curr.assessment_date);
    }
    return acc;
  }, []);
  return assessmentDates;
};

router.route("/assessment").get(async (req, res, next) => {
  try {
    console.log(req.user);
    const { email, current_level } = req.user[0];
    let resObj = {};

    const itnWeights = `${current_level}_weight`;
    // let assessmentDates = await userCompetancySchema.distinct("assessment_date");
    // console.log(assessmentDates)
    let assessmentDates = await getAllDates(email);
    console.log(assessmentDates);
    let assessmentData = await userCompetancySchema.aggregate([
      {
        $match: {
          email: email,
          current_level: current_level,
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
          let { assessment_date, values } = curr;
          const key = values.competency;
          if (!acc["competencies"][key]) {
            acc["competencies"][key] = {
              weights: [],
            };
          }
          values.assessment_date = assessment_date;
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
        console.log("----------assessmentData------------");
        console.log(item.competencies);
          item.competencies.sort((a, b) => {
              console.log(a[itnWeights]);
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

router.route("/latestassessment").get(async (req, res, next) => {});

async function getCompetency(req, res) {
  const { email } = req.user[0];
  const competancyData = await getAllDates(email);
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
    console.log(current_level);
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
      console.log(
        JSON.stringify([
          { $match: { ...match } },
          { $group: { ...group } },
          { $project: { ...project } },
        ])
      );
    let compentancyData = await competancyBundleSchema
      .aggregate([
        { $match: { ...match } },
        { $group: { ...group } },
        { $project: { ...project } },
      ])
      .catch((err) => {
        console.log(err);
      });
    console.log(compentancyData);
    if (compentancyData.length !== 0) {
      console.log("------------------compentancyData----------------------");
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
          console.log("----------compentancyData---------------");
          console.log(item.values);
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
          .sort((a,b) => {
              return a[0] - b[0];
        })
        .map(function (j) {
          return j[1];
        });

      res.send([...compentancyData]);
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
  console.log("------------getCompetencyLatest---------------");
  try {
    const { email, current_level } = req.user[0];
    let assessmentDates = await getAllDates(email);
    let maxDate = new Date(
      Math.max(...assessmentDates.map((e) => new Date(e)))
    );
    maxDate = maxDate.toISOString();

    let assessmentDataLatest = await userCompetancySchema.aggregate([
      {
        $match: {
          email: email,
          assessment_date: maxDate,
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

    // console.log(assessmentDataLatest);
    res.send([...assessmentDataLatest[0].compentancyArr]);
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
