const router = require("express").Router();
const userCompetancySchema = require("./../../models/usercompetancy");
const competancymetadata = require("./../../models/competancymetadata");
const competancyBundleSchema = require("./../../models/competencybundledata");


router.route("/").get(async (req, res, next) => {
  try {
    let { current_level } = req.query;
    current_level = current_level;
    console.log(current_level);
    const userEmail = req.user[0].email;
    const itnWeights = `${current_level}_weight`;
    const match = {
      [itnWeights]: { $gte: 0 },
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
      console.log(compentancyData)
      if(compentancyData.length !== 0){
        compentancyData = JSON.parse(JSON.stringify(compentancyData));
    let metaObj = await competancymetadata.find({}, { _id: 0 }).catch((err) => {
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
          (a, b) => parseInt(b[itnWeights]) - parseInt(a[itnWeights])
        );
        var n = sortingArr.indexOf(item.competency_bundle);
        return [n, item];
      })
      .sort()
      .map(function (j) {
        return j[1];
      });

    res.send([...compentancyData]);
      }else{
        res.status(404).send({
            message: "no data",
            status: 404,
          });
      }
    
  } catch (err) {
    console.log(err);
  }
});

router.route("/").post(async (req, res, next) => {
  try {
    const {
      user,
      body: { data },
    } = req;
    const { current_level, email } = req.user[0];

    data.forEach((element) => {
      element.current_level = current_level;
      element.email = email;
    });

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

module.exports = router;
