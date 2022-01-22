function requestCreation(req, res, next) {
    let reqObj = {};
    console.log("-----------req------------")
    console.log(req.method);
    console.log(req.query);
    const { current_level, child_email } = req.query;
    if (req.method == "GET" || req.method == "PUT") {
        reqObj.current_level = current_level;
        reqObj.child_email = child_email;
    }

    if (req.method == "POST") {
        const { current_level } = req.body;
        reqObj.current_level = current_level;
    }
    req.reqObj = reqObj;
    next();
}

module.exports = requestCreation;