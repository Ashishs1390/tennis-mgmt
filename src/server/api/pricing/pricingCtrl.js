const router = require('express').Router();
const basicInformation = require('./../../models/basicInformation');
router.route('/').post(async (req, res, next) => {
    const { merchant_id, isPayment } = req.body;
    const { email } = req.user[0];
    console.log(merchant_id);
    console.log(isPayment);
    let obj = {
        merchant_id: merchant_id,
        isPayment: isPayment
    }
    basicInformation.findOneAndUpdate({ email: email }, {
        $addToSet: {
            ...obj
    } })
    res.send({ a: '10' });
});

module.exports = router;