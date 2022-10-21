const router = require('express').Router();
const basicInformation = require('./../../models/basicInformation');
router.route('/').post(async (req, res, next) => {
    const { order_id, isPayment } = req.body;
    const { email } = req.user[0];
    console.log(order_id);
    console.log(isPayment);
    let obj = {
        order_id: order_id,
        isPayment: isPayment
    };
    console.log(email);
    console.log(obj);
    let cc = await basicInformation.findOneAndUpdate({ email: email }, {
        $set: {
            ...obj
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
    });
    console.log(cc);
    res.send({
        msg: 'Subscription Info updated successfully..!!!',
        status: 200
    });

});

module.exports = router;