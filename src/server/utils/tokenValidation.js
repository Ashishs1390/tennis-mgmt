const {verify} = require('jsonwebtoken');
const {JWT_KEY} = require('./constants');

function checkToken(req,res,next){
    let token;
    if(req.get("authorization") !== undefined){
        token = req.get("authorization");
        token = token.slice(7);
    }
    else{
        res.status(401).json({
            errMsg:"Invalid token",
            code:401
        })
    }

    if(token){
        console.log(JWT_KEY);
        verify(token,JWT_KEY,(err,decoded)=>{
            if(err){
                res.status(401).json({
                    errorMsg:"invalid token for user or token expired",
                    code:401
                });
            }else{
                req.user = decoded.result;
                // console.log("-------------")
                // console.log(req.user);

                next();
            }

        });
    }
}

module.exports = checkToken;

